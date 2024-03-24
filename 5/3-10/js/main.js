
import {Canvas2DUtility} from './Canvas2DUtility.js'

const power = 2

let util = null
let canvas = null
let ctx = null

let baseImg = null
let img = null


const processImg = loaded => {
  // 画像を描画
  ctx.drawImage(loaded, 0, 0, 300, 300)
  // 描画した画像のラスタデータを取得
  baseImg = ctx.getImageData(0, 0, 300, 300)
  
  // 新規ラスタデータを作成
  img = ctx.createImageData(300, 300)
  // ぼかす
  for(let y = 0; y < 300; ++y) {
    for(let x = 0; x < 300; ++x) {
      const i = (y * 300 + x) * 4
      // 周辺のピクセルの平均値を代入
      let rTotal = null
      let gTotal = null
      let bTotal = null
      let countD = 0
      for(let dy = -power + y; dy < power + y; ++dy) {
        for(let dx = -power + x; dx < power + x; ++dx) {
          const di = (dy * 300 + dx) * 4
          rTotal += baseImg.data[di]
          gTotal += baseImg.data[di + 1]
          bTotal += baseImg.data[di + 2]
          ++countD
        }
      }
      const r = rTotal / countD
      const g = gTotal / countD
      const b = bTotal / countD
      img.data[i] = r
      img.data[i + 1] = g
      img.data[i + 2] = b
      img.data[i + 3] = 0xff
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