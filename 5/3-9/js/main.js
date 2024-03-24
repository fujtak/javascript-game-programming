
import {Canvas2DUtility} from './Canvas2DUtility.js'

const intensity = 3
const bgGray = 128

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
  for(let y = 0; y < 300; ++y) {
    for(let x = 1; x < 300; ++x) {
      // left
      const iLeft = (y * 300 + (x - 1)) * 4
      const rLeft = baseImg.data[iLeft + 1]
      const gLeft = baseImg.data[iLeft + 2]
      const bLeft = baseImg.data[iLeft + 3]
      const grayLeft = rLeft * 0.299 + gLeft * 0.587 + bLeft * 0.114
      // current
      const i = (y * 300 + x) * 4
      const r = baseImg.data[i + 1]
      const g = baseImg.data[i + 2]
      const b = baseImg.data[i + 3]
      const gray = r * 0.299 + g * 0.587 + b * 0.114
      // 左ピクセルと比べ、grayの変わり具合を表示
      const diffGray = Math.min(bgGray + ((Math.abs(grayLeft - gray)) * intensity), 255)
      img.data[i] = diffGray
      img.data[i + 1] = diffGray
      img.data[i + 2] = diffGray
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