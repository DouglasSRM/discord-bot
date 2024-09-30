require("dotenv").config();
const { REST, Routes } = require("discord.js");

const commands = [
  {
    name: "cat-trivia",
    description: "Start a cat trivia game",

    //Make a collecting game like the pokemon roll on mudae but to collect different cats, with different rarities and all
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("Registering slash comands...");
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );
    console.log("Slash commands were registered successfully!");
  } catch (error) {
    console.log(`There was an error: ${error}`);
  }
})();
