import {Canvas2DUtility} from './Canvas2DUtility.js'

let util = null
let canvas = null
let ctx = null

let range = null
let displayScale = null

const unit = 30

let x = 0
let y = 0
let scale = 1

const onChange = e => {
  scale = e.target.value
  displayScale.textContent = scale
}

const onClick = e => {
  x = Math.round((e.offsetX - 300) / unit) * unit
  y = Math.round((e.offsetY - 300) / unit) * unit
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
  // ベクトルの積
  if(scale !== 1) {
    util.drawLine(0, 0, x * scale, y * scale, 'yellow', 3)
  }
  // ベクトル
  util.drawLine(0, 0, x, y, 'blue', 7)

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

  range = document.querySelector('#range')
  displayScale = document.querySelector('#displayScale')

  displayScale.textContent = scale
  range.addEventListener('change', onChange)
  canvas.addEventListener('click', onClick)
  setInterval(update, 10)
}

window.addEventListener('load', init)