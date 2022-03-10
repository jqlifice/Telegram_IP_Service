const { Telegraf } = require('telegraf');
require('dotenv').config();
const http = require('http');

const bot = new Telegraf(process.env.Token);
let myIP = undefined;

http.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, function(resp) {
    resp.on('data', function(ip) {
        myIP = ip;
    });
});

let checkForValidUsers = false;
let validUsers;
if(process.env.AllowedUsers){
    checkForValidUsers = true;
    validUsers = process.env.AllowedUsers.split(",");
    console.log(validUsers);
}



bot.start((ctx) =>{
   ctx.reply('Hello');
});
bot.command('ping', (ctx) => {
    if(checkForValidUsers && validUsers.indexOf(ctx.update.message.from.username) > -1){
        ctx.reply(`Bot currently operated from public IP-Adress ${myIP}`);
    }else {
        ctx.reply("pong");
    }
});

bot.launch();