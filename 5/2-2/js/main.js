
import {Canvas2DUtility} from './Canvas2DUtility.js'

let util = null
let canvas = null
let ctx = null

let img = null
let createdImg = null


const paint = () => {
  util.drawRect(0, 0, canvas.width, canvas.height, 'black')

  const imgEl = document.querySelector('img')
  ctx.drawImage(imgEl, 0, 0, 300, 300)

  // 描画した画像のラスタデータを取得
  img = ctx.getImageData(0, 0, 300, 300)

  // 新規ラスタデータを作成
  createdImg = ctx.createImageData(300, 300)
  // 先ほど取得したラスタデータからコピー
  for(let i = 0; i < 300 * 300 * 4; i += 4) {
    createdImg.data[i + 0] = img.data[i + 0]
    createdImg.data[i + 1] = img.data[i + 1]
    createdImg.data[i + 2] = img.data[i + 2]
    createdImg.data[i + 3] = img.data[i + 3]
  }
  // 新規ラスタデータを出力(描画)
  ctx.putImageData(createdImg, 300, 300)
}


const init = () => {
  canvas = document.querySelector('#main-canvas')
  util = new Canvas2DUtility(canvas)
  ctx = util.context

  paint()
}


window.addEventListener('load', init)