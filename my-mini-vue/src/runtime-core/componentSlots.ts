import { ShapeFlags } from '../shared/ShapeFlags'

export function initSlots(instance, children) {
  const { vnode } = instance
  if (vnode.shapeFlag & ShapeFlags.SLOTS_CHILDREN) {
    normalizeObjectSlots(children, instance.slots)
  }
}

const normalizeSlotValue = (value) => {
  // 把 function 返回的值转换成 array ，这样 slot 就可以支持多个元素了
  return Array.isArray(value) ? value : [value]
}

const normalizeObjectSlots = (children, slots) => {
  for (let key in children) {
    let value = children[key]
    slots[key] = (props) => normalizeSlotValue(value(props))
  }
}
