const Discord = require('discord.js');
const bot = new Discord.Client();

const token = 'NjUwNTUwOTAyNjUwMDQ0NDI2.XeM_TQ.93Ez_hCJBeQVMKFUPquubLqNWyo';

const PREFIX = '>';

var version = '1.0.1';

var creator = 'DarkCresz#6110'

bot.on('ready', () => {
    console.log('CreszBot is online!');
})

bot.on('message', message => {

    if (message.author.bot) return;
    if (!message.content.startsWith(PREFIX)) return;

    let command = message.content.split(" ")[0];
    command = command.slice(PREFIX.length);

    let args = message.content.split(" ").slice(1);

    if (command === "say") {
        if (!message.member.hasPermission(r=>["MANAGE_MESSAGES"].includes(r.name)) ) 
            return message.reply("Sorry, you do not have the permission to do this!");
                message.channel.bulkDelete(1)
                message.channel.sendMessage(args.join(" ")).catch(console.error);
    }

    if (command === "help") {
        message.channel.sendMessage(">>List of commands: help , info , kick , ping , say")
    }

    if (command === "info") {
        message.channel.sendMessage("> CorrosionBot is a bot made entirely to moderate the Corrosion Studio                 This bot is still under semi-development\ Version 1.3.0\ Programmed by: DarkCresz")
    }

    if (command === "ping") {
        message.channel.sendMessage("Pong!").catch(console.error);
    } else

    if (command === "kick") {
        let modRole = message.guild.roles.find("name", "Mods");
        if (!message.member.hasPermission(r=>["MANAGE_MESSAGES"].includes(r.name)) ) {
            return message.reply("Sorry, you do not have the permission to do this!");
        }
        if (message.mentions.users.size === 0) {
            return message.reply("Please mention a user to kick").catch(console.error);
        }
        let kickMember = message.guild.member(message.mentions.users.first());
        if (!kickMember) {
            return message.reply("That user does not seem valid");
        }
        if (!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")) {
            return message.reply("I don't have the permissions (KICK_MEMBER) to do this.").catch(console.error);
        }
        kickMember.kick().then(member => {
            message.reply(`${member.user.username} was succesfully kicked.`).catch(console.error);
        }).catch(console.error)
    }

    if (command === "eval") {
        if (message.author.id !== "218433593741934592") return;
        try {
            var code = args.join(" ");
            var evaled = eval(code);

            if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled);

            message.channel.sendCode("xl", clean(evaled));
        } catch (err) {
            message.channel.sendMessage(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
    }
})

bot.login(token);