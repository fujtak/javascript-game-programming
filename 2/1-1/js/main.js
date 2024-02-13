
const inputEl = document.querySelector('#input')
const textEl = document.querySelector('#text')

let canvas = null
let util = null
let ctx = null

const color = 'white'
const r = 300

let degree = 0

const onInput = e => {
  const val = Number(e.target.value)
  if(0 <= val <= 360) {
    degree = e.target.value
  }
}

const paint = () => {
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.save()

  ctx.strokeStyle = color
  ctx.translate(r, r)

  // 円を描画
  util.strokeCircle(0, 0, r, color)
  // xy座標を描画
  util.drawLine(-300, 0, 300, 0)
  util.drawLine(0, -300, 0, 300)

  // 度数法からラジアンへの変換
  const rad = degree * Math.PI / 180
  // 極座標系からxy座標系への変換
  const c = Math.cos(rad).toFixed(3)
  const s = Math.sin(rad).toFixed(3)
  const x = r * c
  const y = r * s
  // 半径を描画
  util.drawLine(0, 0, x, y, color, 3)
  // テキストを反映
  textEl.textContent = `cos: ${c}, sin: ${s}`

  // 原点を復元
  ctx.restore()
}

const update = () => {
  paint()
}

const init = () => {
  inputEl.addEventListener('input', onInput)

  canvas = document.querySelector('#main-canvas')
  util = new Canvas2DUtility(canvas)
  ctx = util.context
  setInterval(update, 100)
}

window.addEventListener('load', init)