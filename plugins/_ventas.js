import fetch from 'node-fetch'

let suscripciones = global.suscripciones || (global.suscripciones = {})

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let user = global.db.data.users[m.sender]

  if (command === 'precios') {
    return m.reply(
`🌿 *Precios de suscripción de grupo*

*🕐 1 hora*  →  1,000 coins
*🕒 2 horas* →  2,000 coins
*🌤️ 12 horas* → 12,000 coins
*🌅 1 día*   → 10,000 coins
*🌾 1 semana* → 100,000 coins
*🌿 1 mes*   → 1,000,000 coins

Ejemplo de uso:
${usedPrefix}joinfor https://chat.whatsapp.com/xxxxx 3h`)
  }

  if (!args[0] || !args[1]) {
    return m.reply(
`🌾 *Uso correcto:*
${usedPrefix + command} <enlace> <tiempo>

🪴 *Ejemplos:*
${usedPrefix + command} https://chat.whatsapp.com/xxxxx 3h
${usedPrefix + command} https://chat.whatsapp.com/xxxxx 2d

🌿 *Unidades válidas:*
m = minutos
h = horas
d = días
w = semanas
mth = mes`)
  }

  let enlace = args[0].trim()
  let tiempoStr = args[1].toLowerCase()
  let linkRegex = /https:\/\/chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/i
  let [, codigoGrupo] = enlace.match(linkRegex) || []

  if (!codigoGrupo) return m.reply('🌱 Enlace no válido. Asegúrate de copiar bien el link del grupo.')

  let cantidad = parseInt(tiempoStr)
  let unidad = tiempoStr.replace(cantidad, '').trim()
  if (isNaN(cantidad) || cantidad < 1)
    return m.reply('🍃 Ingresa un número válido (ejemplo: 10m, 5h, 2d, 1w, 1mth).')

  let tiempoMs = 0
  let tiempoTexto = ''
  let costo = 0

  switch (unidad) {
    case 'm':
      tiempoMs = cantidad * 60 * 1000
      costo = Math.ceil((cantidad / 60) * 1000)
      tiempoTexto = `${cantidad} minuto${cantidad > 1 ? 's' : ''}`
      break
    case 'h':
      tiempoMs = cantidad * 60 * 60 * 1000
      costo = cantidad * 1000
      tiempoTexto = `${cantidad} hora${cantidad > 1 ? 's' : ''}`
      break
    case 'd':
      tiempoMs = cantidad * 24 * 60 * 60 * 1000
      costo = cantidad * 10000
      tiempoTexto = `${cantidad} día${cantidad > 1 ? 's' : ''}`
      break
    case 'w':
      tiempoMs = cantidad * 7 * 24 * 60 * 60 * 1000
      costo = cantidad * 100000
      tiempoTexto = `${cantidad} semana${cantidad > 1 ? 's' : ''}`
      break
    case 'mth':
      tiempoMs = 30 * 24 * 60 * 60 * 1000
      costo = 1000000
      tiempoTexto = `1 mes`
      break
    default:
      return m.reply('🌱 Unidad no válida. Usa: m, h, d, w o mth.')
  }

  if (user.coin < costo) {
    return m.reply(
`🌿 No tienes suficientes monedas.

💰 *Costo:* ${costo.toLocaleString()} coins  
🍃 *Tu saldo:* ${user.coin.toLocaleString()} coins`)
  }

  await m.reply(`🍃 Preparando suscripción...  
Un momento, uniéndome al grupo solicitado.`)

  try {
    let groupId = await conn.groupAcceptInvite(codigoGrupo).catch(e => null)
    if (!groupId) throw new Error('No se pudo unir al grupo. Verifica el enlace o si el bot ya está dentro.')

    let groupMetadata = await conn.groupMetadata(groupId)
    let groupName = groupMetadata.subject
    let pfp = await conn.profilePictureUrl(groupId, 'image').catch(_ => global.imagen1)

    user.coin -= costo

    await conn.sendMessage(groupId, {
      text:
`🌿 *Suscripción activa con éxito*

🏷️ *Grupo:* ${groupName}
🕒 *Duración:* ${tiempoTexto}
💰 *Costo:* ${costo.toLocaleString()} coins
🌾 *Solicitado por:* @${m.sender.split('@')[0]}

El bot permanecerá en este grupo por el tiempo indicado.
Finalizado el periodo, se retirará automáticamente.`,
      mentions: [m.sender],
      contextInfo: {
        externalAdReply: {
          title: `🌱 Suscripción de grupo activa`,
          body: `Duración: ${tiempoTexto} | Costo: ${costo.toLocaleString()} coins`,
          thumbnailUrl: pfp,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    })

    if (global.owner && global.owner[0])
      await conn.sendMessage(global.owner[0] + '@s.whatsapp.net', {
        text:
`🌾 *Nueva suscripción activada*
🏷️ Grupo: ${groupName}
👤 Usuario: @${m.sender.split('@')[0]}
💰 Costo: ${costo.toLocaleString()} coins
⏳ Tiempo: ${tiempoTexto}`,
        mentions: [m.sender]
      })


    let ahora = Date.now()
    suscripciones[groupId] = {
      tiempoRestante: tiempoMs,
      inicio: ahora,
      fin: ahora + tiempoMs,
      user: m.sender
    }

    setTimeout(async () => {
      try {
        await conn.sendMessage(groupId, { text: `*🍂 El tiempo de suscripción ha finalizado. El bot se retirará del grupo.*` })
        await conn.groupLeave(groupId)
        delete suscripciones[groupId]
      } catch (err) {
        console.error(`Error al salir del grupo: ${err.message}`)
      }
    }, tiempoMs)

  } catch (e) {
    console.error(e)
    return m.reply(`🍂 *Error al unirse al grupo:*\n${e.message}`)
  }
}

handler.help = ['suscripción <enlace> <tiempo>', 'precios']
handler.tags = ['info']
handler.command = /^(joinfor|precios)$/i

export default handler
