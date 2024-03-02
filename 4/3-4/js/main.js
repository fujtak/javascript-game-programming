
import {Canvas2DUtility} from './Canvas2DUtility.js'

let util = null
let canvas = null
let ctx = null

let inputEl = null

const unit = 30

// 初期の三角形の頂点
const pts1 = [
  {x: 1 * unit, y: -1 * unit},
  {x: 4 * unit, y: -2 * unit},
  {x: 2 * unit, y: -5 * unit},
]

// 回転した三角形の頂点
let pts2 = []


const paint = () => {
  util.drawRect(0, 0, canvas.width, canvas.height, 'black')
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

  // 初期の三角形を描画
  util.drawPolygon(pts1, 'green')

  // 回転後の三角形の頂点を算出
  pts2 = []
  const deg = inputEl.value
  const rad = deg * Math.PI / 180
  for(const pt of pts1) {
    const newX = pt.x * Math.cos(rad) - pt.y * Math.sin(rad)
    const newY = pt.x * Math.sin(rad) + pt.y * Math.cos(rad)
    const newPt = {x: newX, y: newY}
    pts2.push(newPt)
  }
  // 回転後の三角形を描画
  util.drawPolygon(pts2, 'blue')

  ctx.restore()
}


const init = () => {
  canvas = document.querySelector('#main-canvas')
  util = new Canvas2DUtility(canvas)
  ctx = util.context

  inputEl = document.getElementById('theta')
  inputEl.addEventListener('input', paint)

  paint()
}


window.addEventListener('load', init)