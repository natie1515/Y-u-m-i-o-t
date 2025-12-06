import fs from 'fs'
import fetch from 'node-fetch'
import FormData from 'form-data'
import { WAMessageStubType, generateWAMessageContent, generateWAMessageFromContent, proto } from '@whiskeysockets/baileys'

function detectarPais(numero) {
  const codigos = {
    "1": "🇺🇸 EE.UU / 🇨🇦 Canadá", "7": "🇷🇺 Rusia / 🇰🇿 Kazajistán",
    "20": "🇪🇬 Egipto", "27": "🇿🇦 Sudáfrica", "30": "🇬🇷 Grecia",
    "31": "🇳🇱 Países Bajos", "32": "🇧🇪 Bélgica", "33": "🇫🇷 Francia",
    "34": "🇪🇸 España", "36": "🇭🇺 Hungría", "39": "🇮🇹 Italia",
    "40": "🇷🇴 Rumania", "44": "🇬🇧 Reino Unido", "49": "🇩🇪 Alemania",
    "51": "🇵🇪 Perú", "52": "🇲🇽 México", "53": "🇨🇺 Cuba",
    "54": "🇦🇷 Argentina", "55": "🇧🇷 Brasil", "56": "🇨🇱 Chile",
    "57": "🇨🇴 Colombia", "58": "🇻🇪 Venezuela", "591": "🇧🇴 Bolivia",
    "593": "🇪🇨 Ecuador", "595": "🇵🇾 Paraguay", "598": "🇺🇾 Uruguay",
    "502": "🇬🇹 Guatemala", "503": "🇸🇻 El Salvador",
    "504": "🇭🇳 Honduras", "505": "🇳🇮 Nicaragua",
    "506": "🇨🇷 Costa Rica", "507": "🇵🇦 Panamá",
    "60": "🇲🇾 Malasia", "61": "🇦🇺 Australia", "62": "🇮🇩 Indonesia",
    "63": "🇵🇭 Filipinas", "64": "🇳🇿 Nueva Zelanda",
    "65": "🇸🇬 Singapur", "66": "🇹🇭 Tailandia",
    "81": "🇯🇵 Japón", "82": "🇰🇷 Corea del Sur", "84": "🇻🇳 Vietnam",
    "86": "🇨🇳 China", "90": "🇹🇷 Turquía", "91": "🇮🇳 India",
    "212": "🇲🇦 Marruecos", "213": "🇩🇿 Argelia",
    "216": "🇹🇳 Túnez", "218": "🇱🇾 Libia",
    "234": "🇳🇬 Nigeria", "254": "🇰🇪 Kenia",
    "255": "🇹🇿 Tanzania", "256": "🇺🇬 Uganda",
    "258": "🇲🇿 Mozambique", "260": "🇿🇲 Zambia",
    "263": "🇿🇼 Zimbabue"
  }
  for (const code in codigos)
    if (numero.startsWith(code)) return codigos[code]
  return "Desconocido"
}

let thumb = await fetch('https://raw.githubusercontent.com/AkiraDevX/uploads/main/uploads/1763586769709_495967.jpeg')
  .then(res => res.arrayBuffer()).catch(() => null)

const fkontak = {
  key: { participant: '0@s.whatsapp.net', remoteJid: 'status@broadcast', id: 'Halo' },
  message: { locationMessage: { name: '❥ᰰຼ⚡ 𝐘𝐔𝐊𝐈 - 𝐀𝐈  🌿', jpegThumbnail: Buffer.from(thumb || []) } }
}

function fechaHoraPeru() {
  const fecha = new Date().toLocaleDateString("es-PE", {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    timeZone: "America/Lima"
  })
  const hora = new Date().toLocaleTimeString("es-PE", {
    hour: "2-digit", minute: "2-digit", second: "2-digit",
    timeZone: "America/Lima"
  })
  return { fecha, hora }
}


