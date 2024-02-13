let canvas = null
let util = null
let ctx = null

let time = null

const paintWave = (degree, amplitude, color) => {
  let boatY = null
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.moveTo(0, 600)
  for(let i = 0; i < 600; ++i) {
    const y = Math.sin((i + degree) * Math.PI / 180) * amplitude + 300
    ctx.lineTo(i, y)
    if(i === 300) {
      boatY = y
    }
  }
  ctx.lineTo(600, 600)
  ctx.closePath()
  ctx.fill()
  return boatY
}

const paint = () => {
  ctx.fillStyle = 'white'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.globalAlpha = 0.2

  // 波を描画
  const y1 = paintWave(time, 40, '#0000ff')
  const y2 = paintWave(time * 2.5, 30, '#0022cc')
  const y3 = paintWave(time * 3, 20, '#2200dd')
  const boatY = Math.min(y1, Math.min(y2, y3))

  // ボートを描画
  util.drawRect(300-50, boatY-20, 50, 20, 'green')
}

const update = () => {
  ++time
  paint()
}

const init = () => {
  canvas = document.querySelector('#main-canvas')
  util = new Canvas2DUtility(canvas)
  ctx = util.context
  setInterval(update, 10)
}

window.addEventListener('load', init)