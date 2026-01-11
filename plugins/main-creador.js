// by dv.shadow - https://github.com/shadox-xyz

import PhoneNumber from 'awesome-phonenumber'
import fetch from 'node-fetch'

const handler = async (m, { conn }) => {

  let developer = {
    name: ' 𓆩‌۫᷼ ִֶָღ݉͢𝓢𝓪𝓻𝓪𝓱𓆪‌ • ᥆𝖿𝖿іᥴіᥲᥣ',
    numCreador: suittag,
    empresa: ' » Yumi ʙᴏᴛ ɪɴɪᴄ.',
    about: '☏ 2024 - 2026 ⎈',
    correo: 'yuminotify.supp@gmail.com',
    web: '',
    direccion: 'Tokyo, Japón 🇯🇵'
  }

  const {
    name,
    numCreador,
    empresa,
    about,
    correo,
    web,
    direccion
  } = developer

  const owner = numCreador + '@s.whatsapp.net'
  const developers = (!owner || owner.startsWith('1203') || owner.length < 15)
    ? 'No encontrado'
    : `@${owner.split('@')[0]}`

  const vcard = `
BEGIN:VCARD
VERSION:3.0
N:;${name};;;
FN:${name}
ORG:${empresa}
TITLE:CEO & Fundador
TEL;waid=${numCreador}:${new PhoneNumber('+' + numCreador).getNumber('international')}
EMAIL:${correo}
URL:${web}
NOTE:${about}
ADR:;;${direccion};;;;
X-ABADR:ES
X-WA-BIZ-NAME:${name}
X-WA-BIZ-DESCRIPTION:${about}
END:VCARD`.trim()

  const contactMessage = {
    displayName: name,
    vcard
  }

  await conn.sendMessage(m.chat, {
    contacts: {
      displayName: name,
      contacts: [contactMessage]
    },
    contextInfo: {
      mentionedJid: [owner],
      externalAdReply: {
        title: '✆ 𝐂𝐨𝐧𝐭𝐚𝐜𝐭𝐨 𝐝𝐞 𝐦𝐢 𝐜𝐫𝐞𝐚𝐝𝐨𝐫𝐚 𝐔𝐰𝐮 ღ',
        body: '❐ ᴄᴏɴᴛᴀᴄᴛᴀ ᴀ ʟᴀ ᴘʀᴏᴘɪᴇᴛᴀʀɪᴀ ᴠɪᴀ ᴡʜᴀᴛsᴀᴘᴘ.',
        mediaType: 1,
        thumbnailUrl: 'https://raw.githubusercontent.com/AkiraDevX/uploads/main/uploads/1767401844802_950891.jpeg',
        renderLargerThumbnail: true,
        sourceUrl: 'https://api.shadow.xyz'
      }
    }
  }, { quoted: m })

  const audioBuffer = await (await fetch(
    'https://raw.githubusercontent.com/AkiraDevX/uploads/main/uploads/1767402410274_485884.mp3'
  )).buffer()

  await conn.sendMessage(m.chat, {
    audio: audioBuffer,
    mimetype: 'audio/mpeg',
    ptt: true
  }, { quoted: fkontak })
}

handler.help = ['creador']
handler.tags = ['info']
handler.command = ['creador', 'creator', 'owner']

export default handler
