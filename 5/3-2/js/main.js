
import {Canvas2DUtility} from './Canvas2DUtility.js'

let util = null
let canvas = null
let ctx = null

let img = null
let createdImg = null


const processImg = loaded => {
  // 画像を描画
  ctx.drawImage(loaded, 0, 0, 300, 300)
  // 描画した画像のラスタデータを取得
  img = ctx.getImageData(0, 0, 300, 300)
  
  // 新規ラスタデータを作成
  createdImg = ctx.createImageData(300, 300)
  // 先ほど取得したラスタデータをグレースケール
  for(let i = 0; i < 300 * 300 * 4; i += 4) {
    const gray = img.data[i + 0] * 0.299 + img.data[i + 1] * 0.587 + img.data[i + 2] * 0.114
    createdImg.data[i + 0] = gray
    createdImg.data[i + 1] = gray
    createdImg.data[i + 2] = gray
    createdImg.data[i + 3] = 0xff;
  }
  // 新規ラスタデータを出力(描画)
  ctx.putImageData(createdImg, 300, 300)
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