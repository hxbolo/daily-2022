### vue3 新特性

- 更好支持 TS - defineComponent
- tree-shaking
  1. 是打包体积更小
  2. api 使用上改变
- fragment - 支持多个节点（少了一层 div 包裹）
- teleport
  1. 传送门 （<teleport to="body"></teleport>）
  2. teleport 追加的概念
  3. 使用场景（模态框）
- custom renderer
- composition api

### compsition api

- 设计细节： 为了不引人全新的概念， 采用独立的函数来创建和监听响应式的状态
- api

  1. setup
  2. 响应式系统 api

  - ref() : 单个值 ref(10)
  - reactive({}): 引用类型对象 reactive（{age:10,name:'hx'}）
  - readonly({}): 只读不能修改, 使用场景： 依赖注入， 子组件 ， province/inject
  - watch
    必须是一个响应式对象或者返回一个响应式对象函数
    1. 观察 ref
    ```js
    watch(count,
    (nevVal, oldVal) =>{
      console.log(nevVal, oldVal)
    },
    {
      immediate: true， // 立即执行
      deep: true
    })
    ```
    2. 观察 obj
    ```js
    watch(
      () => usrs.age,
      (nevVal, oldVal) => {
        console.log(nevVal, oldVal)
      }
    )
    watch(
      <!-- 监听user对象 的newVal , oldVal， 需要先clone -->
      () => _.cloneDeep(监听user对象，),
      (nevVal, oldVal) => {
        console.log(nevVal, oldVal)
      }
    )
    ```
  - watchEffect
    立即执行
    调用 stop 就会停止观察

    ```js
    const stop = watchEffect(( onInvalidate) =>{
      onInvalidate(() =>{
        <!-- 触发时机 -->
        1. 重新触发watch的时候
        2. 组件销毁的时候
        console.log('重置')
      })
      <!-- 触发get  -> 收集依赖 -->
      console.log(count.value, age.value)
    })

    <!-- 调用stop  就会停止观察  -->
    const stopWatch = () =>{
      stop&&stop()
    }


    ```

    #### watch 和 watchEffect 区别

    1. watch 可以明确知道观察的是谁
    2. watch 可以获取到之前的值
    3. watchEffect 可以同时监听多个
    4. watchEffect 立即执行 ， watch 需要再第三个参数中添加 ， immediate: true， // 立即执行

  - compluted :

    ```js
    const double = compulted(() => {
      return count * 2
    })
    ```

  3. 生命周期钩子

  4. 依赖注入
  5. refs

  

 
