
import {Canvas2DUtility} from './Canvas2DUtility.js'

const size = 10

let util = null
let canvas = null
let ctx = null

let srcImg = null
let img = null


const processImg = loaded => {
  // 画像を描画
  ctx.drawImage(loaded, 0, 0, 300, 300)
  // 描画した画像のラスタデータを取得
  srcImg = ctx.getImageData(0, 0, 300, 300)
  
  // 新規ラスタデータを作成
  img = ctx.createImageData(300, 300)
  // モザイク
  for(let y = 0; y < 300; y += 10) {
    for(let x = 0; x < 300; x += 10) {
      const i = (y * 300 + x) * 4
      let rTotal = null
      let gTotal = null
      let bTotal = null
      let countD = 0
      // 平均をとるループ
      for(let y1 = y; y1 < y + size; ++y1) {
        for(let x1 = x; x1 < x + size; ++x1) {
          const i1 = (y1 * 300 + x1) * 4
          rTotal += srcImg.data[i1]
          gTotal += srcImg.data[i1 + 1]
          bTotal += srcImg.data[i1 + 2]
          ++countD
        }
      }
      const r = rTotal / countD
      const g = gTotal / countD
      const b = bTotal / countD
      // 平均で塗るループ
      for(let y2 = y; y2 < y + size; ++y2) {
        for(let x2 = x; x2 < x + size; ++x2) {
          const i2 = (y2 * 300 + x2) * 4
          img.data[i2] = r
          img.data[i2 + 1] = g
          img.data[i2 + 2] = b
          img.data[i2 + 3] = 0xff
        }
      }
    }
  }
  
  // 新規ラスタデータを出力(描画)
  ctx.putImageData(img, 300, 300)
}


const paint = () => {
  util.drawRect(0, 0, canvas.width, canvas.height, 'black')

  util.imageLoader('img/dummy.jpg', processImg)
}


const init = () => {
  canvas = document.querySelector('#main-canvas')
  util = new Canvas2DUtility(canvas)
  ctx = util.context

  paint()
}


window.addEventListener('load', init)