#  HTML&CSS
#  JS
  ## 数据类型
   - typeof: 判断类型 Number, String, Boolean, Uundefined， Object, Function, Symbol
   - instanceof  s instanceof String
   - Object.prototype.toString.call()： 能准确的判断出数据类型

   - 总结
    1. typeof 来判断基本数据类型是 ok 的，不过需要注意当用 typeof 来判断 null 类型时的问题，
      2. 如果想要判断一个对象的具体类型可以考虑用 instanceof，但是 instanceof 也可能判断不准确，比如一个数组，他可以被 instanceof 判断为 Object。
    3. 准确的判断对象实例的类型时，可以采取 Object.prototype.toString.call 方法。
  ## instanceof 实现原理
    - instanceof 来判断对象的具体类型，其实 instanceof 主要的作用就是判断一个实例是否属于某种类型
    - instanceof 也可以判断一个实例是否是其父类型或者祖先类型的实例。
    **instanceof 主要的实现原理就是只要右边变量的 prototype 在左边变量的原型链上即可**。因此，instanceof 在查找的过程中会遍历左边变量的原型链，直到找到右边变量的 prototype，如果查找失败，则会返回 false，告诉我们左边变量并非是右边变量的实例。

    ```js
      function newInstanceOf (left, right){
        let rightProto = right.prototype
        left =  left.__proto__
        while(true){
          if(left === null){
            return false
          }
          if(left === rightProto){
            return true
          }
          left = left.__proto__
        }
      }
      console.log( newInstanceOf([], Object));
    ```

  ## 原型原型链
    1. __proto__、 constructor属性是对象所独有的；
    2. prototype属性是函数独有的；
    3. 上面说过js中函数也是对象的一种，那么函数同样也有属性__proto__、 constructor；
    ```js
      function Person(name, age){ 
        this.name = name;
        this.age = age;
      }

      Person.prototype.motherland = 'China'

      let person01 = new Person('小明', 18)

      Person.prototype.constructor == Person // **准则1：原型对象（即Person.prototype）的constructor指向构造函数本身**
      person01.__proto__ == Person.prototype // **准则2：实例（即person01）的__proto__和原型对象指向同一个地方**

      console.log(Person.prototype.constructor == Person);
      console.log(person01.__proto__ == Person.prototype);
    ```
  ## 作用域作用域链
    ### 什么是作用域
        - 作用域是在运行时代码中的某些特定部分中变量，函数和对象的可访问性 (作用域最大的用处就是隔离变量，不同作用域下同名变量不会有冲突。)
      1. 全局作用域和函数作用域
        - 最外层函数 和在最外层函数外面定义的变量拥有全局作用域
        - 所有末定义直接赋值的变量自动声明为拥有全局作用域
        - 所有window对象的属性拥有全局作用域
        - 函数作用域,是指声明在函数内部的变量，和全局作用域相反，局部作用域一般只在固定的代码片段内可访问到，最常见的例如函数内部。
      2.  块级作用域 
        - 块级作用域可通过新增命令let和const声明，所声明的变量在指定块的作用域外无法被访问
        - 在一个函数内部
        - 在一个代码块（由一对花括号包裹）内部
        - 声明变量不会提升到代码块顶部
        - 禁止重复声明
    ### 什么是作用域链
      - 再一层一层向上寻找，直到找到全局作用域还是没找到，就宣布放弃。这种一层一层的关系，就是 作用域链 。
    ### 总结：执行上下文在运行时确定，随时可能改变；作用域在定义时就确定，并且不会改变。！
  ## 执行上下文
  ## 闭包
  ## call apply bind
  ## new
  ## 异步 js是单线程，为啥可以高并发(如何可以请求异步)
    1. 异步编程模型：JavaScript 通过使用回调函数、Promise、async/await 等机制实现了异步编程模型。这使得在执行耗时操作时，可以将任务交给其他线程或进程处理，JavaScript 主线程可以继续执行其他任务，从而提高并发性能。

    2. 非阻塞 I/O：JavaScript 在浏览器环境中运行时，可以利用浏览器提供的异步 API（如 Ajax 请求、定时器、事件处理等）来实现非阻塞 I/O 操作。这样，当一个异步操作进行时，JavaScript 主线程不会被阻塞，可以继续处理其他任务，从而提高并发性能。

    3. 事件驱动机制：JavaScript 基于事件驱动的机制，通过事件循环（Event Loop）来处理事件和回调函数。这种机制使得 JavaScript 能够高效地处理大量的并发事件，因为它在单线程中按照事件的发生顺序依次处理事件，而不需要创建多个线程。

    4. Web Workers：JavaScript 提供了 Web Workers API，它允许在后台创建多个工作线程，用于执行一些耗时的计算任务，从而释放主线程，提高并发性能。这样，JavaScript 可以在主线程和工作线程之间进行任务分配和协同工作。

    ### eventloop
      1. 事件队列（Event Queue）：事件队列是一个先进先出的队列，用于存储待处理的事件和回调函数。当事件发生时，相关的回调函数会被添加到事件队列中。

      2. 主线程（Main Thread）：JavaScript 运行时中的主线程负责执行同步的 JavaScript 代码和处理事件循环。它会不断地从事件队列中取出事件，执行相应的回调函数。

      3. 宏任务（Macro Task）：宏任务代表一个独立的、完整的任务单元。宏任务可以是用户交互、定时器回调、Ajax 请求等。每个宏任务会在事件循环的一轮中执行完毕后，才会执行下一个宏任务。

      4. 微任务（Micro Task）：微任务是宏任务的一部分，它代表一个更小的任务单元。微任务通常是由 Promise 的回调函数、MutationObserver 或 process.nextTick（在 Node.js 环境下）等创建的。微任务会在当前宏任务执行结束后立即执行。

      5. Event Loop 的执行过程：
        - 执行当前宏任务中的同步代码。
        - 检查微任务队列，如果存在微任务，则依次执行所有微任务，直到微任务队列为空。
        - 更新渲染（如果需要）。
        - 从事件队列中取出一个宏任务并执行。
        - 重复上述步骤，直到事件队列和微任务队列都为空。

      6. 宏任务与微任务的顺序：每次执行一个宏任务后，都会先执行完当前宏任务中的所有微任务，然后再执行下一个宏任务。


  ## 浏览器回收机制
  ## 实现发布订阅模式
  ## promise
    - promise 就是一个类， 在执行这个类的时候， 需要传递一个执行器进去 执行器会立即执行
    - promise 有三个不同的状态，  成功 失败 等待  一旦状态改变就无法修改
    - resolve 和reject 函数是用来改变状态
    - then 方法内部做的事情就判断状态， 如果状态是成功 调用成功的回调函数 如果状态是失败 调用失败回调函数 then方法是被定义在原型对象中的
    - 同一个promise对象下面的then方法是可以被调用多次的
    - then方法是可以被链式调用的, 后面then方法的回调函数拿到值的是上一个then方法的回调函数的返回值

    - promise.all  接收一个数组作为参数， 接收的参数的顺序，是返回结果值的顺序， 返回的是一个promise对象  在all 方法中如果方法都是成功了，返回就是成功的值， 如果有一个失败的值， 那他就是失败的返回  
  ### 浏览器输入url 
    1. DNS域名解析
    2. 建立TCP连接
      - 建立3次握手
    3. 发送HTTP请求，服务器处理请求，返回响应结果
      - 如果头部有缓存相关信息 ，会验证缓存是否有效若有效则返回状态码为304，若无效则重新返回资源，状态码为200.
    4. 关闭TCP连接 
      - 四次分手
    5. 浏览器渲染
      - 将html 转换成DOM树
      - 将css 转换成cssom树
      - 将dom树和cssom 树 合并渲染
      - 节点开始布局，计算大小和位置
      - 将每个节点渲染到页面中

      输入网址发生以下步骤：

      1. 通过 DNS 解析域名的实际 IP 地址
      2. 检查浏览器是否有缓存，命中则直接取本地磁盘的 html，如果没有命中强缓存，则会向服务器发起请求（先进行下一步的 TCP 连接）
      3. 若强缓存和协商缓存都没有命中，则返回请求结果
      4. 然后与 WEB 服务器通过三次握手建立 TCP 连接。期间会判断一下，若协议是 https 则会做加密，如果不是，则会跳过这一步
      5. 加密完成之后，浏览器发送请求获取页面 html，服务器响应 html，这里的服务器可能是 server、也可能是 cdn
      6. 接下来是浏览器解析 HTML，开始渲染页面


      顺便说了渲染页面的过程：

      1. 浏览器会将 HTML 解析成一个 DOM 树，DOM 树的构建过程是一个深度遍历过程：当前节点的所有子节点都构建好后才会去构建当前节点的下一个兄弟节点。
      将 CSS 解析成 CSS Rule Tree（css 规则树）。
      2. 解析完成后，浏览器引擎会根据 DOM 树和 CSS 规则树来构造 Render Tree。（注意：Render Tree 渲染树并不等同于 DOM 树，因为一些像 Header 或 display:none 的东西就没必要放在渲染树中了。）
      3. 有了 Render Tree，浏览器已经能知道网页中有哪些节点、各个节点的 CSS 定义以及他们的从属关系。下一步进行 layout，进入布局处理阶段，即计算出每个节点在屏幕中的位置。
      4. 最后一个步骤就是绘制，即遍历 RenderTree，层绘制每个节点。根据计算好的信息绘制整个页面。

      渲染完成之后，开始执行其它任务：

      dom 操作
      ajax 发起的 http 网络请求等等……
      浏览器处理事件循环等异步逻辑等等……


  ## 浏览器渲染
    浏览器渲染原理及流程(https://blog.csdn.net/sjhcake/article/details/123856054)

    ### 渲染主要步骤
      1. 解析HTML生成DOM树 - 渲染引擎首先解析HTML文档，生成DOM树
      2. 构建Render树 - 接下来不管是内联式，外联式还是嵌入式引入的CSS样式会被解析生成CSSOM树，根据DOM树与CSSOM树生成另外一棵用于渲染的树-渲染树(Render tree)，
      3. 布局Render树 - 然后对渲染树的每个节点进行布局处理，确定其在屏幕上的显示位置
      4. 绘制Render树 - 最后遍历渲染树并用UI后端层将每一个节点绘制出来
# web存储
# HTTP
# VUE
# React
# webpack
# 模块化
  ## 模块化理解
  1. 什么是模块化
    - 将一个复杂的程序依据一定的规则(规范)封装成几个块(文件), 并进行组合在一起
    - 块的内部数据与实现是私有的, 只是向外部暴露一些接口(方法)与外部其它模块通信
  2.  模块化的好处
    - 避免命名冲突(减少命名空间污染)
    - 更好的分离, 按需加载
    - 更高复用性
    - 高可维护性
  ## 模块化规范
  1. CommonJS
    - 在服务器端，模块的加载是运行时同步加载的；在浏览器端，模块需要提前编译打包处理。
    ### 基本语法
      - 暴露模块：module.exports = value或exports.xxx = value
      - 引入模块：require(xxx),如果是第三方模块，xxx为模块名；如果是自定义模块，xxx为模块文件路径
      - CommonJS模块的加载机制是，输入的是被输出的值的拷贝。也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。
  2. AMD
    - AMD规范则是非同步加载模块，允许指定回调函数, ，如果是浏览器环境，要从服务器端加载模块，这时就必须采用非同步模式，因此浏览器端一般采用AMD规范。
    ### 基本语法
    #### 定义暴露模块:
    ```js
      //定义没有依赖的模块
      define(function(){
        return 模块
      })

      //定义有依赖的模块
      define(['module1', 'module2'], function(m1, m2){
        return 模块
      })

    ```
    #### 引入使用模块:
    ```js
      require(['module1', 'module2'], function(m1, m2){
        使用m1/m2
      })

    ```
  3. CMD
    - CMD规范专门用于浏览器端，模块的加载是异步的，模块使用时才会加载执行。CMD规范整合了CommonJS和AMD规范的特点。在 Sea.js 中，所有 JavaScript 模块都遵循 CMD模块定义规范。
    #### 定义暴露模块：
    ```JS
      //定义有依赖的模块
      define(function(require, exports, module){
        //引入依赖模块(同步)
        var module2 = require('./module2')
        //引入依赖模块(异步)
          require.async('./module3', function (m3) {
          })
        //暴露模块
        exports.xxx = value
      })

      //定义没有依赖的模块
      define(function(require, exports, module){
        exports.xxx = value
        module.exports = value
      })


    ```
    #### 引用模块
    ```js
      define(function (require) {
        var m1 = require('./module1')
        var m4 = require('./module4')
        m1.show()
        m4.show()
      })

    ```
  4. ES6模块化
    - ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量
    #### ES6模块化语法
     export命令用于规定模块的对外接口，import命令用于输入其他模块提供的功能。
      ```js
        /** 定义模块 math.js **/
        var basicNum = 0;
        var add = function (a, b) {
            return a + b;
        };
        export { basicNum, add };
        /** 引用模块 **/
        import { basicNum, add } from './math';
        function test(ele) {
            ele.textContent = add(99 + basicNum);
        }

      ```
  #### ES6 模块与 CommonJS 模块的差异
    ES Module从语法到原理详解[https://juejin.cn/post/7098192216229117959] 
    1. 区别
      - ES Module 输出的是值的引用，而 CommonJS 输出的是值的拷贝；
      - ES Module 是编译时执行，而 CommonJS 模块是在运行时加载；
      - ES6 Module可以导出多个值，而CommonJs 是单个值导出；
      ES6 Module 静态语法只能写在顶层，而CommonJs 是动态语法可以写在判断里；
      - ES6 Module的 this 是 undefined，而CommonJs 的 this 是当前模块；

      ```js
          // CommonJS模块
      let { stat, exists, readfile } = require('fs');

      // 等同于
      let _fs = require('fs');
      let stat = _fs.stat;
      let exists = _fs.exists;
      let readfile = _fs.readfile;

      > CommonJS模块代码的实质是整体加载fs模块（即加载fs的所有方法），生成一个对象（_fs），然后再从这个对象上面读取 3 个方法。

      > 这种加载称为**“运行时加载”**，因为只有运行时才能得到这个对象，导致完全没办法在编译时做“静态优化”。
      ```

      ```js
      // ES6模块
      import { stat, exists, readFile } from 'fs';

      > ES6模块代码的实质是从fs模块加载 3 个方法，其他方法不加载。这种加载称为**“编译时加载”或者静态加载**，即 ES6 可以在编译时就完成模块加载，效率要比 CommonJS 模块的加载方式高。当然，这也导致了没法引用 ES6 模块本身，因为它不是对象。
      ```
# 性能
# uniapp & 小程序
# 常见手写
  ### 去重
    ```js
      let arr = [1, 3, 4, 4, 5, 6, 7, 4]
      // new Set
      let newarr = Array.from(new Set(arr))

      // filter
      let a = arr.filter((item, index, array) =>{
        return array.indexOf(item) === index
      })

      // reduce 方法
      let c = arr.reduce((acc, cur) => {
        if(!acc.includes(cur)){
          return [...acc, cur]
        }
        return acc
      }, [])
    ```
# 排序
  排序: [https://github.com/hustcc/JS-Sorting-Algorithm](https://github.com/hustcc/JS-Sorting-Algorithm)
  在线阅读地址：[https://sort.hust.cc/](https://sort.hust.cc/)
  ### 1.冒泡排序
    ```js
      function bubble(arr){
        for(let i = 0; i< arr.length-1; i++){
          for(let j = 0; j< arr.length-1-i; j++){
            if(arr[j] > arr[j+1]){   // 相邻两两比较
              let temp = arr[j+ 1]   // 元素交换
              arr[j+1] = arr[j]
              arr[j] = temp
            }
          }
        }
        return arr
      }
    ```

  ### 2.快速排序
  ```js
    function quicksort4(arr) {
      if (arr.length <= 1) return arr
      // 找基准下标
      let provideIndex = Math.floor(arr.length / 2)
      // 找基准下的值
      let provide = arr.splice(provideIndex, 1)[0]
      let left = []
      let right = []
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] < provide) {
          left.push(arr[i])
        } else {
          right.push(arr[i])
        }
      }
      return quicksort4(left).concat([provide], quicksort4(right))
    }
  ```
  ### 3.选择排序
  ```js

    function select2(arr) {
      let minIndex,temp
      for(let i = 0; i< arr.length; i++){
        minIndex = i
        for(let j = i+1; j<arr.length; j++ ){
          if(arr[j] < arr[minIndex]){ // 比对最小值
            minIndex = j              // 将最小数的索引保存
          }
        }
        temp = arr[i]
        arr[i] = arr[minIndex]
        arr[minIndex] = temp
      }
      return arr
    }
  ```

  ### 4.插入排序
    - 它的工作原理是通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。
    - 算法步骤
      1. 将第一待排序序列第一个元素看做一个有序序列，把第二个元素到最后一个元素当成是未排序序列。
      2. 从头到尾依次扫描未排序序列，将扫描到的每个元素插入有序序列的适当位置。（如果待插入的元素与有序序列中的某个元素相等，则将待插入元素插入到相等元素的后面。）
  ```js
    function insertionSort2(arr){
      let preIndex, current
      for(let i= 1; i< arr.length; i++){
        preIndex = i-1; 
        current = arr[i]
        // 前面一个值 > 当前的值
        while(preIndex >= 0 && arr[preIndex] > current){
          arr[preIndex + 1] = arr[preIndex]
          preIndex--
        }
        arr[preIndex+ 1] = current
      }
      return arr
    }
  ```