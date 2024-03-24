
import {Canvas2DUtility} from './Canvas2DUtility.js'

let util = null
let canvas = null
let ctx = null

const waveCount = 4
const waveHeight = 10

let baseImg = null
let img = null


const processImg = loaded => {
  // 画像を描画
  ctx.drawImage(loaded, 0, 0, 300, 300)
  // 描画した画像のラスタデータを取得
  baseImg = ctx.getImageData(0, 0, 300, 300)
  
  // 新規ラスタデータを作成
  img = ctx.createImageData(300, 300)
  for(let x = 0; x < 300; ++x) {
    // x : xにおけるラジアン = 300(最大のx) : 2π * waveCount(最大のxにおけるラジアン)
    // xにおけるラジアン = x * 2π * waveCount / 300
    const rad = x * 2 * Math.PI * waveCount / 300
    const s = Math.sin(rad)
    const offsetY = Math.floor(s * waveHeight)
    for(let y = 0; y < 300; ++y) {
      const baseY = offsetY + y
      if(0 <= baseY && baseY < 300) {
        const index = (y * 300 + x) * 4
        const baseIndex = (baseY * 300 + x) * 4
        img.data[index + 0] = baseImg.data[baseIndex + 0]
        img.data[index + 1] = baseImg.data[baseIndex + 1]
        img.data[index + 2] = baseImg.data[baseIndex + 2]
        img.data[index + 3] = baseImg.data[baseIndex + 3]
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