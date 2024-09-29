require("dotenv").config();
const { Client, IntentsBitField } = require("discord.js");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("ready", (c) => {
  console.log(`🐈 ${c.user.username} is online.`);
});

client.on("messageCreate", (message) => {
  if (message.author.bot) {
    return;
  }

  if (
    message.content.toLowerCase().includes("glasscat") ||
    message.content.toLowerCase().includes("glass cat")
  ) {
    message.reply("meoww");
    return;
  }
  if (message.content.toLowerCase().includes("meow")) {
    message.reply("meow!");
  }
});

client.login(process.env.TOKEN);
