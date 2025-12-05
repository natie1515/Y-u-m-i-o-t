import fs from 'fs'
import fetch from 'node-fetch'

let handler = async (m, { conn, command }) => {
try {
  
let text = `
╭━━━〔 🍷 𝐌𝐄𝐍𝐔 𝐲𝐮𝐦𝐢 𝐕𝟏𝟖 🍷 〕━━⬣
│
│ 🩸 *» 𝘽𝙊𝙏:* ${botname}
│ 👁 *» 𝙀𝙎𝙏𝘼𝘿𝙊:* 𝙀𝙉 𝙊𝙋𝙀𝙍𝘼𝘾𝙄𝙊́𝙉
│ ⚙️ *» 𝙑𝙀𝙍𝙎𝙄𝙊́𝙉:* ${vs}
│ 🕶 *» 𝙏𝙀𝙈𝘼:* ❤️̶۫̄͟Y͟u͟m͟ï̵̬͟͜𝐁o̸t̸❤️̶۫̄͟─ 𝐌𝐎𝐃𝐄
│
╰━━━〔 🔥 𝐒𝐘𝐒𝐓𝐄𝐌 𝐑𝐔𝐍𝐍𝐈𝐍𝐆 🔥 〕━━⬣

no ay xd
`

await conn.sendMessage(m.chat, { 
  footer: `2025 ${botname}`,
  headerType: 1,
  viewOnce: true,

  document: fs.readFileSync("./package.json"),
  fileName: `「 ⚡ 𝐌𝐄𝐍𝐔 𝐲𝐮𝐦𝐢 ⚡ 」`,
  mimetype: 'application/vnd.ms-excel',
  fileLength: 99999999,
  caption: text.trim(),
  buttons: [
    { buttonId: '#menu', buttonText: { displayText: ' 𝚅𝙴𝚁 𝙼𝙴𝙽𝚄 🍟' }, type: 1 },
    { buttonId: '#p', buttonText: { displayText: ' 𝚅𝙴𝙻𝙾𝙲𝙸𝙳𝙰𝙳 🚀' }, type: 1 }
  ],

  contextInfo: { 
    isForwarded: true,
    mentionedJid: [m.sender],
    externalAdReply: { 
      title: `『 💮 𝐌𝐄𝐍𝐔 𝐲𝐮𝐦𝐢 𝐕𝟏𝟖 🚀 』`,
      body: `𝐲𝐮𝐦𝐢 𝘪𝘴 𝘸𝘢𝘵𝘤𝘩𝘪𝘯𝘨 𝘺𝘰𝘶...`,
      thumbnail: await (await fetch(banner)).buffer(),
      sourceUrl: 'https://vt.tiktok.com/ZSyMm8YQ6/',
      mediaType: 1,
      renderLargerThumbnail: true,
    }
  }

}, { quoted: fkontak })

m.react('🍒')

} catch (e) {
console.log(e)
m.reply('⚠️ Error al enviar el 𝐌𝐄𝐍𝐔 𝐲𝐮𝐦𝐢 𝐕𝟏𝟖.')
}
}

handler.command = ['menu18']
handler.register = true;

export default handler
