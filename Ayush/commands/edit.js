module.exports = {
  config: {
    name: "edit",
    version: "1.0",
    author: "ChatGPT",
    countDown: 5,
    role: 0,
    shortDescription: "Edit bot message",
    longDescription: "Edit the replied bot message",
    category: "utility",
    guide: "{pn} <new text>"
  },

  onStart: async function ({ message, args }) {
    if (!args[0])
      return message.reply("Usage: edit <new text>");

    const text = args.join(" ");

    try {
      await message.edit(text);
    } catch (e) {
      return message.reply("❌ এই ফর্কে message.edit() সাপোর্ট করে না।");
    }
  }
};
