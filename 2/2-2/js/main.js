import {Canvas2DUtility} from './Canvas2DUtility.js'
import {Snow} from './Snow.js'

window.util = null

let canvas = null
let ctx = null

let snowArray = []
let snowTimer = null

const addSnow = () => {
  const snow = new Snow(ctx)
  snowArray.push(snow)
  if(snowArray.length >= 100) {
    clearInterval(snowTimer)
  }
}

const update = () => {
  util.drawRect(0, 0, canvas.width, canvas.height, 'black')
  
  snowArray.map(snow => {
    snow.update()
  })
}

const init = () => {
  canvas = document.querySelector('#main-canvas')
  window.util = new Canvas2DUtility(canvas)
  ctx = util.context

  snowTimer = setInterval(addSnow, 200)

  setInterval(update, 10)
}

window.addEventListener('load', init)