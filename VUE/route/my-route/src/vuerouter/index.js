let _Vue =  null
export default class VueRouter {
  
  static install(Vue) {
    // 1.判断当前插件是否被安装
    if (VueRouter.install.installed) {
      return
    }
    VueRouter.install.installed = true
    // 2.vue 构造函数记录到全局变量中 
    _Vue = vue
    // 3.创建Vue实例时候传入router对象注入到Vue实例上
    // 混入
    _Vue.mixin({
      beforeCreate() {
        if (this.$options.routre) {
          _Vue.prototype.$router = this.$options.routre
        }
      },
    })
  }

  constructor(options) {
    // 记录构造函数中传入的options
    this.options = options
    // 键存储的是地址，值对应的组件
    this.routerMap = {}
    // 响应式对象
    this.data = _Vue.observable({
      current:'/', // 存储当前路由地址
    })
  }

  createRouterMap() {
    // 遍历所有的路由规则， 把路由规则解析成键值对的形式存储在routreMap中
    this.options.routres.forEach(router => {
      this.routerMap[router.path] =  router.component
    })
  }
}