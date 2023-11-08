import { extend } from '../shared'
let activeEffect

// 是否收集依赖
let shouldTrack

// 用于依赖收集
export class ReactiveEffect {
  private _fn: any
  deps = []
  active = true //状态是否多次调用stop
  onStop?: () => void
  constructor(fn, public scheduler?) {
    this._fn = fn
  }
  run() {
    console.log('run');
    
    // 运行 run 的时候，可以控制 要不要执行后续收集依赖的一步
    // 目前来看的话，只要执行了 fn 那么就默认执行了收集依赖
    // 这里就需要控制了

    // 是不是收集依赖的变量
    activeEffect = this
    // 1. 会收集依赖
    // shouldTrack 来做区分
    if (!this.active) {
      return this._fn()
    }
    // 应该收集
    shouldTrack = true

    // 执行的时候给全局的 activeEffect 赋值
    // 利用全局属性来获取当前的 effect
    activeEffect = this
    // 执行用户传入的 fn
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
       // 如果第一次执行 stop 后 active 就 false 了
      // 这是为了防止重复的调用，执行 stop 逻辑
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

  // 1. 先基于 target 找到对应的 dep
  // 如果是第一次的话，那么就需要初始化

  // target -> key -> dep
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    // 没有值， 初始化  初始化 depsMap 的逻辑
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
  // 1. 先收集所有的 dep 放到 deps 里面，
  // 后面会统一处理
  let depsMap = targetMap.get(target)
  let dep = depsMap.get(key)
  triggerEffect(dep)
}

export function triggerEffect(dep) {
   // 执行收集到的所有的 effect 的 run 方法
  for (const effect of dep) {
    if (effect.scheduler) {
      // scheduler 可以让用户自己选择调用的时机
      // 这样就可以灵活的控制调用了
      // 在 runtime-core 中，就是使用了 scheduler 实现了在 next ticker 中调用的逻辑
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