async function generarImagenWelcome({ username, groupName, memberCount, avatar, background }) {
  try {

    const url = `https://canvas-8zhi.onrender.com/api/welcome3?title=${encodeURIComponent("🌹 Bienvenido/a al grupo")}&desc=${encodeURIComponent("¡ᴅɪsғʀᴜᴛᴀ ᴛᴜ ᴇsᴛᴀᴅɪᴀ ᴇɴ ᴇʟ ɢʀᴜᴘᴏ!")}&profile=${encodeURIComponent(avatar)}&background=${encodeURIComponent(background)}`

    const res = await fetch(url)
    if (!res.ok) throw new Error("API Welcome Error")

    return Buffer.from(await res.arrayBuffer())

  } catch (e) {
    console.log("Error Welcome API:", e)
    return null
  }
}

async function generarImagenBye({ username, groupName, memberCount, avatar, background }) {
  try {

    const url = `https://canvas-8zhi.onrender.com/api/welcome3?title=${encodeURIComponent("🌳 Hasta Pronto")}&desc=${encodeURIComponent("(˶˃⤙˂˶) ᴛᴇ ᴇsᴘᴇʀᴀᴍᴏs ᴘʀᴏɴᴛᴏ!")}&profile=${encodeURIComponent(avatar)}&background=${encodeURIComponent(background)}`

    const res = await fetch(url)
    if (!res.ok) throw new Error("API Bye Error")

    return Buffer.from(await res.arrayBuffer())

  } catch (e) {
    console.log("Error Bye API:", e)
    return null
  }
}


