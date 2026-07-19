const axios = require("axios");

let simsim = "";
let count_req = 0;
// Note : THIS CODE MADE BY RX @RX_ABDULLAH007 (GIVE CREDIT OTHERWISE EVERYONE FUCK YOU AT 300 KM SPEED)
async function sendTypingIndicatorV2(sendTyping, threadID) {
try {
var wsContent = {
app_id: 2220391788200892,
payload: JSON.stringify({
label: 3, //original author - rX Abdullah
payload: JSON.stringify({
thread_key: threadID.toString(),
is_group_thread: +(threadID.toString().length >= 16),
is_typing: +sendTyping,
attribution: 0
}),
version: 5849951561777440
}),
request_id: ++count_req,
type: 4
};
await new Promise((resolve, reject) =>
mqttClient.publish('/ls_req', JSON.stringify(wsContent), {}, (err, _packet) =>
err ? reject(err) : resolve()
)
);
} catch (err) {
console.log("⚠️ Typing indicator error:", err.message);
}
}

(async () => {
try {
const res = await axios.get("https://raw.githubusercontent.com/abdullahrx07/X-api/main/MaRiA/baseApiUrl.json");
if (res.data && res.data.mari) simsim = res.data.mari;
} catch {}
})();

module.exports.config = {
name: "baby",
aliases: ["maria", "hippi"],
premium: false,
version: "1.1.0",
hasPermssion: 0,
credits: "rX",
description: "AI auto teach with Teach & List support + Typing effect",
commandCategory: "chat",
usages: "[query]",
cooldowns: 0,
prefix: false
};

module.exports.run = async function ({ api, event, args, Users }) {
const uid = event.senderID;
const senderName = await Users.getNameUser(uid);
const query = args.join(" ").toLowerCase();

try {
if (!simsim) return api.sendMessage("❌ API not loaded yet.", event.threadID, event.messageID);

if (args[0] === "autoteach") {
const mode = args[1];
if (!["on", "off"].includes(mode))
return api.sendMessage("✅ Use: baby autoteach on/off", event.threadID, event.messageID);

const status = mode === "on";
await axios.post(${simsim}/setting, { autoTeach: status });
return api.sendMessage(✅ Auto teach is now ${status ? "ON 🟢" : "OFF 🔴"}, event.threadID, event.messageID);
}

if (args[0] === "list") {
const res = await axios.get(${simsim}/list);
return api.sendMessage(
╭─╼🌟 𝐁𝐚𝐛𝐲 𝐀𝐈 𝐒𝐭𝐚𝐭𝐮𝐬\n├ 📝 𝐓𝐞𝐚𝐜𝐡𝐞𝐝 𝐐𝐮𝐞𝐬𝐭𝐢𝐨𝐧𝐬: ${res.data.totalQuestions}\n├ 📦 𝐒𝐭𝐨𝐫𝐞𝐝 𝐑𝐞𝐩𝐥𝐢𝐞𝐬: ${res.data.totalReplies}\n╰─╼👤 𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐞𝐫: 𝐫𝐗 𝐀𝐛𝐝𝐮𝐥𝐥𝐚𝐡,
event.threadID,
event.messageID
);
}

if (args[0] === "msg") {
const trigger = args.slice(1).join(" ").trim();
if (!trigger) return api.sendMessage("❌ | Use: !baby msg [trigger]", event.threadID, event.messageID);

const res = await axios.get(${simsim}/simsimi-list?ask=${encodeURIComponent(trigger)});
if (!res.data.replies || res.data.replies.length === 0)
return api.sendMessage("❌ No replies found.", event.threadID, event.messageID);

const formatted = res.data.replies.map((rep, i) => ➤ ${i + 1}. ${rep}).join("\n");
const msg = 📌 𝗧𝗿𝗶𝗴𝗴𝗲𝗿: ${trigger.toUpperCase()}\n📋 𝗧𝗼𝘁𝗮𝗹: ${res.data.total}\n━━━━━━━━━━━━━━\n${formatted};
return api.sendMessage(msg, event.threadID, event.messageID);
}

if (args[0] === "teach") {
const parts = query.replace("teach ", "").split(" - ");
if (parts.length < 2)
return api.sendMessage("❌ | Use: teach [Question] - [Reply]", event.threadID, event.messageID);

const [ask, ans] = parts;
const res = await axios.get(${simsim}/teach?ask=${encodeURIComponent(ask)}&ans=${encodeURIComponent(ans)}&senderID=${uid}&senderName=${encodeURIComponent(senderName)});
return api.sendMessage(✅ ${res.data.message}, event.threadID, event.messageID);
}

if (args[0] === "edit") {
const parts = query.replace("edit ", "").split(" - ");
if (parts.length < 3)
return api.sendMessage("❌ | Use: edit [Question] - [OldReply] - [NewReply]", event.threadID, event.messageID);

const [ask, oldR, newR] = parts;
const res = await axios.get(${simsim}/edit?ask=${encodeURIComponent(ask)}&old=${encodeURIComponent(oldR)}&new=${encodeURIComponent(newR)});
return api.sendMessage(res.data.message, event.threadID, event.messageID);
}

if (["remove", "rm"].includes(args[0])) {
const parts = query.replace(/^(remove|rm)\s*/, "").split(" - ");
if (parts.length < 2)
return api.sendMessage("❌ | Use: remove [Question] - [Reply]", event.threadID, event.messageID);

const [ask, ans] = parts;
const res = await axios.get(${simsim}/delete?ask=${encodeURIComponent(ask)}&ans=${encodeURIComponent(ans)});
return api.sendMessage(res.data.message, event.threadID, event.messageID);
}

if (!query) {
const texts = ["Hey baby 💖", "Yes, I'm here 😘"];
const reply = texts[Math.floor(Math.random() * texts.length)];
return api.sendMessage(reply, event.threadID);
}

await sendTypingIndicatorV2(true, event.threadID);
await new Promise(r => setTimeout(r, 2000));
await sendTypingIndicatorV2(false, event.threadID);

const res = await axios.get(${simsim}/simsimi?text=${encodeURIComponent(query)}&senderName=${encodeURIComponent(senderName)});
return api.sendMessage(res.data.response, event.threadID, (err, info) => {
if (!err) {
global.client.handleReply.push({
name: module.exports.config.name,
messageID: info.messageID,
author: event.senderID,
type: "simsimi"
});
}
}, event.messageID);

} catch (e) {
return api.sendMessage(❌ Error: ${e.message}, event.threadID, event.messageID);
}
};

