
let accelX = 1

let canvas = null
let ctx = null

let velocityX = 0

let posX = 0

const paint = () => {
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = 'white'
  ctx.fillRect(posX, 200, 20, 20)
}

const update = () => {
  velocityX += accelX
  posX += velocityX
  if(posX > canvas.width) {
    posX = 0
  }
  paint()
}

const init = () => {
  canvas = document.querySelector('#main-canvas')
  ctx = canvas.getContext('2d')
  setInterval(update, 100)
}

window.addEventListener('load', init)