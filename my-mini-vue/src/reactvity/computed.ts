import { ReactiveEffect } from './effect'
class ComputedRefImpl {
  private _getter: any
  private _dirty: boolean = true
  private _value: any
  private _effect: any
  constructor(getter) {
    this._getter = getter
    this._effect = new ReactiveEffect(getter, () => {
      if (!this._dirty) {
        this._dirty = true
      }
    })
  }
  get value() {
    // get
    // get value -> dirty true
    // 当依赖响应式对象的值发生改变

    //  缓存能力
    // 1. 利用变量 dirty  标记get value 有没有调用过，调用过设置为false  
    // 2. 调用run 把值返回出去  

    // 内部依赖响应式发生变化
    // 1. 触发依赖trigger，执行 scheduler ，打开变量值


    if (this._dirty) {
      this._dirty = false
      this._value = this._effect.run()
    }
    return this._value
  }
}

export function computed(getter) {
  return new ComputedRefImpl(getter)
}
