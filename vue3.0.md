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
  - reactive({}): **引用类型对象** reactive（{age:10,name:'hx'}）
  - readonly({}): 只读不能修改, 使用场景： 依赖注入， 子组件 ， province/inject
  - computed : 计算属性， 调用需要 **aa.value**
    ```js
    const aa = computed(() => {
      return count.value * 2
    })
    ```
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

  ### 回调触发时机

  默认情况，**用户创建的侦听器回调，都会在 Vue 组件更新之前被调用**。这意味着你在侦听器回调中访问的 DOM 将是被 Vue 更新之前的状态

  Vue 更新之后的 DOM，你需要指明 flush: 'post' 选项

  ```js
  watch(source, callback, {
    flush: 'post',
  })

  watchEffect(callback, {
    flush: 'post',
  })
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

  - **provide**: provide() 接受两个参数：第一个参数是要注入的 key，可以是一个字符串或者一个 symbol，第二个参数是要注入的值。

  ```js
  // 提供静态值
  provide('foo', 'bar')

  // 提供响应式的值
  const count = ref(0)
  provide('count', count)
  ```

  - **inject**: 第一个参数是注入的 key, 第二个参数是可选的，即在没有匹配到 key 时使用的默认值。

  ```js
  // 注入不含默认值的静态值
  const foo = inject('foo')

  // 注入响应式的值
  const count = inject('count')

  // 通过 Symbol 类型的 key 注入
  const foo2 = inject(fooSymbol)

  // 注入一个值，若为空则使用提供的默认值
  const bar = inject('foo', 'default value')
  ```

  5. refs

# vue3 源码结构【编译+ 运行时】

**编译**

- compiler-sfc：
- compiler-dom： 与 compiler-core 配合使用， 把<templet>转换成 render 函数
- compiler-core：
  **运行时**
- runtime-dom
- runtiome-core(运行时)
- reactivity(响应式原理)：负责响应式原理， 如何收集依赖， 触发依赖

### reactive

核心： 通过 proxy 代理进行拦截，触发 get(依赖收集) , set（触发依赖）

### shallowReadonly

只有对象的顶层属性是只读的，嵌套对象的属性仍然是可写的。

1. 首先，shallowReadonly 调用 createReactiveObject 函数，传递了 false（表示非只读）和 true（表示浅只读）。

2. 在 createReactiveObject 函数内部，首先检查目标对象是否为普通对象（isObject 函数用于判断是否为对象）。如果目标对象不是普通对象，那么返回目标对象自身，因为只有普通对象才能被代理。

3. 然后，通过 Proxy 构造函数创建一个代理对象 observed。这个代理对象会拦截对目标对象的访问。

4. 最后，代理对象 observed 被标记为只读或浅只读。这部分代码根据需要具体实现。

```js
import { isObject } from '@vue/shared'
import { createReactiveObject } from './reactive'
// 首先，shallowReadonly 调用 createReactiveObject 函数，传递了 false（表示非只读）和 true（表示浅只读）
export const shallowReadonly = createReactiveObject(false, true)

