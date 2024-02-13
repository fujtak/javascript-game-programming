
const velocityX = 5
const velocityY = 5

let canvas = null
let ctx = null

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
  posY += velocityY
  if(posX > canvas.width) {
    posX = 0
    posY = 0
  }
  if(posY > canvas.height) {
    posX = 0
    posY = 0
  }
  paint()
}

const init = () => {
  canvas = document.querySelector('#main-canvas')
  ctx = canvas.getContext('2d')
  setInterval(update, 100)
}

window.addEventListener('load', init)