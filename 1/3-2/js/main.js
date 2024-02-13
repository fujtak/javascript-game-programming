
let canvas = null
let ctx = null

let accelY = 5
let velocityY = 5

const posX = 20
let posY = 300

let isFlying = false

const paint = () => {
  ctx.fillStyle = 'green'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  
  
  ctx.fillStyle = 'white'
  ctx.fillRect(posX, posY, 20, 20)
}

const update = () => {
  velocityY += isFlying ? -accelY : accelY
  posY += velocityY
  paint()
}

const init = () => {
  canvas = document.querySelector('#main-canvas')
  ctx = canvas.getContext('2d')
  window.addEventListener('keydown', () => isFlying = true)
  window.addEventListener('keyup', () => isFlying = false)
  setInterval(update, 100)
}

window.addEventListener('load', init)