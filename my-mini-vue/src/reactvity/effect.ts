import { extend } from '../shared'
let activeEffect

// 是否收集依赖
let shouldTrack

export class ReactiveEffect {
  private _fn: any
  deps = []
  active = true //状态是否多次调用stop
  onStop?: () => void
  constructor(fn, public scheduler?) {
    this._fn = fn
  }
  run() {
    activeEffect = this
    // 1. 会收集依赖
    // shouldTrack 来做区分
    if (!this.active) {
      return this._fn()
    }
    // 应该收集
    shouldTrack = true
    activeEffect = this
    const result = this._fn()
    // 重置
    shouldTrack = false

    return result
  }
  stop() {
    // 删除effect
    // 优化前
    // this.deps.forEach((dep: any) => {
    //   dep.delete(this)
    // })

    // 优化后
    // 是否多次调用stop
    if (this.active) {
      cleanupEffect(this)
      if (this.onStop) {
        this.onStop()
      }
      this.active = false
    }
  }
}
// 删除effect
function cleanupEffect(effect) {
  effect.deps.forEach((dep: any) => {
    dep.delete(effect)
  })

  // 把effect.deps 清空
  effect.deps.length = 0
}
// 收集依赖
const targetMap = new Map()
export function track(target, key) {
  if (!isTracking()) return

  // target -> key -> dep
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    // 没有值， 初始化
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }
  let dep = depsMap.get(key)

  if (!dep) {
    dep = new Set()
    depsMap.set(key, dep)
  }

  // 收集依赖
  trackEffects(dep)
}

export function trackEffects(dep) {
  // 有activeEffect 无需重复收集   看dep 之前有没有添加过， 有就不添加了
  if (dep.has(activeEffect)) return

  dep.add(activeEffect)
  activeEffect.deps.push(dep)
}

export function isTracking() {
  // if (!activeEffect) return
  // if (!shouldTrack) return
  return shouldTrack && activeEffect !== undefined
}

// 触发依赖 更新
export function trigger(target, key) {
  let depsMap = targetMap.get(target)
  let dep = depsMap.get(key)
  triggerEffect(dep)
}

export function triggerEffect(dep) {
  for (const effect of dep) {
    if (effect.scheduler) {
      effect.scheduler()
    } else {
      effect.run()
    }
  }
}

export function effect(fn, options: any = {}) {
  // fn
  const _effect = new ReactiveEffect(fn, options.scheduler)
  // _effect.onStop = options.onStop

  // options
  // Object.assign(_effect,options)

  // extend
  extend(_effect, options)

  _effect.run()
  const runner: any = _effect.run.bind(_effect)
  runner.effect = _effect
  return runner
}
export function stop(runner) {
  runner.effect.stop()
}
