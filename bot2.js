const mineflayer = require('mineflayer')

const bot = mineflayer.createBot({
  host: 'donutsmp.net', // minecraft server ip
  username: 'flow221108@gmail.com', // minecraft username
  // password: 'xxx', // minecraft password, comment out if you want to log into online-mode=false servers
  port: 25565,                // only set if you need a port that isn't 25565
  version: '1.18',            // only set if you need a specific version or snapshot (ie: "1.8.9" or "1.16.5"), otherwise it's set automatically
  auth: 'microsoft'              // only set if you need microsoft auth, then set this to 'microsoft'
})


bot.on('kicked', console.log)  //pour voir les erreur de kick
bot.on('error', console.log)
