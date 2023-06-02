#  HTML&CSS
#  JS
  ## 数据类型
  ## 原型原型链
  ## 作用域作用域链
  ## 执行上下文
  ## 闭包
  ## call apply bind
  ## new
  ## 异步
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
  ## 浏览器渲染
  
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