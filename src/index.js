//Glass Cat bot. just for fun

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
    message.reply("meow!"); //Make send a random image of cat from an image bank
  }
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "cat-trivia") {
    interaction.reply("cat trivia!"); //Make cat trivia game
  }
});

client.login(process.env.TOKEN);
