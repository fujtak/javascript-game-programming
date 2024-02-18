import {Canvas2DUtility} from './Canvas2DUtility.js'
import {Fireworks} from './Fireworks.js'

const colorArray = ['#00ff00', '#0000ff', '#ff00ff']

let util = null
let canvas = null
let ctx = null

let fireworksArray = []
let fireworksTimer = null

const addFireworks = () => {
  if(fireworksArray.length < 3) {
    fireworksArray.push(new Fireworks(ctx, util))
  } else {
    clearInterval(fireworksTimer)
  }
}

const update = () => {
  util.drawRect(0, 0, canvas.width, canvas.height, 'black')

  for(const fireworks of fireworksArray) {
    fireworks.update()
  }
}

const init = () => {
  canvas = document.querySelector('#main-canvas')
  util = new Canvas2DUtility(canvas)
  ctx = util.context

  fireworksTimer = setInterval(addFireworks, 1000)

  setInterval(update, 10)
}

window.addEventListener('load', init)