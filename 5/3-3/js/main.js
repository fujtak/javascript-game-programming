
import {Canvas2DUtility} from './Canvas2DUtility.js'

let util = null
let canvas = null
let ctx = null

let img = null
let createdImg = null

let spanEl = null
let inputEl = null

let percent = null


const processImg = loaded => {
  // 画像を描画
  ctx.drawImage(loaded, 0, 0, 300, 300)
  // 描画した画像のラスタデータを取得
  img = ctx.getImageData(0, 0, 300, 300)
  
  // 新規ラスタデータを作成
  createdImg = ctx.createImageData(300, 300)
  // 先ほど取得したラスタデータを入力値によって明るさ調整
  for(let y = 0; y < 300; ++y) {
    for(let x = 0; x < 300; ++x) {
      const i = (y * 300 + x) * 4
      const r = Math.min(img.data[i + 0] * percent / 100, 255)
      const g = Math.min(img.data[i + 1] * percent / 100, 255)
      const b = Math.min(img.data[i + 2] * percent / 100, 255)
      createdImg.data[i + 0] = r
      createdImg.data[i + 1] = g
      createdImg.data[i + 2] = b
      createdImg.data[i + 3] = img.data[i + 3]
    }
  }
  // 新規ラスタデータを出力(描画)
  ctx.putImageData(createdImg, 300, 300)
}


const paint = () => {
  util.drawRect(0, 0, canvas.width, canvas.height, 'black')

  util.imageLoader('img/dummy.jpg', processImg)
}


const updateInput = () => {
  percent = inputEl.value
  spanEl.textContent = percent
}


const onInput = () => {
  updateInput()
  paint()
}


const init = () => {
  canvas = document.querySelector('#main-canvas')
  util = new Canvas2DUtility(canvas)
  ctx = util.context

  spanEl = document.querySelector('span')
  inputEl = document.querySelector('input')
  updateInput()

  inputEl.addEventListener('input', onInput)

  paint()
}


window.addEventListener('load', init)