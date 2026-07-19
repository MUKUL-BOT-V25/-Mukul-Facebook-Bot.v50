module.exports.config = {
  name: "joke",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "ChatGPT",
  description: "Random funny jokes",
  commandCategory: "fun",
  usages: "",
  cooldowns: 5
};

module.exports.run = async function ({ api, event }) {

  const jokes = [
    "😂 শিক্ষক: বল তো, পৃথিবী গোল কেন?\n🙄 ছাত্র: যাতে সবাই একদিন না একদিন ঘুরে ফিরে একই জায়গায় আসে!",
    "🤣 বন্ধু: তুই এত ঘুমাস কেন?\n😴 উত্তর: স্বপ্নে তো আমি CEO!",
    "😂 ডাক্তার: কম খাও।\n🍔 রোগী: তাহলে খাবারগুলো কষ্ট পাবে না?",
    "🤣 প্রেমিকা: আমাকে কতটা ভালোবাসো?\n💖 প্রেমিক: WiFi চলে গেলে যতটা কষ্ট পাই, তার চেয়েও বেশি!",
    "😂 মা: পড়তে বসেছিস?\n🙄 ছেলে: হ্যাঁ, বইয়ের দিকে তাকিয়ে আছি!",
    "🤣 দোকানদার: আর কিছু লাগবে?\n😆 কাস্টমার: টাকা থাকলে লাগতো!",
    "😂 বন্ধু: তোর IQ কত?\n🤓 উত্তর: Calculator ছাড়া বলতে পারব না!",
    "🤣 স্যার: দেরি করে এলে কেন?\n😴 ছাত্র: ঘড়িটাও ঘুমিয়ে ছিল!",
    "😂 বাবা: টাকা কোথায় গেল?\n🙈 ছেলে: টাকা স্বাধীনতা চাইছিল!",
    "🤣 Google: কিছু খুঁজছেন?\n😎 আমি: নিজের ভাগ্য!"
  ];

  const random = jokes[Math.floor(Math.random() * jokes.length)];

  return api.sendMessage(random, event.threadID, event.messageID);
};
