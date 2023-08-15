import { hasChanged, isObject } from '../shared'
import { isTracking, trackEffects, triggerEffect } from './effect'
import { reactive } from './reactive'

class RefImpl {
  private _value: any
  private _rawValue: any
  public dep
  public _v_isRef = true
  constructor(value) {
    // 存储未处理的value
    this._rawValue = value
    // value  =》 reactive
    // 1. 判断是否是对象， 是需要用reactive包裹
    this._value = convert(value)

    this.dep = new Set()
  }

  get value() {
    // 依赖收集
    trackRefValue(this)

    return this._value
  }
  set value(newVlue) {
    // 触发依赖
    // 一定先修改了value 的值

    // newVlue -> this._value 相同不出触发trigger

    // 对比的时候 是 object

    if (hasChanged(newVlue, this._rawValue)) {
      this._rawValue = newVlue
      this._value = convert(newVlue)
      triggerEffect(this.dep)
    }
  }
}

function convert(value) {
  return isObject(value) ? reactive(value) : value
}

function trackRefValue(ref) {
  if (isTracking()) {
    trackEffects(ref.dep)
  }
}

export function ref(value) {
  return new RefImpl(value)
}
export function isRef(ref) {
  return !!ref._v_isRef
}

export function unRef(ref) {
  // 是不是一个ref -> ref.value
  return isRef(ref) ? ref.value : ref
}

export function proxyRefs(objectWithRefs) {
  return new Proxy(objectWithRefs, {
    get(target, key) {
      // get -> age(ref) 返回 。value
      // not ref   -> value
      return unRef(Reflect.get(target, key))
    },

    set(target, key, value) {
      // set -> ref   .value
      if (isRef(target[key]) && !isRef(value)) {
        return (target[key].value = value)
      } else {
        return Reflect.set(target, key, value)
      }
    },
  })
}
