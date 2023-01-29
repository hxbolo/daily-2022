class Vue {
  constructor(options) {
    // 1. 通过属性保存选项的数据
    this.$options = options || {}
    this.$data =  options.data || {}
    this.$el = typeof options.el ==='string' ? document.querySelector(options.el) : el
    // 2. 把data中的成员转换成个getter和sertter,注入到vue 的实例中
    this._propxyData(this.$data)
    // 3. 调用observer对象监听数据的变化
    new Observer(this.$data)
    // 4. 调用complier对象，解析指令和差值表达式
    new Compiler(this)

  }
  _propxyData(data) {
    Object.keys(data).forEach(key => {
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get() {
          return data[key]
        },
        set(newVal) {
          if (newVal == data[key]) return
          data[key] = newVal
          
        }
      })
    })
  }
}