### 准备工作
- 数据驱动
- 响应式的核心原理
- 发布订阅模式和观察者模式

### 数据驱动
  - 数据响应式 ： 数据模型仅仅是普通的js对象，当我们修改数据时，视图会更新避免了dom操作， 提高效率
  - 双向绑定： 
    - 数据改变， 视图改变， 视图改变 数据要也改变
    - 通过v-modal 进行双向绑定
  - 数据驱动： Vue的特性
    - 开发过程仅需要关注数据本身， 不需要关系数据如何渲染视图


### vue 响应式原理

#### vue 2.x
- Object.definedproperty
```js
  // 模拟vue中大data选项
    let data= {
      msg:'hx'
    }

    // 模拟vue 实例
    let vm = {}
    // 数据劫持： 当访问或者设置vm z中的成员做干预操作
    Object.defineProperty(vm,'msg',{
      enumerable:true,
      configurable:true,
      get(){
        console.log('get', data.msg);
        return data.msg
      },
      set(newVal){
        if(newVal == data.msg){
          return
        }
        console.log('set',newVal,);
        data.msg = newVal
        document.querySelector('#app').textContent = data.msg
      }

    })

    vm.msg = 'aaaa'
    console.log(vm.msg);
```
 - 一个对象中多成员
 ```js
  // 模拟vue中大data选项
    let data= {
      msg:'hx',
      count: 10
    }

    // 模拟vue 实例
    let vm = {}
    //  通过object.key 遍历
    Object.keys(data).forEach(key =>{
      Object.defineProperty(vm,key,{
        // 可枚举的
        enumerable:true,
        configurable:true,
        get(){
          console.log('get',key,data[key]);
          return data[key]
        },
        set(newVal){
          if(newVal == data[key]) return

          data[key] =  newVal
          console.log('set',key,data[key]);
          // 渲染到页面中
          document.querySelector('#app').textContent=data[key]
        }
      })
    })
    
    vm.msg = 'hx'
    vm.count=20
    console.log(vm.msg);
 ```

 #### vue3.x 
 - proxy
 - 直接监听对象 而非属性
 ```js
   let data= {
      msg:'hx',
      count: 10
    }

    // 模拟vue 实例
    let vm = new Proxy(data,{
      get(targe,key){
        console.log(targe,targe[key]);
        return targe[key]
      },
      set(targe,key,newVal){
        if(newVal == targe[key]) return
        targe[key] = newVal
        document.querySelector('#app').textContent = targe[key]
      }
      
    })
  
    vm.msg = 'hx'
    vm.count=20
    console.log(vm.msg);
 ```

 ### 发布订阅者模式 和 观察者模式
 #### 发布订阅模式
 - 订阅者
 - 发布者
 - 事件中心

 ```js
  // 事件触发器
  class EvnetRmitter{
    constructor (){
      this.subs = Object.create(null)
    }
    // 注册事件
    $on(evnetType, handler){
      this.subs[evnetType] =  this.subs[evnetType] || []
      this.subs[evnetType].push(handler)
    }
    // 触发事件
    $emit(evnetType){
      if(this.subs[evnetType]){
        this.subs[evnetType].forEach(handler => {handler()})
      }
      console.log(this.subs);
    }
  }

  let em =  new EvnetRmitter()

  em.$on('data',()=>{
    console.log(1111);
  })
  em.$on('data',()=>{
    console.log(222);
  })

  em.$emit('data')

 ```

 #### 观察者模式
 - 观察者 --watcher 
  - update()： 当时间发生是， 具体要做的事情
 - 目标（发布者） -- Dep
  - subs数据： 存储所有的观察者
  - addsub() 添加观察者 
 - 没有事件中心  

```js
  // 目标（发布者）
  class Dep{
    constructor(){
      // 存储所有的观察者
      this.subs = []
    }

    // 添加观察这
    addSub(sub){
      if(sub && sub.update){
        this.subs.push(sub)
      }
    }

    // 通知所有观察者
    notify(){
      this.subs.forEach(sub =>{
        sub.update()
      })
    }
  }

  class Watcher{
    update(){
      console.log('update');
    }
  }

  let dep =  new Dep()
  let watcher =  new Watcher()
  dep.addSub(watcher)
  dep.notify()

```
### 总结
- **观察者模式**是由具体目标调度，比如当事件触发，Dep 就会去调用观察者的方法，所以观察者模
式的订阅者与发布者之间是存在依赖的。
- **发布/订阅模**式由统一调度中心调用，因此发布者和订阅者不需要知道对方的存在。                                            