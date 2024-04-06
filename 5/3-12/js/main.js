
import {Canvas2DUtility} from './Canvas2DUtility.js'

const degree = 45
const radian = Math.PI * degree / 180
const sin = Math.sin(radian)
const cos = Math.cos(radian)

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
      const cX = x - 150
      const cY = y - 150
      const rotatedX = Math.floor((cos * cX - sin * cY) + 150)
      const rotatedY = Math.floor((sin * cX + cos * cY) + 150)
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