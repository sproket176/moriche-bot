const Discord = require('discord.js');
const request = require('request');
const bot = new Discord.Client();

const server_id = '469152950669934593';
const spam_channel = '469153165967884299';
const migrations_channel = '557199077666717698';
const cmd_channel = '473938199153213461';
const count_channel = '526357805159022602';
const count_bots_channel = '526364100670914570';
const prefix = '/';

function checkBots(guild) {
    let botCount = 0;
    guild.members.forEach(member => {
      if(member.user.bot) botCount++;
    });
    return botCount;
}

  bot.on('ready', async () => {
    console.log(`Logged in as ${bot.user.tag}!`);
    bot.user.setActivity('Los Santos Role Play', { type: 'PLAYING' });
   });
  
  bot.on('guildMemberAdd', member => {
      var role = member.guild.roles.find('name', 'Brak panelu');
    member.addRole(role).catch(console.error);
    let guild = bot.guilds.get(server_id);
    if(guild) {
        let channel = guild.channels.get(migrations_channel);
        if(channel)
    channel.send(`Nowy pracownik, ${member}.`);
    member.send(`Siema ${member}. Złożyłeś pomyślnie podanie i dołączyłeś do naszej poczekalni Discord. Pierwsze co musisz zrobić to ustawić nick według wzoru (komenda /nick na dowolnym kanale lub RMB -> zmień pseudonim): **nick IC || nick OOC** oraz dla własnej wygody możesz zainstalować modyfikacje z kanału **#nasze_modyfikacje**. Oczekuj na nadanie uprawnień przez osoby uprawnione w zależności od firmy, do której aplikowałeś.`);

    let count_all = guild.channels.get(count_channel);
    let count_bots = guild.channels.get(count_bots_channel);
    if(count_all)
        count_all.edit({ name: `Pracowników: ${guild.memberCount}` });
    if(count_bots)
        count_bots.edit({ name: 'w tym botów: ' + checkBots(guild) });
    }
    });

bot.on('guildMemberRemove', member => {
    let guild = bot.guilds.get(server_id);
    if(guild) {
        let channel = guild.channels.get(migrations_channel);
        if(channel)
            channel.send(member.displayName + " został wyrzucony z korporacji.");

    let count_all = guild.channels.get(count_channel);
    let count_bots = guild.channels.get(count_bots_channel);
    if(count_all)
        count_all.edit({ name: `Pracowników: ${guild.memberCount}` });
    if(count_bots)
        count_bots.edit({ name: 'w tym botów: ' + checkBots(guild) });
    }
});

bot.on('message', async message => {
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

        if(cmd === '/sayt') {
            if (message.channel.id === cmd_channel) {
            if(message.member.hasPermission("MANAGE_MESSAGES")) {
                let botmessage = args.join(" ");
                message.delete().catch();
                var channel = bot.channels.get(spam_channel);
                channel.send(botmessage);   
            }
            return;
        }
    }

    if (msg.content === 'lodziara') {
    msg.reply('Lilly_Shane zgłoś się @Helios#2994');
    }
});

bot.login(process.env.B0T_T0KEN);