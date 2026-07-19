module.exports.config = {
  name: "pp",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "ChatGPT",
  description: "Power Percentage",
  commandCategory: "fun",
  usages: "",
  cooldowns: 5
};

module.exports.run = async function ({ api, event }) {
  const percent = Math.floor(Math.random() * 101);

  let rank = "😴 Noob";
  if (percent >= 20) rank = "🙂 Beginner";
  if (percent >= 40) rank = "😎 Pro";
  if (percent >= 60) rank = "🔥 Master";
  if (percent >= 80) rank = "💀 Legend";
  if (percent >= 95) rank = "👑 GOD LEVEL";

  const msg = `
⚡ POWER CHECK ⚡

🔋 Power : ${percent}%

🏆 Rank : ${rank}

🤖 Powered By MUKUL BOT
`;

  return api.sendMessage(msg, event.threadID, event.messageID);
};
