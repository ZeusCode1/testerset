const Discord = require("discord.js");
const db = require("orio.db")
const request = require("node-superfetch")
exports.run = async (client, msg, args) => {
  
let user = msg.mentions.users.first() || msg.author;

if(user.bot) {
msg.channel.send("**Discord Botlarının Seviyesi Olmaz!**")
}
  
var g = "95"
var Canvas = require('canvas')

var canvas = Canvas.createCanvas(750, 300)
var ctx = canvas.getContext('2d');
const avatarURL = user.displayAvatarURL({format: 'png'})
const { body } = await request.get(avatarURL);
const avatar = await Canvas.loadImage(body);
  
if(db.has(`${msg.guild.id}resim`)) {
const rs = await request.get(db.get(`${msg.guild.id}resim`));
const resim = await Canvas.loadImage(rs.body);
ctx.drawImage(resim, 0, 0, 750, 300);
    
var g = "55"
}
  
if (db.get(`${msg.guild.id}saydam`)) {
var g = db.get(`${msg.guild.id}saydam`)
}
  
ctx.fillStyle = "rgba(0, 0, 0, 0."+g+")";
ctx.fill()
ctx.fillRect(25, 20, 700, 260)  
ctx.fillStyle = "rgba(0, 0, 0, 0.30)";
ctx.fill()
ctx.fillRect(0, 0, 750, 300)
  
var re = db.get(`${msg.guild.id}renk`) || "FF0000"
  
var xp = db.get(`puancik_${user.id + msg.guild.id}`);
var lvl = db.get(`seviye_${user.id + msg.guild.id}`);  
  
let sira = ''
const sorted = [...msg.guild.members.cache.filter(mem => !mem.user.bot)
  .values()].sort((a, b) => { return db.get(`seviye_${b.user.id + msg.guild.id}`) - db.get(`seviye_${a.user.id + msg.guild.id}`) });
const top10 = sorted.splice(0, msg.guild.members.cache.size)
const mappedID = top10.map(s => s.user.id);
for(var i = 0; i < msg.guild.members.cache.size; i++) {
if(mappedID[i] === user.id) {
sira += `${i + 1}`
}}
  
var de = 1.6
ctx.beginPath()
ctx.fillStyle = "#999999";
ctx.arc(257 + 18.5, 147.5 + 18.5 + 36.25, 18.5, 1.5 * Math.PI, 0.5 * Math.PI, true);
ctx.fill();
ctx.fillRect(257 + 18.5, 147.5 + 36.15, 250 * de, 37.5);
ctx.arc(257 + 18.5 + 250 * de, 147.5 + 18.5 + 36.25, 18.75, 1.5 * Math.PI, 0.5 * Math.PI, false);
ctx.fill();
ctx.beginPath();
ctx.fillStyle = `#${re}`;
ctx.arc(257 + 18.5, 147.5 + 18.5 + 36.25, 18.5, 1.5 * Math.PI, 0.5 * Math.PI, true);
ctx.fill();
ctx.fillRect(257 + 18.5, 147.5 + 36.25, xp * de, 37.5);
ctx.arc(257 + 18.5 + xp * de, 147.5 + 18.5 + 36.25, 18.75, 1.5 * Math.PI, 0.5 * Math.PI, false);
ctx.fill();
ctx.fillStyle = `#${re}`;
ctx.font = '28px Impact';
ctx.textAlign = "right";
ctx.fillText(`Sıralama #${sira} | Seviye ${lvl || 0}`, 670, 70);
ctx.font = '20px Impact';
ctx.textAlign = "right";
ctx.fillText(`${xp || 0} / 250 XP`, 670, 100);
ctx.fillStyle = `#bfbfbf`;
ctx.font = '28px Impact';
ctx.textAlign = "left";
ctx.fillText(`${user.tag}`, 270, 150)
ctx.beginPath();
ctx.lineWidth = 8;
ctx.fill()
ctx.lineWidth = 8;
ctx.arc(55 + 80, 80 + 80, 80, 0, 2 * Math.PI, false);
ctx.clip();
ctx.drawImage(avatar, 55, 80, 160, 160);
    
msg.channel.send({files:[{attachment:canvas.toBuffer(),name:"seviye.png"}]})
  
}
exports.conf = {
    aliases: ["level","rankım"]
  };
  
  exports.help = {
    name: 'seviye-rank',
    description: 'Seviye bilgilerini gösterir.',
    usage: 'seviye-rank [@kullanıcı]',
    category: "seviye"
  };