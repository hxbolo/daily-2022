import { extend, isObject } from '../shared'
import { track, trigger } from './effect'
import { reactive, ReactiveFlages, readonly } from './reactive'

// 优化： 只会在初始化调用一次
const get = creatGetter()
const set = creatSetter()
const readonlyGet = creatGetter(true)

const shallowReadonlyGet = creatGetter(true, true)

// 收集依赖
function creatGetter(isReadonly = false, shallow = false) {
  return function get(target, key) {
    if (key === ReactiveFlages.IS_REACTIVE) {
      return !isReadonly
    } else if (key === ReactiveFlages.IS_READONLY) {
      return isReadonly
    }

    const res = Reflect.get(target, key)
    // shallowReadonly ：创建一个浅层只读代理对象
    if (shallow) {
      return res
    }

    // 嵌套reactive
    // 判断res   是不是  object
    if (isObject(res)) {
      return isReadonly ? readonly(res) : reactive(res)
    }

    // 依赖收集
    if (!isReadonly) {
      track(target, key)
    }
    return res
  }
}
// 触发依赖
function creatSetter() {
  return function set(target, key, value) {
    const res = Reflect.set(target, key, value)
    // 触发依赖
    trigger(target, key)
    return res
  }
}

export const mutableHandlers = {
  get,
  set,
}

export const readonlyHandlers = {
  get: readonlyGet,
  set(target, key, value) {
    console.warn(`key:${key} set 失败， 因为 target是 readonly`, target)
    return true
  },
}

export const shallowReadonlyHandlers = extend({}, readonlyHandlers, {
  get: shallowReadonlyGet,
  set(target, key, value) {
    console.warn(`key:${key} set 失败， 因为 target是 readonly`, target)
    return true
  },
})
