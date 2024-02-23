import {Canvas2DUtility} from './Canvas2DUtility.js'

let util = null
let canvas = null
let ctx = null

const unit = 30

let x1 = 0
let y1 = 0
let x2 = 0
let y2 = 0
let count = 0

let dot = null
let v1Size = null
let v2Size = null
let cosTheta = null
let theta = null
let degree = null


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

  // 2つのベクトル
  util.drawLine(0, 0, x1, y1, 'blue', 3)
  util.drawLine(0, 0, x2, y2, 'green', 3)

  ctx.restore()
}


const update = () => {
  paint()
}


const onClick = e => {
  ++count
  if(count % 2 === 0) {
    x2 = Math.round((e.offsetX - 300) / unit) * unit
    y2 = Math.round((e.offsetY - 300) / unit) * unit
  } else {
    x1 = Math.round((e.offsetX - 300) / unit) * unit
    y1 = Math.round((e.offsetY - 300) / unit) * unit
    x2 = 0
    y2 = 0
  }

  // v1
  document.getElementById('v1').textContent = `(${x1}, ${y1})`
  // v2
  if(x2 && y2) {
    document.getElementById('v2').textContent = `(${x2}, ${y2})`
  } else {
    document.getElementById('v2').textContent = ''
  }
  // v1とv2の内積
  dot = x1*x2 + y1*y2
  if(dot) {
    document.getElementById('dot').textContent = dot
  } else {
    document.getElementById('dot').textContent = ''
  }
  // |v1|
  v1Size = Math.sqrt(x1*x1 + y1*y1)
  if(v1Size) {
    document.getElementById('v1Size').textContent = v1Size
  } else {
    document.getElementById('v1Size').textContent = ''
  }
  // |v2|
  v2Size = Math.sqrt(x2*x2 + y2*y2)
  if(v2Size) {
    document.getElementById('v2Size').textContent = v2Size
  } else {
    document.getElementById('v2Size').textContent = ''
  }
  // cosθ
  cosTheta = dot / (v1Size * v2Size)
  if(cosTheta) {
    document.getElementById('cosTheta').textContent = cosTheta
  } else {
    document.getElementById('cosTheta').textContent = ''
  }
  // θ
  theta = Math.acos(cosTheta)
  if(theta) {
    document.getElementById('theta').textContent = theta
  } else {
    document.getElementById('theta').textContent = ''
  }
  // θ(度数法)
  degree = theta / Math.PI * 180
  if(degree) {
    document.getElementById('degree').textContent = degree
  } else {
    document.getElementById('degree').textContent = '' 
  }

  update()
}


const init = () => {
  canvas = document.querySelector('#main-canvas')
  util = new Canvas2DUtility(canvas)
  ctx = util.context

  canvas.addEventListener('click', onClick)
  setInterval(update, 10)
}


window.addEventListener('load', init)