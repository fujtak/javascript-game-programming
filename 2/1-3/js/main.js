let canvas = null
let util = null
let ctx = null

const paint = () => {
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.save()

  ctx.translate(100, 300)

  ctx.strokeStyle = 'white'
  // x座標を描画
  util.drawLine(-100, 0, 500, 0)
  // y座標を描画
  util.drawLine(0, -300, 0, 300)
  // 360度の線を描画
  util.drawLine(360, -300, 360, 300)

  // cosカーブを描画
  ctx.strokeStyle = 'green'
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.moveTo(0, -100)
  for(let i = 0; i < 500; ++i) {
    const rad = i * Math.PI / 180
    const c = Math.cos(rad)
    ctx.lineTo(i, c * -100)
  }
  ctx.stroke()

  // sinカーブを描画
  ctx.strokeStyle = 'blue'
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.moveTo(0, 0)
  for(let i = 0; i < 500; ++i) {
    const rad = i * Math.PI / 180
    const s = Math.sin(rad)
    ctx.lineTo(i, s * -100)
  }
  ctx.stroke()

  // 原点を復元
  ctx.restore()
}

const update = () => {
  paint()
}

const init = () => {
  canvas = document.querySelector('#main-canvas')
  util = new Canvas2DUtility(canvas)
  ctx = util.context
  update()
}

window.addEventListener('load', init)