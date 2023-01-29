class Watcher {
  constructor(vm, key, cb) {
    this.vm = vm
    // data中的属性名称
    this.key = key
    // 当数据变化， 回调函数负责更新视图
    this.cb = cb

    // 把watcher对象记录到dep类的静态属性target
    Dep.target = this
    // // 触发一次 getter，让 dep 为当前 key 记录 watcher
    this.oldValue = vm[key]
    // 清空 targe
    Dep.target = null
  }
  // 当数据发生变化更新视图
  update() {
    let newValue =  this.vm[this.key]
    if (this.oldValue === newValue) return
    this.cb(newValue)
  }
}