async function generarBienvenida({ conn, userId, groupMetadata, chat }) {
  const username = `@${userId.split('@')[0]}`
  const numero = userId.split("@")[0]
  const pais = detectarPais(numero)

  const pp = await conn.profilePictureUrl(userId, 'image')
    .catch(() => 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745522645448.jpeg')

  const { fecha, hora } = fechaHoraPeru()
  const groupSize = groupMetadata.participants.length + 1
  const desc = groupMetadata.desc?.toString() || 'Sin descripción'

  const mensaje = (chat.sWelcome || 'Edita con el comando "setwelcome"')
    .replace(/{usuario}/g, `${username}`)
    .replace(/{grupo}/g, `*${groupMetadata.subject}*`)
    .replace(/{desc}/g, `${desc}`)

  const caption =
`*꒰ ✿ !Bienvenido/a¡, ${username}: ᡣ𐭩  ✿ ꒱*
  
 ⋅˚₊‧🪽‧₊˚ ⋅ *🄶rupo:* ${groupMetadata.subject}
 ⋅˚₊‧🌱‧₊˚ ⋅ *🄼iembros:* ${groupSize}
 ⋅˚₊‧🎋‧₊˚ ⋅ *🄿ais:* ${pais}
 ⋅˚₊‧🌾‧₊˚ ⋅ *🄷ora:* ${hora}
 ⋅˚₊‧🍁‧₊˚ ⋅ *🄵echa:* ${fecha}

> • .˚🌊 𓈒𓏸 *${mensaje}* 𖥻`

  const welcomeImg = await generarImagenWelcome({
    username,
    groupName: groupMetadata.subject,
    memberCount: groupSize,
    avatar: pp,
    background: "https://raw.githubusercontent.com/AkiraDevX/uploads/main/uploads/1764381430380_705529.jpeg"
  })

  return { pp, caption, welcomeImg, mentions: [userId] }
}


async function generarDespedida({ conn, userId, groupMetadata, chat }) {
  const username = `@${userId.split('@')[0]}`
  const numero = userId.split("@")[0]
  const pais = detectarPais(numero)

  const pp = await conn.profilePictureUrl(userId, 'image')
    .catch(() => 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745522645448.jpeg')

  const { fecha, hora } = fechaHoraPeru()
  const groupSize = groupMetadata.participants.length - 1
  const desc = groupMetadata.desc?.toString() || 'Sin descripción'

  const mensaje = (chat.sBye || 'Edita con el comando "setbye"')
    .replace(/{usuario}/g, `${username}`)
    .replace(/{grupo}/g, `${groupMetadata.subject}`)
    .replace(/{desc}/g, `*${desc}*`)

  const caption =
`*✿𐦍 !Hastas pronto¡, ${username} ᡣ𐭩𐦍*

 ⋅˚₊‧🪽‧₊˚ ⋅ *🄶rupo:* ${groupMetadata.subject}
 ⋅˚₊‧🌱‧₊˚ ⋅ *🄼iembros:* ${groupSize}
 ⋅˚₊‧🎋‧₊˚ ⋅ *🄿ais:* ${pais}
 ⋅˚₊‧🌾‧₊˚ ⋅ *🄷ora:* ${hora}
 ⋅˚₊‧🍁‧₊˚ ⋅ *🄵echa:* ${fecha}

> • .˚🌊 𓈒𓏸 *${mensaje}* 𖥻`

  const byeImg = await generarImagenBye({
    username,
    groupName: groupMetadata.subject,
    memberCount: groupSize,
    avatar: pp,
    background: "https://raw.githubusercontent.com/AkiraDevX/uploads/main/uploads/1764382807653_64665.jpeg"
  })

  return { pp, caption, byeImg, mentions: [userId] }
}

let handler = m => m

handler.before = async function (m, { conn, participants, groupMetadata }) {
  try {
    if (!m.messageStubType || !m.isGroup) return !0

    const chat = global.db.data.chats[m.chat]
    const userId = m.messageStubParameters[0]

    if (chat.welcome && m.messageStubType == WAMessageStubType.GROUP_PARTICIPANT_ADD) {

      const { pp, caption, welcomeImg, mentions } = await generarBienvenida({ conn, userId, groupMetadata, chat })

      const { imageMessage } = await generateWAMessageContent(
        welcomeImg ? { image: welcomeImg } : { image: { url: pp } },
        { upload: conn.waUploadToServer }
      )

      const msg = generateWAMessageFromContent(
        m.chat,
        {
          viewOnceMessage: {
            message: {
              interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                body: { text: caption },
                footer: { text: dev },
                header: { title: "", hasMediaAttachment: true, imageMessage },
                contextInfo: { mentionedJid: mentions },
                nativeFlowMessage: {
                  buttons: [
                    {
                      name: "cta_url",
                      buttonParamsJson: JSON.stringify({
                        display_text: " ⃘݂ click aqui",
                        url: channel,
                        merchant_url: channel
                      })
                    }
                  ]
                }
              })
            }
          }
        },
        { quoted: fkontak }
      )
      
     await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
    }

    if (chat.welcome &&
      (m.messageStubType == WAMessageStubType.GROUP_PARTICIPANT_REMOVE ||
       m.messageStubType == WAMessageStubType.GROUP_PARTICIPANT_LEAVE)) {

      const { pp, caption, byeImg, mentions } = await generarDespedida({ conn, userId, groupMetadata, chat })

      const { imageMessage } = await generateWAMessageContent(
        byeImg ? { image: byeImg } : { image: { url: pp } },
        { upload: conn.waUploadToServer }
      )

      const msg = generateWAMessageFromContent(
        m.chat,
        {
          viewOnceMessage: {
            message: {
              interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                body: { text: caption },
                footer: { text: dev },
                header: { title: "", hasMediaAttachment: true, imageMessage },
                contextInfo: { mentionedJid: mentions },
                nativeFlowMessage: {
                  buttons: [
                    {
                      name: "cta_url",
                      buttonParamsJson: JSON.stringify({
                        display_text: " ⃘݂ click aqui",
                        url: channel,
                        merchant_url: channel
                      })
                    }
                  ]
                }
              })
            }
          }
        },
        { quoted: fkontak }
      )

      await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
    }

  } catch (e) {
    console.error(e)
    await conn.sendMessage(m.chat, {
      text: `✘ Error al enviar el welcome: ${e.message}`,
      mentions: [m.sender]
    })
  }
}

export { generarBienvenida, generarDespedida }
export default handler
