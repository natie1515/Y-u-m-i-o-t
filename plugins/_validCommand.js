import fetch from 'node-fetch'
import fs from 'fs'

export async function before(m, { conn }) {
  if (!m.text || !global.prefix.test(m.text)) return

  const usedPrefix = global.prefix.exec(m.text)[0]
  const command = m.text.slice(usedPrefix.length).trim().split(' ')[0].toLowerCase()
  if (!command || command === 'bot') return

  const similarity = (a, b) => {
    let matches = 0
    for (let i = 0; i < Math.min(a.length, b.length); i++) {
      if (a[i] === b[i]) matches++
    }
    return Math.floor((matches / Math.max(a.length, b.length)) * 100)
  }

  const allCommands = Object.values(global.plugins)
    .flatMap(p => Array.isArray(p.command) ? p.command : [p.command])
    .filter(v => typeof v === 'string')

  if (allCommands.includes(command)) {
    let user = global.db.data.users[m.sender]
    if (!user.commands) user.commands = 0
    user.commands++
    return
  }

  const similares = allCommands
    .map(cmd => ({ cmd, score: similarity(command, cmd) }))
    .filter(o => o.score >= 40)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)

  let sugerencias = similares.length
    ? similares.map(s => `> ⤷• .\`${s.cmd}\` (${s.score}%)`).join('\n')
    : '• No se encontraron coincidencias.'

  const texto = `°𓏲🌿 ɴᴏ sᴇ ʜᴀ ᴇɴᴄᴏɴᴛʀᴀᴅᴏ ᴇʟ ᴄᴏᴍᴀɴᴅᴏ: *"${command}"* 🝰

꒰𓂂𓏸🌷 ᴜsᴀ *${usedPrefix}ᴍᴇɴᴜ* ᴘᴀʀᴀ ᴠᴇʀ ʟᴀ ʟɪsᴛᴀ ᴄᴏᴍᴘʟᴇᴛᴀ. 🪴

*! ׁ ׅ 🥗 ᴘᴏsɪʙʟᴇs ᴄᴏɪɴᴄɪᴅᴇɴᴄɪᴀs: 🪽°𖥻*
${sugerencias}`

  await conn.sendMessage(m.chat, {
    document: fs.readFileSync('./README.md'),
    fileName: `.`,
    mimetype: 'application/pdf',
    caption: texto,
    contextInfo: {
      /*isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: channelRD.id,
        serverMessageId: '',
        newsletterName: channelRD.name
      },*/
      externalAdReply: { 
        title: `・⟡・ 🅨𝐔𝐌𝐈 𓈒𓏸 🄰𝐒𝐒𝐈𝐒𝐓𝐄𝐍𝐓 ⿻ﾟ`,
        body: '© ⍴᥆ᥕᥱrᥱძ ᑲᥡ 𓆩‌۫᷼ ִֶָღ݉͢𝓢𝓪𝓻𝓪𝓱𓆪‌‹࣭݊𓂃ⷪ ִֶָ ᷫ‹ ⷭ.࣭𓆩‌۫᷼Ⴕ۫͜𓆪‌',
        thumbnailUrl: 'https://raw.githubusercontent.com/AkiraDevX/uploads/main/uploads/1764537439905_644417.jpeg',
        sourceUrl: redes,
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m })
}
