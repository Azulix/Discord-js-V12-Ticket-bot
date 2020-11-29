const { token, default_prefix } = require("./config.json");
const { config } = require("dotenv");

const discord = require("discord.js"); //Gonna use Discord.js Module xD
const client = new discord.Client({
  disableEveryone: true // what does this disable thing do?
});
const db = require("quick.db"); //WE WILL BE USING QUICK.DB
client.commands = new discord.Collection();
client.aliases = new discord.Collection();
//
["command"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});
client.on('ready', () => {
  client.user.setStatus("dnd");
  const statuses = [
      () => 'status'
  ]
  let i = 0
  setInterval(() => {
      client.user.setActivity(statuses[i](), {type: 'WATCHING', url: "https://twitch.tv/NovaXenos"})
      i = ++i % statuses.length
  }, 2e4)

})

//FINISH

//STOP
client.on("message", async message => {
  if (message.author.bot) return;  

  //START

//IS URL FUNCTION - START


 //


 
  
  //END
  if (!message.guild) return;
  let prefix = db.get(`prefix_${message.guild.id}`);
  if (prefix === null) prefix = default_prefix;

  if (!message.content.startsWith(prefix)) return;

  if (!message.member)
    message.member = await message.guild.fetchMember(message);

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

let cmdx = db.get(`cmd_${message.guild.id}`)

if(cmdx) {
  let cmdy = cmdx.find(x => x.name === cmd)
  if(cmdy) message.channel.send(cmdy.responce)
}

  // Get the command
  let command = client.commands.get(cmd);
  // If none is found, try to find it by alias
  if (!command) command = client.commands.get(client.aliases.get(cmd));



  // If a command is finally found, run the command

  if (command) command.run(client, message, args, prefix);

}); //All codes link in description


console.log('\x1b[35m%s\x1b[0m', `            $[BOT]: ON`); 


client.login(token);



