import {Canvas2DUtility} from './Canvas2DUtility.js'

let util = null
let canvas = null
let ctx = null

const unit = 30

let x0 = 0
let y0 = 0
let x1 = 0
let y1 = 0
let count = 0

const onClick = e => {
  ++count
  if(count % 2 === 0) {
    x1 = Math.round((e.offsetX - 300) / unit) * unit
    y1 = Math.round((e.offsetY - 300) / unit) * unit
  } else {
    x0 = Math.round((e.offsetX - 300) / unit) * unit
    y0 = Math.round((e.offsetY - 300) / unit) * unit
    x1 = 0
    y1 = 0
  }
}

const paint = () => {
  ctx.save()
  ctx.translate(300, 300)
  
  // 点
  for(let i = -300; i < 300; i += unit) {
    for(let j = -300; j < 300; j += unit) {
      util.drawCircle(i, j, 1, 'white')
    }
  }
  // 座標
  util.drawLine(-300, 0, 300, 0, 'white', 3)
  util.drawLine(0, -300, 0, 300, 'white', 3)
  // 2つのベクトル
  util.drawLine(0, 0, x0, y0, 'blue', 3)
  // 2つのベクトルの和
  if(count % 2 === 0) {
    util.drawLine(0, 0, x1, y1, 'green', 3)
    util.drawLine(0, 0, x0 + x1, y0 + y1, 'yellow', 3)
  }

  ctx.restore()
}

const update = () => {
  util.drawRect(0, 0, canvas.width, canvas.height, 'black')
  paint()
}

const init = () => {
  canvas = document.querySelector('#main-canvas')
  util = new Canvas2DUtility(canvas)
  ctx = util.context

  canvas.addEventListener('click', onClick)
  setInterval(update, 10)
}

window.addEventListener('load', init)