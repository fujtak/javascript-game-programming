class Snow {
  constructor(ctx) {
    this.ctx = ctx
    this.x = null
    this.startX = null
    this.y = null
    this.width = null
    this.height = null
    this.theta = null
    this.amplitude = null
    this.drift = null
    this.speedY = null
    this._init()
  }

  _init() {
    this.startX = Math.floor(Math.random() * 600)
    this.x = this.startX
    this.y = -5
    this.width = Math.floor(Math.random() * 3) + 2
    this.height = this.width
    this.theta = Math.floor(Math.random() * 100)
    this.amplitude = Math.floor(Math.random() * 10) + 3
    this.drift = Math.random()
    this.speedY = Math.floor(Math.random() * 5) + 1
  }

  _draw() {
    window.util.drawRect(this.x, this.y, this.width, this.height, 'white')
  }

  update() {
    this.ctx.globalAlpha = 0.6
    this.theta += 0.03
    this.x = Math.sin(this.theta) * this.amplitude + this.startX
    this.x += this.drift
    this.y += this.speedY
    if(this.y > 600) {
      this.y = -5
    }
    this._draw()
  }

}

export {Snow}