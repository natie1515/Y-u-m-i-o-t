// by dv.shadow - https://github.com/shadox-xyz

import PhoneNumber from 'awesome-phonenumber';
import fetch from 'node-fetch';

const handler = async (m, { conn }) => {
  const name = '🎄 ۪Sarah.᥊ᥡz. oficial'
  const numCreador = '559296077349'
  const empresa = '𝐲𝐮𝐦𝐢 ʙᴏᴛ ɪɴɪᴄ.'
  const about = '🍒 𝑫𝒆𝒔𝒂𝒓𝒓𝒐𝒍𝒍𝒂𝒅𝒐𝒓 𝒅𝒆 𝑺𝒂𝒓𝒂𝒉-𝑩𝒐𝒕 𝑽3 :D'
  const correo = 'danivelasco745@gmail.com 
  const web = 'https://shadow-xyz.vercel.app/'
  const direccion = 'Tokyo, Japón 🇯🇵'
  const fotoPerfil = 'https://raw.githubusercontent.com/AkiraDevX/uploads/main/uploads/1764513030769_35769.jpeg'

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
END:VCARD`.trim();

  const contactMessage = {
    displayName: name,
    vcard
  };

  const Shadow_url = await (await fetch("https://raw.githubusercontent.com/AkiraDevX/uploads/main/uploads/1764513335162_487707.jpeg")).buffer();

  const fkontak = {
    key: {
      fromMe: false,
      participant: "0@s.whatsapp.net",
      remoteJid: "status@broadcast"
    },
    message: {
      productMessage: {
        product: {
          productImage: {
            mimetype: "image/jpeg",
            jpegThumbnail: Shadow_url
          },
          title: "contacto test",
          description: ""
        },
        businessOwnerJid: `${numCreador}@s.whatsapp.net`
      }
    }
  };

  m.react('🌿');
  conn.reply(m.chat, `*\`☕ Enviando contacto xd....\`*`, m)

  await conn.sendMessage(m.chat, {
    contacts: {
      displayName: name,
      contacts: [contactMessage]
    },
    contextInfo: {
      mentionedJid: [m.sender],
      externalAdReply: {
        title: 'ekisde 🙂‍↕️',
        body: textbot,
        mediaType: 1,
        thumbnailUrl: fotoPerfil,
        renderLargerThumbnail: true,
        sourceUrl: ''
      }
    }
  }, { quoted: fkontak });
};

handler.help = ['creador'];
handler.tags = ['info'];
handler.command = ['creador', 'creator', 'owner'];
export default handler;
