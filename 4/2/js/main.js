
const mulEl = document.getElementById('mul')
const addEl = document.getElementById('add')

const operatorEl = document.getElementById('operator')

const aEl = document.getElementById('a')
const bEl = document.getElementById('b')
const cEl = document.getElementById('c')
const dEl = document.getElementById('d')
const eEl = document.getElementById('e')
const fEl = document.getElementById('f')
const gEl = document.getElementById('g')
const hEl = document.getElementById('h')
const iEl = document.getElementById('i')
const jEl = document.getElementById('j')
const kEl = document.getElementById('k')
const lEl = document.getElementById('l')

const mul = () => {
  operatorEl.textContent = 'x'
  iEl.value = aEl.value*eEl.value + bEl.value*gEl.value
  jEl.value = aEl.value*fEl.value + bEl.value*hEl.value
  kEl.value = cEl.value*eEl.value + dEl.value*gEl.value
  lEl.value = cEl.value*fEl.value + dEl.value*hEl.value
}

const add = () => {
  operatorEl.textContent = '+'
  iEl.value = aEl.value + eEl.value
  jEl.value = bEl.value + fEl.value
  kEl.value = cEl.value + gEl.value
  lEl.value = dEl.value + hEl.value
}

const setEvent = () => {
  mulEl.addEventListener('click', mul)
  addEl.addEventListener('click', add)
}

const init = () => {
  setEvent()
}

window.addEventListener('load', init)