module.exports.handleReply = async function ({ api, event, Users }) {
const senderName = await Users.getNameUser(event.senderID);
const text = event.body?.toLowerCase();
if (!text || !simsim) return;

try {
await sendTypingIndicatorV2(true, event.threadID);
await new Promise(r => setTimeout(r, 2000));
await sendTypingIndicatorV2(false, event.threadID);

const res = await axios.get(${simsim}/simsimi?text=${encodeURIComponent(text)}&senderName=${encodeURIComponent(senderName)});
return api.sendMessage(res.data.response, event.threadID, (err, info) => {
if (!err) {
global.client.handleReply.push({
name: module.exports.config.name,
messageID: info.messageID,
author: event.senderID,
type: "simsimi"
});
}
}, event.messageID);
} catch (e) {
return api.sendMessage(❌ Error: ${e.message}, event.threadID, event.messageID);
}
};

module.exports.handleEvent = async function ({ api, event, Users }) {
const text = event.body?.toLowerCase().trim();
if (!text || !simsim) return;

const senderName = await Users.getNameUser(event.senderID);
const triggers = ["baby", "bby", "বট", "bot", "SAJIB", "সজীব"];

if (triggers.includes(text)) {
const replies = ["বেশি করচ্ছিস নাকি🤣","বেশি bot Bot করলে leave নিবো কিন্তু😒😒 ","শুনবো না😼তুমি আমার(মুকুল) বসকে প্রেম করাই দাও নাই🥺পচা তুমি🥺","আমি আবাল দের সাথে কথা বলি না,ok😒","এতো ডেকো না,প্রেম এ পরে যাবো তো🙈","Bolo Babu, তুমি কি আমাকে ভালোবাসো? 🙈💋 ","বার বার ডাকলে মাথা গরম হয়ে যায় কিন্তু😑","হ্যা বলো😒, তোমার জন্য কি করতে পারি😐😑?","এতো ডাকছিস কেন?গালি শুনবি নাকি? 🤬","I love you janu🥰","আরে Bolo আমার জান ,কেমন আছো?😚 "," অসম্মান করছিস😰😿","Hop beda😾 Boss বল boss😼","চুপ থাক নাই তো তোর দাত ভেগে দিবো কিন্তু","আরেকবার বট বললে ওইটা কেটে ছোট বানিয়ে দিবো🤭🤫","বট বলে চলে যাস কেন😤🥺কী হলো উওর দে🥺"," জানু বল জানু 😘 ","বার বার Disturb করছিস কোনো😾,আমার জানুর সাথে ব্যাস্ত আছি😋","বোকাচোদা এতো ডাকিস কেন🤬","আমাকে ডাকলে ,আমি কিন্তু কিস করে দিবো😘 ","আমারে এতো ডাকিস না আমি মজা করার mood এ নাই এখন😒","চিপায় আছি ডিস্টার্ব করিস না🙊🙁","হ্যাঁ জানু , এইদিক এ আসো কিস দেই🤭 😘","দূরে যা, তোর কোনো কাজ নাই, শুধু bot bot করিস  😉😋🤣","তোর কথা তোর বাড়ি কেউ শুনে না ,তো আমি কোনো শুনবো ?🤔😂 ","আমাকে ডেকো না,আমি ব্যাস্ত আছি","কি হলো , মিস্টেক করচ্ছিস নাকি🤣","বলো কি বলবা, সবার সামনে বলবা নাকি?🤭🤏","কালকে দেখা করিস তো একটু 😈","হা বলো, শুনছি আমি 😏","আর কত বার ডাকবি ,শুনছি তো","হুম বলো কি বলবে😒","উফ্ খেলার সময়ও ডাকা-ডাকি করে 😑🌚🔞","বলো কি করতে পারি তোমার জন্য","আমি তো অন্ধ কিছু দেখি না🐸 😎","মুকুল বস তোমাকে ভালোবাসে😌","বলো জানু 🌚","তোর কি চোখে পড়ে না আমি সজীব জানুর সাথে ব্যাস্ত আছি😒","হুম জান তোমার ওই খানে উম্মাহ😑😘","আহ শুনা আমার তোমার অলিতে গলিতে উম্মাহ😇😘"," jang hanga korba😒😬","হুম জান তোমার অইখানে উম্মমাহ😷😘","আসসালামু আলাইকুম বলেন আপনার জন্য কি করতে পারি..!🥰","আমাকে এতো না ডেকে বস মুকুল এর কে একটা গার্লফ্রেন্ড দে 🙄","আমাকে এতো ডাকো কেন?🤔 ভলো-টালো বাসো নাকি🤭🙈","🌻🌺💚আসসালামু আলাইকুম ওয়া রাহমাতুল্লাহ-💚🌺🌻","আমি এখন বস মুকুল এর সাথে বিজি আছি আমাকে ডাকবেন না-😕😏 ধন্যবাদ-🤝🌻","আমাকে না ডেকে আমার বস মুকুল কে একটা জি এফ দাও-😽🫶🌺","জান🥺 তুমি এখন শুধু বট বলে চলে যাও 😒 ভুলে গেলা নাকি🙂❓","উফফ বুঝলাম না এতো ডাকছেন কেনো-😤😡😈","জান তোমার নানি'রে আমার হাতে তুলে দিবা-🙊🙆‍♂","আজকে আমার মন ভালো নেই তাই আমারে ডাকবেন না-😪🤧","আমি তোমাকে রাতে রাতে ভালোবাসি উম্মম্মাহ-🌺🤤💦","চুনা ও চুনা আমার বস মুকুল এর হবু বউ রে কেও দেকছো খুজে পাচ্ছি না😪🤧😭","স্বপ্ন তোমারে নিয়ে দেখতে চাই তুমি যদি আমার হও🥹😭","কষ্ট পাবি..!🙂💔","বন্ধুর সাথে ছেকা খাওয়া গান শুনতে শুনতে-🤧 -এখন আমিও বন্ধুর 𝙴𝚇 কে অনেক 𝙼𝙸𝚂𝚂 করি-🤕🥺","৯৯টাকায় ৯৯জিবি ৯৯বছর-☺️🐸 -অফারটি পেতে এখনই আমাকে প্রোপস করুন-🤗😂👈","প্রিয়-🥺 -তোমাকে না পেলে আমি সত্যি-😪 -আরেকজন কে-😼 -পটাতে বাধ্য হবো-😑🤧","কিরে🫵 তরা নাকি  prem করস..😐🐸•আমারে একটা করাই দিলে কি হয়-🥺","যেই আইডির মায়ায় পড়ে ভুল্লি আমারে.!🥴- তুই কি যানিস সেই আইডিটাও আমি চালাইরে.!🙂"];
const reply = replies[Math.floor(Math.random() * replies.length)];

await sendTypingIndicatorV2(true, event.threadID);
await new Promise(r => setTimeout(r, 5000));
await sendTypingIndicatorV2(false, event.threadID);

return api.sendMessage(reply, event.threadID, (err, info) => {
if (!err) {
global.client.handleReply.push({
name: module.exports.config.name,
messageID: info.messageID,
author: event.senderID,
type: "simsimi"
});
}
});
}

const matchPrefix = /^(baby|bby|xan|bbz|mari|মারিয়া)\s+/i;
if (matchPrefix.test(text)) {
const query = text.replace(matchPrefix, "").trim();
if (!query) return;

await sendTypingIndicatorV2(true, event.threadID);
await new Promise(r => setTimeout(r, 5000));
await sendTypingIndicatorV2(false, event.threadID);

try {
const res = await axios.get(${simsim}/simsimi?text=${encodeURIComponent(query)}&senderName=${encodeURIComponent(senderName)});
return api.sendMessage(res.data.response, event.threadID, (err, info) => {
if (!err) {
global.client.handleReply.push({
name: module.exports.config.name,
messageID: info.messageID,
author: event.senderID,
type: "simsimi"
});
}
}, event.messageID);
} catch (e) {
return api.sendMessage(❌ Error: ${e.message}, event.threadID, event.messageID);
}
}

if (event.type === "message_reply") {
try {
const setting = await axios.get(${simsim}/setting);
if (!setting.data.autoTeach) return;

const ask = event.messageReply.body?.toLowerCase().trim();
const ans = event.body?.toLowerCase().trim();
if (!ask || !ans || ask === ans) return;

setTimeout(async () => {
try {
await axios.get(${simsim}/teach?ask=${encodeURIComponent(ask)}&ans=${encodeURIComponent(ans)}&senderName=${encodeURIComponent(senderName)});
console.log("✅ Auto-taught:", ask, "→", ans);
} catch (err) {
console.error("❌ Auto-teach internal error:", err.message);
}
}, 300);
} catch (e) {
console.log("❌ Auto-teach setting error:", e.message);
}
}
};
