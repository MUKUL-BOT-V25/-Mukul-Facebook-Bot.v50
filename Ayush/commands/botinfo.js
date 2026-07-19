const axios = require("axios");
const fs = require("fs-extra");

const path = __dirname + "/cache/botinfo.jpg";

const res = await axios.get(
  "https://i.imgur.com/w6ZA3hR.jpeg",
  { responseType: "arraybuffer" }
);

fs.writeFileSync(path, Buffer.from(res.data));

api.sendMessage({
  body: `🤖 MUKUL BOT INFO

👑 Owner: Mukul
⚡ Status: Online`,
  attachment: fs.createReadStream(path)
}, event.threadID, () => fs.unlinkSync(path), event.messageID);
