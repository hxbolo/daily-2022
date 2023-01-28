### Hash模式
- url中# 后面的内容作为路径的地址
- 监听hashchange事件 
- 根据当前路由地址找到对应组件重新渲染
### history 模式
- 通过history。pushState()方法改变地址
- 监听popstate 事件
- 根据当前路由地址找到对应组件重新渲染


