//Glass Cat bot. just for fun

require("dotenv").config();
const { Client, IntentsBitField } = require("discord.js");

const ALLOWED_CHANNEL_IDS = [
  '1289779763241812022'
  , '1397397940200538202'
  , '1397730627868164128'
] 

var replyed_messages = []

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
  partials: ['MESSAGE', 'CHANNEL']
});

client.on("ready", (c) => {
  console.log(`🐈 ${c.user.username} is online!`);
});

client.on('messageUpdate', async (oldMessage, newMessage) => {
  if (!ALLOWED_CHANNEL_IDS.includes(newMessage.channel.id)) return;
  
  try {
    console.log('update')
    // Se a mensagem antiga for partial, tente buscar o conteúdo completo
    if (oldMessage.partial) await oldMessage.fetch();

    if (newMessage.author.bot) return; // Ignora bots

    var oldMsg = oldMessage.content
    var newMsg = newMessage.content

    console.log(`Antes: ${oldMessage.content}`);
    console.log(`Depois: ${newMessage.content}`);

    if (parseInt(oldMsg.split(' ')[0], 10) != parseInt(newMsg.split(' ')[0], 10)) {
      
      console.log(replyed_messages)
      if (replyed_messages.includes(oldMessage.id)) { return }

      const partes = newMsg.split(' ')

      partes[0] = oldMsg.split(' ')[0]

      const correctNumber = parseInt(oldMsg.split(' ')[0], 10).toString()
      
      await newMessage.reply(`${newMessage.author}, didnt you mean `+correctNumber+`? >:(`)
      //await newMessage.edit(msgCorrigida)
      
      replyed_messages.push(newMessage.id)

      console.log('deu boa')
    }

  } catch (error) {
    console.error('Erro ao processar messageUpdate:', error);
  }
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) {
    return;
  }

  if (
    message.content.toLowerCase().includes("glasscat") ||
    message.content.toLowerCase().includes("glass cat")
  ) {
    message.reply("meow!"); //Make send a random image of cat from an image bank
  }

  if (!ALLOWED_CHANNEL_IDS.includes(message.channel.id)) return;
  console.log('passou')

  try {
    var messages = await message.channel.messages.fetch({ limit: 10 })
    messages = messages.filter(msg => !msg.author.bot)
    messages = messages.first(2)

    const messagesArray = Array.from(messages.values())

    var numeroAnterior = 0
    if (messagesArray.length < 2) {
      console.log('Não há mensagem anterior.');
    } else {

      var aux = messagesArray[1].content.split(' ')[0];

      numeroAnterior = parseInt(aux, 10);


      console.log('numero anterior:',numeroAnterior)
    }
    
    var msg = message.content.toLowerCase()
    
    if (parseInt(msg.split(' ')[0], 10) != numeroAnterior+1) {
      message.delete()
    }

  } catch (erro){
    console.error('deu ruim: ', erro)
  }
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  //if (interaction.commandName === "cat-trivia") {
   // interaction.reply("cat trivia!"); //Make cat trivia game
 // }
});

client.login(process.env.TOKEN);
