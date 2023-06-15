// 负责数据的劫持
// 把data中的成员转换成getter /setter
class Observer {
  constructor(data) {
    this.walk(data)
  }
  // 1.判断数据是否是对象， 如果不是返回
  // 2. 如果是对象， 遍历所有对象， 设置为getter/setter
  walk(data) {
    if (!data || typeof data !== 'object') return
    // 遍历所有对象的成员
    Object.keys(data).forEach(key => {

      this.defineReactive(data,key,data[key])
    })
  }

  // 定义响应式成员
  defineReactive(obj, key, val) {
    const that = this
    // 收集依赖 并发送通知
    let dep = new Dep()
    // 如果val , 是对象， 把val内部的成员设置为响应式数据
    this.walk(val)
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        // 收集依赖
        Dep.target&& dep.addSub(Dep.target)
        return val
      },
      set(newVal) {
        if (newVal === val) return
        val = newVal
        // 给msg重新赋值之后调用walk ， 把他转换成getter 和 setter
        // 如果 newValue 是对象，设置 newValue 的成员为响应式
        that.walk(newVal)
        // 发送通知
        dep.notify()
      }
    })
  }
}                                                   