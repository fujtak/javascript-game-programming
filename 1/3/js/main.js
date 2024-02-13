
let accelY = 0.2

let canvas = null
let ctx = null

let velocityX = 0.4
let velocityY = -10


let posX = 0
let posY = 0

const paint = () => {
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = 'white'
  ctx.fillRect(posX, posY, 20, 20)
}

const update = () => {
  posX += velocityX
  velocityY += accelY
  posY += velocityY
  if(posY >= canvas.height + 20) {
    velocityY = -10
  }
  paint()
}

const init = () => {
  canvas = document.querySelector('#main-canvas')
  ctx = canvas.getContext('2d')
  posY = canvas.height
  setInterval(update, 10)
}

window.addEventListener('load', init)