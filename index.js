const Discord = require('discord.js');
const request = require('request');
const bot = new Discord.Client();

const server_id = '469152950669934593';
const spam_channel = '469153165967884299';
const info_channel = '469153199819849743';
const cmd_channel = '473938199153213461';
const prefix = '/';

  bot.on('ready', async () => {
    console.log(`Logged in as ${bot.user.tag}!`);
    bot.user.setActivity('wpisz: /help', { type: 'PLAYING' });
});

  bot.on('guildMemberAdd', member => {
      var role = member.guild.roles.find('name', 'Brak panelu');
    member.addRole(role).catch(console.error);
    let guild = bot.guilds.get(server_id);
    if(guild) {
        let channel = guild.channels.get(info_channel);
        if(channel)
channel.send(`Nowy kierowca, ${member}.`);
member.send(`Siema ${member}. Przed rozpoczęciem rozgrywki jako taksówkarz zapoznaj się z kanałem **#faq**. Zawarłem tam najważniejsze informacje dotyczące firmy. Jeśli chcesz to dla własnej wygody możesz zainstalować modyfikacje z kanału **#nasze_modyfikacje**. Do zobaczenia w grze!`);
}
});
bot.on('guildMemberRemove', member => {
    let guild = bot.guilds.get(server_id);
    if(guild) {
        let channel = guild.channels.get(info_channel);
        if(channel)
            channel.send(member.displayName + " został wyproszony z serwera.");
}
});

bot.on('message', async message => {
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if(cmd === '/say') {
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
if(cmd === '/info') {
    if (message.channel.id === cmd_channel) {
    if(message.member.hasPermission("MANAGE_MESSAGES")) {
        let botmessage = args.join(" ");
        message.delete().catch();
        var channel = bot.channels.get(info_channel);
        channel.send(botmessage);
        
    }
    return;
}
}

if(cmd === '/panel') {
    request('http://cabs.5v.pl/bot/', function (error, res, body) {
        var obj = JSON.parse(body);
        var send = obj.list.slice(1).map(e=>'\n' + e.name) + '.';
        var count = obj.list.slice(1).length;
        message.delete().catch();
        message.channel.send('**Lista osób pod panelem w grze (' + count + '):**' + send);
    });
    return;
}

if(cmd === '/admins') {
    request('http://cabs.5v.pl/bot/admins.php', function (error, res, body) {
        var obj = JSON.parse(body);
        var send = obj.admins.map(e=>'\n**' + e.name + '** na ' + e.rank) + '.';
        var count = obj.admins.length;
        message.delete().catch();
        message.channel.send('Administracja online (' + count + '):' + send);
    });
    return;
}

if(cmd === '/help') {
            let botmessage = args.join(" ");
            message.delete().catch();
            message.channel.send('```Komendy ogólnodostępne:\n/panel\n/admins```'); 
        return;
        }

    if(cmd === '/cmds') {
        if (message.channel.id === cmd_channel) {
            if(message.member.hasPermission("MANAGE_MESSAGES")) {
                let botmessage = args.join(" ");
                message.delete().catch();
                message.channel.send('```/say [treść]\n/info [treść]```'); 
            }
            return;
        }
            }
  });

bot.login("process.env.BOT_TOKEN");