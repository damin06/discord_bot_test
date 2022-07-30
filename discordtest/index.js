const { Client, Intents, DiscordAPIError } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const {prefix, token} = require('./config.json')
const fs = require('fs');
const { maxHeaderSize } = require('http');

client.commands = new Discord.Collection()
const commandFiles = fs.readdirSync('./commands').filter(file=>file.endsWith('.js' ))
for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    client.command.set(command.name,command)
}
client.on('ready',()=>{
    console.log("봇이 준비되었습니다.")
})
client.on('message',msg=>{
   if(!msg.content.startsWith(prefix) || msg.author.bot)return
   const args = msg.content.slice(prefix.length).trim().split(/ +/)
   const commandName = args.shift()
   const command = client.commands.get(commandName)
   try{
command.execute(msg,args)
   }catch(error){
       console.log(error)
   }
   

})

client.login(token)