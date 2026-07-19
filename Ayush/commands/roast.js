module.exports.config = {
  name: "roast",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "ChatGPT",
  description: "Funny roast command",
  commandCategory: "fun",
  usages: "@mention",
  cooldowns: 5
};

module.exports.run = async function ({ api, event }) {

  const mention = Object.keys(event.mentions);

  if (mention.length == 0)
    return api.sendMessage("😂 কাউকে মেনশন করুন!\nউদাহরণ: roast @user", event.threadID, event.messageID);

  const uid = mention[0];
  const name = event.mentions[uid].replace("@", "");

  const roast = [
    `😂 ${name}, তোমাকে দেখে WiFi-ও Disconnect হয়ে যায়!`,
    `🙄 ${name}, তোমার IQ চার্জারে লাগিয়ে চার্জ দিতে হয়!`,
    `🤡 ${name}, তোমাকে দেখে আয়নাও হাসে!`,
    `🐢 ${name}, এত স্লো যে কচ্ছপও ওভারটেক করে!`,
    `🤣 ${name}, তোমার স্টাইল দেখে মশারাও কামড়াতে চায় না!`,
    `💀 ${name}, তুমি অনলাইনে আসলেই গ্রুপের Ping বেড়ে যায়!`,
    `😹 ${name}, তোমাকে দেখে Google-ও বলে: "No Results Found!"`,
    `🤭 ${name}, তুমি এত ফানি যে নিজের জোকেও নিজেই হাসো!`,
    `😴 ${name}, তোমাকে দেখে ঘুমও আবার ঘুমিয়ে পড়ে!`,
    `🍌 ${name}, কলাও তোমার থেকে বেশি সিরিয়াস!`
  ];

  return api.sendMessage(
    roast[Math.floor(Math.random() * roast.length)],
    event.threadID,
    event.messageID
  );
};
