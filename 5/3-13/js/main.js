
import {Canvas2DUtility} from './Canvas2DUtility.js'

// const radian = 360 * Math.PI / 180
// const maxDistance = Math.sqrt(300 * 300 + 300 * 300)
// const scale = radian / maxDistance
const scale = 0.02

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
  // 回転
  for(let y = 0; y < 300; ++y) {
    for(let x = 0; x < 300; ++x) {
      const cx = x - 150
      const cy = y - 150
      // 中心からの距離と関係づけてうずまきにする
      const distance = Math.sqrt(cx * cx + cy * cy) * scale
      const c = Math.cos(distance)
      const s = Math.sin(distance)
      const rotatedX = Math.floor((c * cx - s * cy) + 150)
      const rotatedY = Math.floor((s * cx + c * cy) + 150)
      if(
        0 <= rotatedX && rotatedX <= 300
        && 0 <= rotatedY && rotatedY <= 300
      ){
        const i = (y * 300 + x) * 4
        const rotatedI = (rotatedY * 300 + rotatedX) * 4
        img.data[rotatedI + 0] = srcImg.data[i + 0]
        img.data[rotatedI + 1] = srcImg.data[i + 1]
        img.data[rotatedI + 2] = srcImg.data[i + 2]
        img.data[rotatedI + 3] = 0xff
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