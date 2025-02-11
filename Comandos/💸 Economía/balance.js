const {asegurar_todo} = require(`${process.cwd()}/handlers/funciones.js`);
const ecoSchema = require(`${process.cwd()}/modelos/economia.js`);
const Discord = require('discord.js');
module.exports = {
    name: "balance",
    aliases: ["dinero", "cartera", "bal", "wallet", "bank"],
    desc: "Sirve para ver la cartera de un Usuario",
    run: async (client, message, args, prefix) => {
        const user = message.guild.members.cache.get(args[0]) || message.mentions.members.first() || message.member;
        if(user.bot) return message.reply("❌ **Los bots no puede tener dinero!**");
        await asegurar_todo(null, user.id);
        let data = await ecoSchema.findOne({userID: user.id});
        message.reply({
            embeds: [new Discord.MessageEmbed()
            .setAuthor({name: `Cartera de ${user.user.tag}`, iconURL: user.displayAvatarURL({dynamic: true})})
            .setDescription(`💵 **Dinero:** \`${data.dinero} monedas\`\n🏦 **Banco:** \`${data.banco} monedas\``)
            .setColor(client.color)
            ]
        });
    }
}

/*
╔═════════════════════════════════════════════════════╗
║    || - || Desarollado por RaspuTV#1068 || - ||     ║
║    ----------| //discord.io/RaspuTV |----------     ║
╚═════════════════════════════════════════════════════╝
*/