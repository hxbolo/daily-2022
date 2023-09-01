import { isObject } from './../shared/index';
import {
  mutableHandlers,
  readonlyHandlers,
  shallowReadonlyHandlers,
} from './baseHandles'

export const enum ReactiveFlages {
  IS_REACTIVE = '_v_isReactive',
  IS_READONLY = '_v_isReadonly',
}
export function reactive(raw) {
  return creatActiveObject(raw, mutableHandlers)
}

export function readonly(raw) {
  return creatActiveObject(raw, readonlyHandlers)
}
export function shallowReadonly(raw) {
  return creatActiveObject(raw, shallowReadonlyHandlers)
}

// 判断是否是 reactive
export function isReactive(value) {
  return !!value[ReactiveFlages.IS_REACTIVE]
}
// 判断是否是 readonly
export function isReadonly(value) {
  return !!value[ReactiveFlages.IS_READONLY]
}
// 判断是否是 isProxy
export function isProxy(value) {
  return isReactive(value) || isReadonly(value)
}

function creatActiveObject(target: any, baseHandles) {
  if(!isObject(target)){
    console.warn(`target ${target}必须是一个对象`);
    return target
  }
  return new Proxy(target, baseHandles)
}