function createReactiveObject(
  target,
  isReadonly,
  baseHandlers,
  collectionHandlers
) {
  // 1. 首先检查目标是否为对象，如果不是，返回目标自身
  if (!isObject(target)) {
    return target
  }

  // 2. 创建代理对象
  const observed = new Proxy(
    target,
    isReadonly ? readonlyHandlers : reactiveHandlers
  )

  // 3. 将代理对象标记为只读或响应式，具体实现会有差异
  // 省略具体标记逻辑，这部分用于标记代理对象是否为只读

  return observed
}
```

### ref

一个 key 对应一个 dep， 当 get 触发依赖收集， set 触发依赖

### ref 和 reactive 区别

ref 是一个单值，通过一个对象{}这个对象就是 RefImpl 类对象进行包裹，里面有 value , get ， set， 从而知道什么时候触发 get 和 set

从定义数据角度对比： 1. ref 用来定义：基本类型数据； 2. reactive 用来定义：对象（或数组）类型(引用类型)； 3. 备注：ref 也可以用来定义对象（或数组）类型数据, 它内部会自动通过 reactive 转为代理对象；
从原理角度对比： 1. ref 通过 Object.defineProperty() 的 get 与 set 来实现响应式（数据劫持）； 2. reactive 通过使用 Proxy 来实现响应式（数据劫持）, 并通过 Reflect 操作源对象内部的数据；
从使用角度对比： 1. ref 定义的数据：操作数据需要 .value，读取数据时模板中直接读取不需要 .value； 2. reactive 定义的数据：操作数据与读取数据：均不需要 .value；

### toRef

基于响应式对象上的一个属性，创建一个对应的 ref。这样创建的 ref 与其源属性保持同步：改变源属性的值将更新 ref 的值，反之亦然。

toRef 函数
- 可以用来为源响应式对象上的某个 property 新创建一个 ref。然后，ref 可以被传递，它会保持对其源 property 的响应式连接。

- toRef 接受两个参数：第一个参数为源对象，第二个参数为源对象中的属性名；
获取数据值的时候需要加 .value；

- 使用场景：有一个响应式对象数据，但是模版中只需要使用其中一项数据；

- 使用 toRef 转化后生成的 ref 数据，如果是引用类型数据时，那么它不是原始数据的拷贝，而是原始数据的引用，改变它的数据也会同时改变原始数据；

ref 是不会去更改原数据的，ref 本质是拷贝原数据，而 toRef 会修改原数据！！

```js
const p1 = reactive({ name: 'hh', age: 18 })

const p3 = toRef(p1, 'name')
const p4 = ref(p1.age)
console.log('p1, p2', p2, p3)
console.log('p1, p2', p4)

setTimeout(() => {
  p4.value++
  console.log('=p4', p4, p1)
  p2.value.age++
  console.log('=p4', p2, p1)
}, 0)
```

### toRefs


- toRefs 用于将响应式对象转换为普通对象，其中普通对象的每个属性都是指向原始对象相应属性的 ref，两者保持引用关系；

- toRefs 常用于 ES6 的解构赋值操作。但是，对一个响应式对象直接解构时，解构后的数据将不再有响应式，而使用 toRefs 可以方便解决这个问题；

- 获取数据值的时候需要加 .value；

- 使用 toRefs 转化后生成的 ref 数据如果是引用类型数据时，那么它不是原始数据的拷贝，而是原始数据的引用，改变它的数据也会同时改变原始数据；

- 其作用和 toRef 类似，只不过 toRef 是对一个个属性手动赋值，而 toRefs 是自动解构赋值；

- 使用场景：剥离响应式对象（解构|展开），想使用响应式对象中的多个或者所有属性做为响应式数据；


### ref、reactive 和 toRef、toRefs 的区别
- ref、reactive是在 setup() 声明组件内部状态用的， 这些变量通常都要 return 出去，除了供 < template > 或渲染函数渲染视图，也可以作为 props 或 emit 参数 在组件间传递。它们的值变更可触发页面渲染；

- toRef、toRefs 用于处理 组件/函数 传递的响应式数据，如：在接收父组件 props 时 / 或 composables 组合式函数返回数据时建立起某些属性的响应式引用；

- 通过 ref 包装的属性在 setup 函数内都需要通过 .value 去访问它值 ( template 模版内不用 )。因此，ref、toRef 创建的变量值都需要用变量 .value 读取。reactive 则不用，因为会自动解包分配给它的 ref。

- 至于 toRefs，如果是解构赋值，如： const { state1, state2 } = toRefs(props)，值需要这样获取：state1.value.count；若整体赋给一个变量，如：const state = toRefs(props)，则是 state.state1.value。

- 只有 toRefs 可以解构；

