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

const mineflayerViewer = require('prismarine-viewer').mineflayer

const { pathfinder, Movements } = require('mineflayer-pathfinder')
const { GoalBlock } = require('mineflayer-pathfinder').goals

bot.loadPlugin(pathfinder)

bot.once('spawn', () => {
  mineflayerViewer(bot, { port: 3000 })

  bot.on('path_update', (r) => {
    const nodesPerTick = (r.visitedNodes * 50 / r.time).toFixed(2)
    console.log(`I can get there in ${r.path.length} moves. Computation took ${r.time.toFixed(2)} ms (${nodesPerTick} nodes/tick). ${r.status}`)
    const path = [bot.entity.position.offset(0, 0.5, 0)]
    for (const node of r.path) {
      path.push({ x: node.x, y: node.y + 0.5, z: node.z })
    }
    bot.viewer.drawLine('path', path, 0xff00ff)
  })

  const mcData = require('minecraft-data')(bot.version)
  const defaultMove = new Movements(bot, mcData)

  bot.viewer.on('blockClicked', (block, face, button) => {
    if (button !== 2) return // only right click

    const p = block.position.offset(0, 1, 0)

    bot.pathfinder.setMovements(defaultMove)
    bot.pathfinder.setGoal(new GoalBlock(p.x, p.y, p.z))
  })
})