module.exports.config = {
  name: "marry",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "ChatGPT",
  description: "Propose marriage to someone",
  commandCategory: "fun",
  usages: "@mention",
  cooldowns: 5
};

module.exports.run = async function ({ api, event }) {
  const mention = Object.keys(event.mentions);

  if (mention.length == 0)
    return api.sendMessage("💍 কাউকে মেনশন করুন!\nউদাহরণ: marry @user", event.threadID, event.messageID);

  const uid = mention[0];
  const name = event.mentions[uid].replace("@", "");

  const replies = [
    `💍 Congratulations!\n😍 ${name} আপনার প্রস্তাব গ্রহণ করেছে!\n🎉 শুভ বিবাহ!`,
    `😂 ওহ না!\n💔 ${name} বলেছে: "আমি এখন বিয়ে করবো না!"`,
    `❤️ ${name} লজ্জা পেয়ে "হ্যাঁ" বলেছে!`,
    `😅 ${name} বলেছে: "আগে চাকরি করো, তারপর বিয়ে!"`,
    `💐 আজ থেকে ${name} আপনার ভার্চুয়াল জীবনসঙ্গী!`
  ];

  const msg = replies[Math.floor(Math.random() * replies.length)];

  return api.sendMessage(msg, event.threadID, event.messageID);
};
