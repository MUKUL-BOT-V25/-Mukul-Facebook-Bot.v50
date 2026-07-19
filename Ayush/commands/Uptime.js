const os = require("os");

module.exports.config = {
  name: "uptime",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "ChatGPT",
  description: "Show bot uptime",
  commandCategory: "system",
  usages: "",
  cooldowns: 5
};

module.exports.run = async function ({ api, event }) {
  const uptime = process.uptime();

  const days = Math.floor(uptime / 86400);
  const hours = Math.floor((uptime % 86400) / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);
  const seconds = Math.floor(uptime % 60);

  const ram = (process.memoryUsage().rss / 1024 / 1024).toFixed(2);

  const msg = `🤖 BOT UPTIME

⏰ ${days}D ${hours}H ${minutes}M ${seconds}S

💻 OS: ${os.platform()}
🧠 RAM: ${ram} MB
⚡ Node: ${process.version}`;

  return api.sendMessage(msg, event.threadID, event.messageID);
};
