module.exports = {
  config: {
    name: "bby",
    version: "1.0.0",
    author: "Mukul",
    countDown: 5,
    role: 0,
    shortDescription: "Baby Reply",
    longDescription: "Cute baby reply command",
    category: "fun",
    guide: "{pn}"
  },

  onStart: async function ({ message }) {
    const replies = [
      "🥺 কি হয়েছে বেবি?",
      "💖 আমি আছি তো, বলো।",
      "🌸 এতো ডাকছো কেন বেবি?",
      "🤍 তোমার জন্য সবসময় অনলাইন আছি।",
      "😊 বলো বেবি, কী লাগবে?"
    ];

    const random = replies[Math.floor(Math.random() * replies.length)];
    return message.reply(random);
  }
};
