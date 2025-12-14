import { watchFile, unwatchFile } from "fs"
import chalk from "chalk"
import { fileURLToPath } from "url"
import fs from "fs"

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.botNumber = ""  //Ejemplo: 51919199620

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.owner = [
"559296077349",  //  ׄ 𓆩‌۫᷼ ִֶָღ݉͢𝓢𝓪𝓻𝓪𝓱𓆪‌‹࣭݊𓂃ⷪ ִֶָ ᷫ‹ ⷭ.࣭𓆩‌۫᷼Ⴕ۫͜𓆪‌
"51936592936",
"51934053286",
"573244418299"
]

global.suittag = ["51919199620"] 
global.prems = ["51919199620"]

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.libreria = "Baileys Multi Device"
global.vs = "^1.8.2 • Latest"
global.nameqr = "Y͟u͟m͟ï̵̬͟͜𝐁o̸t̸"
global.sessions = "Sessions/Principal"
global.jadi = "Sessions/SubBot"
global.kanekiAIJadibts = true

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.botname = "ׁ❤️̶۫̄͟Y͟u͟m͟ï̵̬͟͜𝐁o̸t̸❤️̶۫̄͟─"
global.textbot = "sմოí, mᥲძᥱ ᥕі𝗍һ ᑲᥡ 𓆩‌۫᷼ ִֶָღ݉͢𝓢𝓪𝓻𝓪𝓱𓆪‌‹࣭݊𓂃ⷪ ִֶָ ᷫ‹ ⷭ.࣭𓆩‌۫᷼Ⴕ۫͜𓆪‌"
global.dev = "© ⍴᥆ᥕᥱrᥱძ ᑲᥡ 𓆩‌۫᷼ ִֶָღ݉͢𝓢𝓪𝓻𝓪𝓱𓆪‌‹࣭݊𓂃ⷪ ִֶָ ᷫ‹ ⷭ.࣭𓆩‌۫᷼Ⴕ۫͜𓆪‌"
global.author = "© mᥲძᥱ ᥕі𝗍һ ᑲᥡ 𓆩‌۫᷼ ִֶָღ݉͢𝓢𝓪𝓻𝓪𝓱𓆪‌‹࣭݊𓂃ⷪ ִֶָ ᷫ‹ ⷭ.࣭𓆩‌۫᷼Ⴕ۫͜𓆪‌"
global.etiqueta = "𓆩‌۫᷼ ִֶָღ݉͢𝓢𝓪𝓻𝓪𝓱𓆪‌‹࣭݊𓂃ⷪ ִֶָ ᷫ‹ ⷭ.࣭𓆩‌۫᷼Ⴕ۫͜𓆪‌"

global.currency = "`femboys 🥵`"
global.banner = "https://raw.githubusercontent.com/AkiraDevX/uploads/main/uploads/1765558675009_50489.jpeg"
global.icono2 = "https://i.pinimg.com/originals/b3/67/d5/b367d513d861de468305c32c6cd22756.jpg"
global.logo = "https://files.catbox.moe/9yxzua.jpg"

global.catalogo = fs.readFileSync('./lib/catalogo.jpg')

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.group = "https://chat.whatsapp.com/FvKyGFv5i1s8Dj2XAQ74WT?mode=hqrt1"
global.community = "https://chat.whatsapp.com/FvKyGFv5i1s8Dj2XAQ74WT?mode=hqrt1"
global.channel = "https://whatsapp.com/channel/0029VbAc6cS002TEZ4r5261E"
global.github = "https://github.com/shadox-xyz/KanekiBot-V3"
global.gmail = "danivelasco745@gmail.com"
global.ch = {
ch1: "120363188537623366@newsletter"
}

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.APIs = {
xyro: { url: "https://xyro.site", key: null },
yupra: { url: "https://api.yupra.my.id", key: null },
vreden: { url: "https://api.vreden.web.id", key: null },
delirius: { url: "https://api.delirius.store", key: null },
zenzxz: { url: "https://api.zenzxz.my.id", key: null },
siputzx: { url: "https://api.siputzx.my.id", key: null },
adonix: { url: "https://api-adonix.ultraplus.click", key: 'the.shadow' }
}

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
unwatchFile(file)
console.log(chalk.redBright("Update 'configXD.js'"))
import(`${file}?update=${Date.now()}`)
})
