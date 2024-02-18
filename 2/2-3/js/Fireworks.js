class Fireworks {
  constructor(ctx, util) {
    this.ctx = ctx
    this.util = util
    this.x = null
    this.y = null
    this.radius = null
    this.speedY = null
    this.color = null
    this.colorArray = ['#0000ff', "#ff00ff", "#ffff00"]
    this.explodeCount = null
    this.scale = null
    this._init()
  }
  _init() {
    this.x = Math.floor(Math.random() * this.ctx.canvas.width)
    this.y = this.ctx.canvas.height
    this.radius = Math.floor(Math.random() * 60) + 60
    this.speedX = Math.floor(Math.random() * 0.2) -0.2
    this.speedY = Math.floor(Math.random() * -5) - 5
    this.accelY = 0.1
    this.explodeCount = 0
    this.scale = 0
    this.color = this.colorArray[Math.floor(Math.random() * this.colorArray.length)]
  }
  _draw() {
    // 上昇中の処理
    if(this.speedY < 0) {
      this.util.drawCircle(this.x, this.y, 4, this.color)
    // 爆発中の処理
    } else {
      ++this.explodeCount
      for(let i = 0; i < 360; i += 45) {
        this.scale += 0.04 / this.explodeCount
        const x = Math.cos(i * Math.PI / 180) * this.radius * this.scale + this.x
        const y = Math.sin(i * Math.PI / 180) * this.radius * this.scale + this.y
        this.util.drawCircle(x, y, 4, this.color)
      }
    }
  }
  update() {
    if(this.y > this.ctx.canvas.height) {
      this._init()
    }
    this.speedX /= 1.01
    this.x += this.speedX
    this.speedY += this.accelY
    this.y += this.speedY
    this._draw()
  }
}

export {Fireworks}