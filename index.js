const Discord = require('discord.js');
const request = require('request');
const bot = new Discord.Client();

const server_id = '469152950669934593';
const spam_channel = '469153165967884299';
const info_channel = '469153199819849743';
const cmd_channel = '473938199153213461';
const count_channel = '526357805159022602';
const count_bots_channel = '526364100670914570';
const count_online_channel = '473938199153213461';
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
    bot.user.setActivity('wpisz: /help', { type: 'PLAYING' });

    bot.guilds.forEach((guild) => {
    let online = guild.channels.get(count_online_channel);
         setInterval (function () {
              count_online_channel.send("Message here") //send it to whatever channel the bot has permissions to send on
         }, 1000);
   })

});
  bot.on('guildMemberAdd', member => {
      var role = member.guild.roles.find('name', 'Brak panelu');
    member.addRole(role).catch(console.error);
    let guild = bot.guilds.get(server_id);
    if(guild) {
        let channel = guild.channels.get(info_channel);
        if(channel)
    channel.send(`Nowy taks�wkarz, ${member}.`);
    member.send(`Siema ${member}. Przed rozpocz�ciem rozgrywki jako taks�wkarz zapoznaj si� z kana�em **#faq**. Ustaw nickname (komenda /nick na dowolnym kanale) wed�ug wzoru **nick IC || nick OOC** oraz dodaj sw�j numer konta bankowego na kana� #konta_bankowe je�li chcesz w przysz�o�ci otrzymywa� premie. Dla w�asnej wygody mo�esz zainstalowa� modyfikacje z kana�u **#nasze_modyfikacje**. Do zobaczenia w grze!`);

    let count_all = guild.channels.get(count_channel);
    let count_bots = guild.channels.get(count_bots_channel);
    if(count_all)
        count_all.edit({ name: `Cz�onk�w: ${guild.memberCount}` });
    if(count_bots)
        count_bots.edit({ name: 'w tym bot�w: ' + checkBots(guild) });
    }
    });

bot.on('guildMemberRemove', member => {
    let guild = bot.guilds.get(server_id);
    if(guild) {
        let channel = guild.channels.get(info_channel);
        if(channel)
            channel.send(member.displayName + " zosta� wyrzucony z firmy.");

    let count_all = guild.channels.get(count_channel);
    let count_bots = guild.channels.get(count_bots_channel);
    if(count_all)
        count_all.edit({ name: `Cz�onk�w: ${guild.memberCount}` });
    if(count_bots)
        count_bots.edit({ name: 'w tym bot�w: ' + checkBots(guild) });
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
        message.channel.send('**Lista graczy w panelu (' + count + '):**' + send);
    });
    return;
}

if(cmd === '/help') {
            let botmessage = args.join(" ");
            message.delete().catch();
            message.channel.send('```Komendy og�lnodost�pne:\n/panel\n\nKomendy admina:\n/say [tre��]\n/info [tre��]```'); 
        return;
        }
  });

bot.login(process.env.B0T_T0KEN);