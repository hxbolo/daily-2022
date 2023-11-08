import { createRenderer } from '../runtime-core'
function createElement(type) {
  return document.createElement(type)
}

// 设置属性
function patchProp(el, key, prevVal, nextVal) {
  const isOn = (key: string) => /^on[A-Z]/.test(key)
  if (isOn(key)) {
    const event = key.slice(2).toLocaleLowerCase()
    el.addEventListener(event, nextVal)
  } else {
    if (nextVal === undefined || nextVal === null) {
      el.removeAttribute(key)
    } else {
      el.setAttribute(key, nextVal)
    }
  }
}

// 插入元素
function insert(child, parent, anchor) {
  parent.insertBefore(child, anchor || null)
}
// 移除
function remove(child) {
  const parent = child.parentNode
  if (parent) {
    parent.removeChild(child)
  }
}

// 设置text
function setElementText(el, text) {
  el.textContent = text
}

const renderer: any = createRenderer({
  createElement,
  patchProp,
  insert,
  remove,
  setElementText,
})

export function createApp(...args) {
  return renderer.createApp(...args)
}

export * from '../runtime-core'
