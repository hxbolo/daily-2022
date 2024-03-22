# HTML&CSS

# JS

## 数据类型

- typeof: 判断类型 Number, String, Boolean, Uundefined， Object, Function, Symbol
- instanceof s instanceof String
- Object.prototype.toString.call()： 能准确的判断出数据类型

- 总结

  1. typeof 来判断基本数据类型是 ok 的，不过需要注意当用 typeof 来判断 null 类型时的问题，
  2. 如果想要判断一个对象的具体类型可以考虑用 instanceof，但是 instanceof 也可能判断不准确，比如一个数组，他可以被 instanceof 判断为 Object。
  3. 准确的判断对象实例的类型时，可以采取 Object.prototype.toString.call 方法。

  ## 隐式转换

  JavaScript 引擎会根据以下规则来进行类型转换：

  1. 如果期望转换为字符串，会尝试调用对象的 toString() 方法，并返回其结果。
  2. 如果期望转换为数字，会尝试调用对象的 valueOf() 方法，并返回其结果。
  3. 如果上述两个方法返回的结果都不是原始值，则抛出一个 TypeError 异常。

  4. 对于值类型数据(又叫基本类型)场景

     - toString 方法对于值类型数据使用而言，其效果相当于类型转换，**将原类型转为字符串**。
     - valueOf 方法对于值类型数据使用而言，其效果将相当于**返回原数据**。

     ```js
     console.log(typeof str.valueOf() + '_' + str.valueOf()) //string_hello

     console.log(typeof n.valueOf() + '_' + n.valueOf()) //string_123
     console.log(typeof bool.valueOf() + '_' + bool.valueOf()) //string_true

     console.log(str.valueOf === str) // // true
     console.log(n.valueOf === n) // // true
     console.log(bool.valueOf() === bool) // true
     ```

  5. 引用类型数据使用 toString 及 valueOf 方法

     ```js
     var obj = {}

     console.log(obj.toString()) //[object Object] 返回对象类型
     console.log(obj.valueOf()) //{} 返回对象本身
     ```

  - 总结

    1. 在进行字符串强转时候，优先调用 toString()方法。在进行数值运算的时候，优先调用 valueOf 方法。
    2. 再有运算符的情况下，valueOf 的优先级要高于 toString()方法。

  - Symbol.toPrimitive 一个可被自定义操作的对象属性，用于定义对象在被转换为原始值时的行为。
    Symbol.toPrimitive 被调用时,会接受一个字符串参数，表示当前运算的模式，一个有三种模式。

    - Number:该场合需要转成数值
    - String:该场合需要转成字符串
    - Default:该场合可以转成数值，也可以转成字符串

    ```js
    let user = {
      name: 'John',
      money: 1000,
      [Symbol.toPrimitive](hint) {
        // hint = "string"、"number" 和 "default" 中的一个
        return hint == 'string' ? `{name: "${this.name}"}` : this.money
      },
    }

    // 转换演示：
    console.log(user) // hint: string -> {name: "John"}
    console.log(+user, typeof +user) // hint: number -> 1000
    console.log(user + 500) // hint: default -> 1500
    console.log(user + '300', typeof (user + '300')) //hint: string -> 1000300
    ```

## instanceof 实现原理

- instanceof 来判断对象的具体类型，其实 instanceof 主要的作用就是判断一个实例是否属于某种类型
- instanceof 也可以判断一个实例是否是其父类型或者祖先类型的实例。
  **instanceof 主要的实现原理就是只要右边变量的 prototype 在左边变量的原型链上即可**。因此，instanceof 在查找的过程中会遍历左边变量的原型链，直到找到右边变量的 prototype，如果查找失败，则会返回 false，告诉我们左边变量并非是右边变量的实例。

  ```js
  function newInstanceOf(left, right) {
    let rightProto = right.prototype
    left = left.__proto__
    while (true) {
      if (left === null) {
        return false
      }
      if (left === rightProto) {
        return true
      }
      left = left.__proto__
    }
  }
  console.log(newInstanceOf([], Object))
  ```

## 原型原型链

1. **proto**、 constructor 属性是对象所独有的；
2. prototype 属性是函数独有的；
3. 上面说过 js 中函数也是对象的一种，那么函数同样也有属性**proto**、 constructor；

```js
function Person(name, age) {
  this.name = name
  this.age = age
}

Person.prototype.motherland = 'China'

let person01 = new Person('小明', 18)

Person.prototype.constructor == Person // **准则1：原型对象（即Person.prototype）的constructor指向构造函数本身**
person01.__proto__ == Person.prototype // **准则2：实例（即person01）的__proto__和原型对象指向同一个地方**

console.log(Person.prototype.constructor == Person)
console.log(person01.__proto__ == Person.prototype)
```

## 作用域作用域链

### 什么是作用域

- 作用域是在运行时代码中的某些特定部分中变量，函数和对象的可访问性 (作用域最大的用处就是隔离变量，不同作用域下同名变量不会有冲突。)

1. 全局作用域和函数作用域

   - 最外层函数 和在最外层函数外面定义的变量拥有全局作用域
   - 所有末定义直接赋值的变量自动声明为拥有全局作用域
   - 所有 window 对象的属性拥有全局作用域
   - 函数作用域,是指声明在函数内部的变量，和全局作用域相反，局部作用域一般只在固定的代码片段内可访问到，最常见的例如函数内部。

2. 块级作用域

   - 块级作用域可通过新增命令 let 和 const 声明，所声明的变量在指定块的作用域外无法被访问
   - 在一个函数内部
   - 在一个代码块（由一对花括号包裹）内部
   - 声明变量不会提升到代码块顶部
   - 禁止重复声明

### 什么是作用域链

    - 再一层一层向上寻找，直到找到全局作用域还是没找到，就宣布放弃。这种一层一层的关系，就是 作用域链 。

### 总结：执行上下文在运行时确定，随时可能改变；作用域在定义时就确定，并且不会改变。

## 执行上下文

1. 全局执行上下文： 这是默认的、最基础的执行上下文。不在任何函数中的代码都位于全局执行上下文中。它做了两件事：

   - 创建一个全局对象，在浏览器中这个全局对象就是 window 对象。
   - 将 this 指针指向这个全局对象。一个程序中只能存在一个全局执行上下文。

2. 函数执行上下文： 每次调用函数时，都会为该函数创建一个新的执行上下文。每个函数都拥有自己的执行上下文，但是只有在函数被调用的时候才会被创建。一个程序中可以存在任意数量的函数执行上下文。每当一个新的执行上下文被创建，它都会按照特定的顺序执行一系列步骤，具体过程将在本文后面讨论。
3. Eval 函数执行上下文： 运行在 eval 函数中的代码也获得了自己的执行上下文，但由于 Javascript 开发人员不常用 eval 函数，所以在这里不再讨论。

## 闭包

## call apply bind

## new

## 异步 js 是单线程，为啥可以高并发(如何可以请求异步)

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
- promise 有三个不同的状态， 成功 失败 等待 一旦状态改变就无法修改
- resolve 和 reject 函数是用来改变状态
- then 方法内部做的事情就判断状态， 如果状态是成功 调用成功的回调函数 如果状态是失败 调用失败回调函数 then 方法是被定义在原型对象中的
- 同一个 promise 对象下面的 then 方法是可以被调用多次的
- then 方法是可以被链式调用的, 后面 then 方法的回调函数拿到值的是上一个 then 方法的回调函数的返回值

- promise.all 接收一个数组作为参数， 接收的参数的顺序，是返回结果值的顺序， 返回的是一个 promise 对象 在 all 方法中如果方法都是成功了，返回就是成功的值， 如果有一个失败的值， 那他就是失败的返回

### 浏览器输入 url

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

      1. Dns 解析域名获取ip地址
      2. 检查是否有浏览器缓存，有直接获取， 没有想服务器发起tpc 链接
      3. 服务器和浏览器进行3次握手链接，
      4. 发送http请求，服务器处理请求， 返回响应
      5. 关闭链接进行4次分手，
      6. 解析html,页面开始渲染
          1. 解析html转换成dom树
          2. 解析css转换成cssdom树
          3. 合并dom树， cssdom树，生成渲染树
          4. 每个节点开始布局，计算位置大小，
          5. 把每个节点渲染到页面肿

## 浏览器渲染

    浏览器渲染原理及流程(https://blog.csdn.net/sjhcake/article/details/123856054)

    ### 渲染主要步骤
      1. 解析HTML生成DOM树 - 渲染引擎首先解析HTML文档，生成DOM树
      2. 构建Render树 - 接下来不管是内联式，外联式还是嵌入式引入的CSS样式会被解析生成CSSOM树，根据DOM树与CSSOM树生成另外一棵用于渲染的树-渲染树(Render tree)，
      3. 布局Render树 - 然后对渲染树的每个节点进行布局处理，确定其在屏幕上的显示位置
      4. 绘制Render树 - 最后遍历渲染树并用UI后端层将每一个节点绘制出来

# web 存储

- cookie

1. 4kb 左右， 主要用于保存登录信息
2. 生命周期： 一个会话周期， 可以设置他是时效
3. 每次都会携带在 HTTP 头中，如果使用 cookie 保存过多数据会带来性能问题

- localStorage
  1. 一般为 5M
  2. 永久存储， 除非被清除
  3. 仅在客户端（即浏览器）中保存，不参与和服务器的通信
- sessionStorage
  1. 一般为 5M
  2. 当前会话有效， 关闭浏览器后被清除
  3. 仅在客户端（即浏览器）中保存，不参与和服务器的通信

# HTTP

### http 1.0 、1.1、 2.0 发展史

1. 连接复用性:

   - HTTP/1.0: 每个请求和响应都需要建立一个新的 TCP 连接，导致性能较低。
   - HTTP/1.1: 引入了持久连接（Keep-Alive），允许在单个 TCP 连接上传输多个请求和响应，提高了性能。（资源加载是**串行**）
   - HTTP/2.0: 支持多路复用（Multiplexing），允许在单个 TCP 连接上同时传输多个请求和响应，减少了延迟。(多工：资源加载**并行** )

2. 请求和响应的处理方式:

   - HTTP/1.0: 请求和响应之间是按序处理的，即一个请求的响应必须完全接收后才能发送下一个请求。
   - HTTP/1.1 和 HTTP/2.0: 支持管道化（Pipelining），允许在一个 TCP 连接上同时发送多个请求和响应。

3. 二进制传输:

   - HTTP/1.0 和 HTTP/1.1: 使用文本格式传输数据。
   - HTTP/2.0: 引入了二进制传输，将 HTTP 消息分解为二进制帧进行传输，提高了传输效率。

4. 头部压缩:

   - HTTP/1.0 和 HTTP/1.1: 每个请求和响应的 Header 信息都需要重复传输，增加了数据传输量。
   - HTTP/2.0: 引入了头部压缩技术，可以减少 Header 信息的传输大小。

5. 服务器推送:

   - HTTP/1.0 和 HTTP/1.1: 服务器无法主动向客户端推送数据。
   - HTTP/2.0: 支持服务器推送（Server Push），服务器可以主动将响应的资源推送给客户端，减少客户端的请求次数。

总体而言，HTTP/1.0、HTTP/1.1 和 HTTP/2.0 在性能、传输效率和功能特性上有不同程度的改进和优化。HTTP/2.0 相对于 HTTP/1.x 版本具有更高的性能和效率，能够更好地满足现代 Web 应用的需求。

    1. 连接复用性
      - 1.0 每个请求和响应都需要建立一个新的tcp链接，
      - 1.1 引入长链接，允许单个tcp链接上传输有多个请求和响应
      - 2.0 支持多路复用， 允许单个tcp 链接上同时传输多个请求和响应

    2. 请求和响应
      - 1.0 请求和响应按顺序处理
      - 1.1 、2.0 支持管道化， 允许在一个tcp链接上同时发送多个请求和响应

    3. 二进制传输
      - 1.0 、1.1 使用文本格式传输
      - 2.0 引入二进制传输， 将http消息分解成二进制帧进行传输

    4. 头部压缩
      - 1.0 、 1.1 每个请求响应header信息重复传输
      - 2.0 头部压缩，减少header 信息传输大小

    5.  服务器推送:
      - 1.0/1.1 服务器无法主动向客户端推送数据
      - 2.0 支持服务端推送


    - 1.0
      1. 增加了HEAD、POST等新方法
      2. 增加了响应状态码，标记可能的错误原因
      3. 引入了协议版本号概念
      4. 引入了HTTP header的概念，让HTTP处理请求和响应更加灵活
      5. 传输的数据不再局限于文本
    - 1.1
      1. 长连接：引入了 TCP 连接复用，即一个 TCP 默认不关闭，可以被多个请求复用
      2. 并发连接：对一个域名的请求允许分配多个长连接（缓解了长连接中的「队头阻塞」问题）
      3. 引入管道机制（pipelining），一个 TCP 连接，可以同时发送多个请求。（响应的顺序必须和请求的顺序一致，因此不常用）
      4. 增加了 PUT、DELETE、OPTIONS、PATCH 等新的方法
      5. 新增了一些缓存的字段（If-Modified-Since, If-None-Match）
      6. 请求头中引入了 range 字段，支持断点续传
      7. 允许响应数据分块（chunked），利于传输大文件
      8. 强制要求 Host 头，让互联网主机托管称为可能
    - 2.0
      1. 二进制协议： HTTP/1.1版本的头部信息是文本，数据部分可以是文本也可以是二进制。HTTP/2版本的头部和数据部分都是二进制，且统称为‘帧’
      2. 多路复用： 废弃了 HTTP/1.1 中的管道，同一个TCP连接里面，客户端和服务器可以同时发送多个请求和多个响应，并且不用按照顺序来。由于服务器不用按顺序来处理响应，所以避免了“对头堵塞”的问题。
      3. 头部信息压缩： 使用专用算法压缩头部，减少数据传输量，主要是通过服务端和客户端同时维护一张头部信息表，所有的头部信息在表里面都会有对应的记录，并且会有一个索引号，这样后面只需要发送索引号即可
      4. 服务端主动推送： 允许服务器主动向客户推送数据
      5. 数据流： 由于HTTP/2版本的数据包不是按照顺序发送的，同一个TCP连接里面相连的两个数据包可能是属于不同的响应，因此，必须要有一种方法来区分每一个数据包属于哪个响应。HTTP/2版本中，每个请求或者响应的所有数据包，称为一个数据流（stream）

### http 缓存

- 强缓存 ：当缓存数据库中已有所请求的数据时。客户端直接从缓存数据库中获取数据。当缓存数据库中没有所请求的数据时，客户端的才会从服务端获取数据。

  1. Expires

  - Expires 的值为服务端返回的数据到期时间。当再次请求时的请求时间小于返回的此时间，则直接使用缓存数据。

  2. Cache-Control。

  - private：客户端可以缓存
  - public：客户端和代理服务器都可以缓存
  - max-age=t：缓存内容将在 t 秒后失效
  - no-cache：需要使用协商缓存来验证缓存数据
  - no-store：所有内容都不会缓存。

  ```js
  // 使用 XMLHttpRequest 设置请求头
  var xhr = new XMLHttpRequest()
  xhr.open('GET', '/api/resource')
  xhr.setRequestHeader('Cache-Control', 'max-age=3600')
  xhr.send()

  // 使用 fetch API 设置请求头
  fetch('/api/resource', {
    headers: {
      'Cache-Control': 'max-age=3600',
    },
  })

  // 使用 fetch API 设置请求头
  fetch('https://example.com/api/resource', {
    method: 'GET',
    headers: {
      'If-Modified-Since': 'Sat, 01 Jan 2022 00:00:00 GMT',
      'If-None-Match': '123456789',
    },
  })
    .then(function (response) {
      if (response.status === 200) {
        // 请求成功，处理响应
        return response.text()
      } else if (response.status === 304) {
        // 资源未发生变化，使用缓存数据
      } else {
        // 请求失败，处理错误
        throw new Error(response.status)
      }
    })
    .then(function (data) {
      console.log(data)
    })
    .catch(function (error) {
      console.error(error)
    })
  ```

- 协商缓存： 客户端会先从缓存数据库中获取到一个缓存数据的标识，得到标识后请求服务端验证是否失效（新鲜），如果没有失效服务端会返回 304，此时客户端直接从缓存中获取所请求的数据，如果标识失效，服务端会返回更新后的数据

  - Last-Modified： 服务器在响应请求时，会告诉浏览器资源的最后修改时间
  - Etag： 服务器响应请求时，通过此字段告诉浏览器当前资源在服务器生成的唯一标
    - If-None-Match： 再次请求服务器时，浏览器的请求报文头部会包含此字段，后面的值为在缓存中获取的标识。服务器接收到次报文后发现 If-None-Match 则与被请求资源的唯一标识进行对比。

  ```js
  // 使用 XMLHttpRequest：

  // 设置 If-Modified-Since 字段
  xhr.setRequestHeader('If-Modified-Since', 'Sat, 01 Jan 2022 00:00:00 GMT')

  // 设置 If-None-Match 字段
  xhr.setRequestHeader('If-None-Match', '123456789')
  ```

- 优点

  1. 减少了冗余的数据传递，节省宽带流量
  2. 减少了服务器的负担，大大提高了网站性能
  3. 加快了客户端加载网页的速度 这也正是 HTTP 缓存属于客户端缓存的原因。

- 强制缓存的优先级高于协商缓存

# VUE

### vue-router 原理

1. hash 模式 http://localhost:8080/index.html#/book?bookid=1

   - 改变描点
     可以通过 location.hash = "/hashpath"的方式修改浏览器的 hash 值。
   - 监听描点变化
     可以通过监听 hashchange 事件监听 hash 值的变化。
     ```js
     window.addEventListener('hashchange', () => {
       const hash = window.location.hash.substr(1)
       // 根据hash值渲染不同的dom
     })
     ```

2. history 模式

   - 改变 url
     H5 的 history 对象提供了 pushState 和 replaceState 两个方法，当调用这两个方法的时候，url 会发生变化，浏览器访问历史也会发生变化，但是浏览器不会向后台发送请求。
     ```js
     // 第一个参数：data对象，在监听变化的事件中能够获取到
     // 第二个参数：title标题
     // 第三个参数：跳转地址
     history.pushState({}, '', '/a')
     ```
   - 监听 url 变化
     可以通过监听 popstate 事件监听 history 变化，也就是点击浏览器的前进或者后退功能时触发。
     ```js
     window.addEventListener('popstate', () => {
       const path = window.location.pathname
       // 根据path不同可渲染不同的dom
     })
     ```

总结：

1. hash 模式下：

   - 通过 location.hash 修改 hash 值，触发更新。
   - 通过监听 hashchange 事件监听浏览器前进或者后退，触发更新。

2. history 模式下：

   - 通过 history.pushState 修改浏览器地址，触发更新。
   - 通过监听 popstate 事件监听浏览器前进或者后退，触发更新。

3. 如何渲染 router-view 组件

   - 通过 Vue.observable 在 router 实例上创建一个保存当前路由的监控对象 current。
   - 当浏览器地址变化的时候，修改监控对象 current。
   - 在 router-view 组件中监听监控对象 current 的变化，当 current 变化后，获取用户注册的相应 component，并利用 h 函数将 component 渲染成 vnodes，进而更新页面视图。

### vue 理解

- 一个渐进式框架
- 数据驱动
- 组件化

### vue2.0 原理

通过数据劫持和发布订阅模式的方式通过 object.defineProperty()来劫持各个属性的个 getter setter , 在数据发生变化是发布消息给订阅者触发监听

1. observe 是对数据的劫持： 需要把 data 数据递归遍历包括各个子属性通过 object.defineProperty()来劫持数据转换成个 getter 和 setter， 添加订阅器（dep） 和 watcherd 依赖关系，当数据发生变化发送通知
2. compiler: 负责编译模板，解析指令，差值表达式，负责页面的首次渲染，当数据发生变化，收到通知，更新视图
3. wathch: 订阅者是 observe 和 compiler 之间的桥梁， 主要做的是
   ① 自身实例化的时候往 dep 对象中添加自己
   ② 自身必须有一个 update()方法
   ③ 待属性变动 dep.notice()通知时，能调用自身的 update()方法，并触发 Compile 中绑定的回调，则功成身退。

### vue3.0 原理

1. 响应式系统升级

   - 3.0 使用 proxy 设置响应式，
     1. 可以监听动态添加对象的属性
     2. 可以监听删除的属性
     3. 可以监听数组的索引以及数组的 length 属性

2. 编译优化：对 diff 进行优化

- Vue2.x 中通过标记静态根节点 优化 diff 的过程
- Vue3.0 中标记和提升所有静态的根节点，diff 的时候只需要对比动态节点内容
  - Fragments （升级 vetur 插件）
  - 静态提升
  - Patch flag（标记）跳过静态节点，更新动态节点，提升 diff 性能
  - 缓存事件处理函数

3. 源码体积优化： 源码体积这块 Vue3.0 通过将各个功能都解耦可以单独引入的方式

   - 优化打包体积
   - Vue3.0 中移除了一些不常用的 API
     - inline-template filter 等
     - Tree-shaking

#### VUE3 响应式

- reactive
  1. 传入的必须是一个对象，如果不是对象就直接返回
  2. 对象的属性添加删除都是响应式的 但是对对象进行重新赋值会丢失响应式
  3. 不可以解构 解构后的属性不是响应式
- ref
  1. 对传入的基本数据类型的数据进行响应式处理
  2. 将这个基本类型的数据包装为一个响应式对象
  3. 通过 value 属性来访问这个包装后对象的值
- toRefs
  1. toRefs 是对我们 reactive 包装过的响应式对象进行处理，在经过处理后就可以进行解构赋值的操作
- computed
  - computed 接收的是一个函数，在计算后返回得到一个值

#### vue2 和 vue3 的区别

- 响应式系统的改进： 2.x 是通过 object.defineProperty()响应， 3.x 通过 proxy 响应，还支持更深的数据响应和数组的数据响应
- Composition API： 3.x 引入 compositionAPI 是基于函数风格的 api，允许用户组合函数来组织和重用代码逻辑。与 options api 相比有更强的代码组织和复用性， 是组建更易于维护
- 虚拟 DOM 的优化： vue3.x 中优化了虚拟 DOM 采用了标记和提升所有静态根节点，通过 patch flag 跳过静态节点，更新动态节点，提升 diff 性能
- 支持 ts,
- 源代码体积的优化，移除不常用的 api

#### Vue 和 react 区别

Vue 和 React 是两个流行的前端框架，它们之间存在以下主要区别：

1. 响应式系统的实现方式：

   - Vue 使用了基于对象属性的响应式系统，通过劫持对象属性来实现数据的响应式更新。
   - React 使用了虚拟 DOM 和单向数据流的方式，通过比较虚拟 DOM 的差异来更新真实 DOM。

2. 组件化开发方式：

   - Vue 使用了模板语法，将 HTML、CSS 和 JavaScript 组合在一个文件中，使得组件的开发和维护更加直观和简单。
   - React 则采用了 JSX，将 HTML 和 JavaScript 结合在一起，使用 JavaScript 编写组件。

3. 学习曲线和易用性：

   - Vue 的学习曲线相对较低，上手较快，因为它采用了模板语法和提供了丰富的指令，适合新手和小型项目。
   - React 的学习曲线相对较陡峭，因为它需要掌握 JSX 语法和理解虚拟 DOM 的概念，适合有一定前端经验和大型项目。

4. 生态系统和插件支持：Vue 生态系统较为全面，官方提供了大量的插件和工具，可以满足不同的需求。React 生态系统庞大且活跃，社区提供了丰富的第三方库和组件，可以广泛应用于各种场景。

5. 社区和生态环境：Vue 的社区相对较小，但在国内有较大的影响力，并且得到了阿里巴巴等大厂的支持。React 的社区非常庞大且活跃，在全球范围内都有广泛的应用和支持。

### watch 原理：

- watch 用于监听数据的变化，当被监听的数据发生变化时，会触发相应的回调函数。
- 在 Vue 内部，watch 通过依赖追踪和观察者模式实现。Vue 会在数据发生变化时，收集相关的依赖，并将 watcher 对象添加到依赖列表中。
- 当被监听的数据发生变化时，Vue 会遍历依赖列表，触发相应的 watcher 对象的更新操作，从而执行对应的回调函数。

### computed 原理：

- computed 用于计算衍生数据，它会根据依赖的响应式数据自动进行缓存和更新。
- 在 Vue 内部，computed 通过使用 getter 和 setter 函数来实现。
- 当访问 computed 属性时，Vue 会执行对应的 getter 函数，该函数会返回计算后的值。
- 在计算过程中，Vue 会追踪依赖的响应式数据，并将 computed 属性与这些依赖建立关联。
- 当依赖的响应式数据发生变化时，Vue 会标记 computed 属性为脏（dirty）状态。
- 当下次访问 computed 属性时，Vue 会检测到脏状态，并执行对应的 setter 函数，重新计算该属性的值，并进行缓存。
- 这样，在多次访问同一个 computed 属性时，只会计算一次，并且在依赖的数据未发生变化时，会直接返回缓存的值，避免重复计算。

# React

# webpack

https://juejin.cn/post/6844904094281236487#heading-0

### webpack 构建流程

Webpack 的运行流程是一个串行的过程，从启动到结束会依次执行以下流程：

1. 初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数
2. 开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译
3. 确定入口：根据配置中的 entry 找出所有的入口文件
4. 编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理
5. 完成模块编译：在经过第 4 步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系
6. 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会
7. 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统

### webpack 优化

1.  压缩代码

- 多进程并行压缩
  - webpack-paralle-uglify-plugin
  - terser-webpack-plugin 开启 parallel 参数

2. 图片压缩
   - 配置 image-webpack-loader
3. 缩小打包作用域
   - exclude/include (确定 loader 规则范围)
4. Tree shaking

   - 打包过程中检测工程中没有引用过的模块并进行标记，在资源压缩时将它们从最终的 bundle 中去掉(只能对 ES6 Modlue 生效) 开发中尽可能使用 ES6 Module 的模块，提高 tree shaking 效率

5. Scope hoisting（作用域提升）
   - **构建后的代码会存在大量闭包，造成体积增大，运行代码时创建的函数作用域变多，内存开销变大**。Scope hoisting 将所有模块的代码按照引用顺序放在一个函数作用域里，然后适当的重命名一些变量以防止变量名冲突

### loader 和 plugin 区别

1. Loader 本质就是一个函数，在该函数中对接收到的内容进行转换，返回转换后的结果
   - Loader 在 module.rules 中配置，作为模块的解析规则，类型为数组。每一项都是一个 Object，内部包含了 test(类型文件)、loader、options (参数)等属性。
2. Plugin 就是插件，基于事件流框架 Tapable，插件可以扩展 Webpack 的功能

   - Plugin 在 plugins 中单独配置，类型为数组，每一项是一个 Plugin 的实例，参数都通过构造函数传入。

# Babel 原理

1. 解析：将代码转换成 AST

   - 词法分析：将代码(字符串)分割为 token 流，即语法单元成的数组
   - 语法分析：分析 token 流(上面生成的数组)并生成 AST

2. 转换：访问 AST 的节点进行变换操作生产新的 AST

- Taro 就是利用 babel 完成的小程序语法转换

3. 生成：以新的 AST 为基础生成代码

# 模块化

## 模块化理解

1. 什么是模块化

   - 将一个复杂的程序依据一定的规则(规范)封装成几个块(文件), 并进行组合在一起
   - 块的内部数据与实现是私有的, 只是向外部暴露一些接口(方法)与外部其它模块通信

2. 模块化的好处

   - 避免命名冲突(减少命名空间污染)
   - 更好的分离, 按需加载
   - 更高复用性
   - 高可维护性

## 模块化规范

1. CommonJS

   - 在服务器端，模块的加载是运行时同步加载的；在浏览器端，模块需要提前编译打包处理。

   ### 基本语法

   - 暴露模块：module.exports = value 或 exports.xxx = value
   - 引入模块：require(xxx),如果是第三方模块，xxx 为模块名；如果是自定义模块，xxx 为模块文件路径
   - CommonJS 模块的加载机制是，输入的是被输出的值的拷贝。也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。

2. AMD

   - AMD 规范则是非同步加载模块，允许指定回调函数, ，如果是浏览器环境，要从服务器端加载模块，这时就必须采用非同步模式，因此浏览器端一般采用 AMD 规范。

   ### 基本语法

   #### 定义暴露模块:

   ```js
   //定义没有依赖的模块
   define(function () {
     return 模块
   })

   //定义有依赖的模块
   define(['module1', 'module2'], function (m1, m2) {
     return 模块
   })
   ```

   #### 引入使用模块:

   ```js
   require(['module1', 'module2'], function (m1, m2) {
     使用m1 / m2
   })
   ```

3. CMD

   - CMD 规范专门用于浏览器端，模块的加载是异步的，模块使用时才会加载执行。CMD 规范整合了 CommonJS 和 AMD 规范的特点。在 Sea.js 中，所有 JavaScript 模块都遵循 CMD 模块定义规范。

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

4. ES6 模块化

   - ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量

   #### ES6 模块化语法

   export 命令用于规定模块的对外接口，import 命令用于输入其他模块提供的功能。

   ```js
   /** 定义模块 math.js **/
   var basicNum = 0
   var add = function (a, b) {
     return a + b
   }
   export { basicNum, add }
   /** 引用模块 **/
   import { basicNum, add } from './math'
   function test(ele) {
     ele.textContent = add(99 + basicNum)
   }
   ```

#### ES6 模块与 CommonJS 模块的差异

ES Module 从语法到原理详解[https://juejin.cn/post/7098192216229117959]

1. 区别

   - ES Module 输出的是值的引用，而 CommonJS 输出的是值的拷贝；
   - ES Module 是编译时执行，而 CommonJS 模块是在运行时加载；
   - ES6 Module 可以导出多个值，而 CommonJs 是单个值导出；
     ES6 Module 静态语法只能写在顶层，而 CommonJs 是动态语法可以写在判断里；
   - ES6 Module 的 this 是 undefined，而 CommonJs 的 this 是当前模块；

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

1. 减少 http 请求
2. 使用节流防抖
3. 减少重绘回流
4. 静态资源使用 cdn
5. css 放头部， js 放尾部

   - CSS 执行会阻塞渲染，阻止 JS 执行
   - JS 加载和执行会阻塞 HTML 解析，阻止 CSSOM 构建

6. 压缩文件

   - JavaScript：UglifyPlugin
   - CSS ：MiniCssExtractPlugin
   - HTML：HtmlWebpackPlugin

### 图片优化

1. 图片压缩
2. 图片分割：将超大图片分割成小图进行加载， 可以避免一次性加载整个图片，从而加快加载速度。这种方式需要在前端实现图片拼接，需要确保拼接后的图片无缝衔接
3. cnd 加速： 使用 cdn 可以将图片缓存在离用户更近的节点上，从而加速图片加载速度。如果需要加载的图片是静态资源，可以将其存储在 CDN 上，以便快速访问。
4. 懒加载： 懒加载是一种图片延迟加载的方式，即当用户浏览到需要加载的图片时才进行加载，可以有效避免一次性加载大量图片而导致页面加载速度缓慢。
5. WebP 格式：使用 WebP 格式可以将图片大小减小到 JPEG 和 PNG 的一半以下，从而加快图片加载速度。
6. http2.0: HTTP/2：使用 HTTP/2 协议可以并行加载多个图片，从而加快页面加载速度。
7. 预加载：预加载是在页面加载完毕后，提前加载下一步所需要的资源。在图片加载方面，可以在页面加载完毕后提前加载下一个需要显示的图片，以便用户快速浏览。

## js 性能优化

### DNS 解析

- 减少 DNS 请求
- DNS-prefetch（ DNS 预解析 ）
  1. dns-prefetch 仅对跨域上的 dns 查找有效， 避免使用他来指向您站点的域名，因为到浏览器看到提示时， 你的站点域背后的 ip 已经被解析
  2. DNS-prefetch 慎用， 多页面重复 DNS-prefetch 会增加重复 dns 查询次数
  3.

```h
  // 提高资源并发数
  <link rel="dns-prefetch" herf="xxxxxx">
```

### http 长链接

    - http1.1有长链接
    - http 管道机制

### 渲染优化

1. 优化 cssom

   - 阻塞渲染的 css
     ```html
     <!-- 阻塞渲染 -->
     <link herf="style.css" rel="stylesheet" />
     <!-- 非阻塞渲染-->
     <link herf="printe.css" rel="stylesheet" media="print" />
     <!-- 拆分媒体查询相关  css资源： 可变阻塞加载-->
     <link herf="other.css" rel="stylesheet" media="(min-width):em" />
     ```
   - 避免在 css 中使用@import
     ```css
       <!-- 会增加资源的路径 -->
       @import url("mian.css")
     ```

   2. 优化 js 的使用

   - 异步加载 js

     - 使用 defer 延迟加载 js 异步并行加载 同时保证顺序
       ```html
       <script defer src="index.js"></script>
       ```
     - 使用 async 延迟加载 js 异步并行加载 不能保证加载顺序

       ```html
       <script async src="index.js"></script>
       ```

     - 使用空闲时间加载指定资源

       ```html
       <link ref="preload" href="index.js" />

       <body>
         <p>1111</p>
         <script src="index.js"></script>
       </body>
       ```

   - 避免同步加载

2. js 执行优化
3. 实现动画效果  
   window.requestAnimationFrame()和 setInterval 相比，优势是将回调函数执行实际有系统决定
4. 恰当使用 web worker
5. 事件的节流防抖
6. debounce 防抖 清除定时器
7. throttle 节流 上一次时间和当前时间对比，触发
8. 减少计算样式的元素数量
9. 页面布局和重绘

### 内存管理

- 内存管理概念

  - 内存： 可读写单元组成的一片可操作的空间
  - 管理： 人为的去操作一片空间的申请，使用，释放
  - 内存管理: 开发者主动申请空间， 使用空间，释放空间

- GC 算法
  - 引用计数
    - 设置引用数， 判断当前引用数是否为 0
    - 优点
      - 发现垃圾立即回收
      - 最大限度减少程序暂停
    - 缺点
      - **无法回收循环引用的对象**
      - 时间开销大
  - 标记清除
    - 优点
      - **可以回收循环引用的对象**
    - 缺点
      - 不会立即回收垃圾对象
      - 容易产生碎片化空间
  - 标记整理： 标记阶段的操作和标记清除一致， 清除阶段会先整理，移动对象位置
    - 优点
      - 可以回收循环引用的对象
      - 减少碎片化空间
    - 缺点
      - 不会立即回收垃圾对象
  - V8 引擎
    - 主流的一款 js 引擎
    - V8 采用即时编译
    - V8 内存设限
    1. V8 垃圾回收策略
    - 采用分代回收思想
    - 内存分为辛申大，老生代
    - 针对不同对象采用不同算法
    2. V8 中常用的 GC 算法
    - 分代回收
    - 空间复制
    - 标记清除
    - 标记整理
    - 标记增量
    3. V8 内存分配
    - V8 内存空间一分为二
    - 小空间用于存储新生代对象（32M| 16M）
    - 新生代指的是存活时间较短的对象
    4. 新生代对象回收实现
    - 回收过程采用**复制算法 + 标记整理**
    - 新生代内存区分为两个等大小的空间
    - 使用空间为 from ，空闲空间为 to
    - 活动对象存储于 from 空间
    - 标记整理后将活动对象拷贝至 to
    - from 与 to 交换空间完成示范
    5. 老生代对象回收实现
    - 采用**标记清除， 标记整理， 增量标记算法**
    - 首先使用标记清除完成垃圾回收空间的回收
    - 采用标记整理进行空间优化
    - 采用增量标记进行效率优化
    6. 新生代和老生代对比
    - 新生代区域回收垃圾使用空间换时间
    - 老生代区域垃圾不适合复制算法

### 监控内存的方式

1. 内存泄露： 内存使用持续升高
2. 内存膨胀： 在多数设备上都存在性能问题
3. 频繁垃圾回收： 通过内存变化图进行分析

- 监控内存的方式
  1. 浏览器任务管理器
  2. timeline 时序图记录
  3. 堆快照查找分离 dom
- 如何确定频繁的垃圾回收
  1. timeline 中频繁的上升下降
  2. 任务管理器中数据频繁的增加减小

### 垃圾回收机制

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
  let minIndex, temp
  for (let i = 0; i < arr.length; i++) {
    minIndex = i
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        // 比对最小值
        minIndex = j // 将最小数的索引保存
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
function insertionSort2(arr) {
  let preIndex, current
  for (let i = 1; i < arr.length; i++) {
    preIndex = i - 1
    current = arr[i]
    // 前面一个值 > 当前的值
    while (preIndex >= 0 && arr[preIndex] > current) {
      arr[preIndex + 1] = arr[preIndex]
      preIndex--
    }
    arr[preIndex + 1] = current
  }
  return arr
}
```

# 错误上报 搜集页面错误，进行上报，然后对症分析

https://juejin.cn/post/6987681953424080926

```js
// 常见捕获方式：
// 浏览器端
window.onerror // 全局异常捕获
window.addEventListener('error') // js错误、资源加载错误
window.addEventListener('unhandledrejection') // 没有catch的Promise错误

// node端
process.on('uncaughtException') // 全局异常捕获
process.on('unhandledRejection') // 没有catch的Promise错误

// 异步异常捕获
/**
 * 重写原生、三方库相关方法：
 * 1.setTimeout / setInterval
 * 2.fetch
 * 3.XMLHttpRequest
 */
const originalSetTimeout = window.setTimeout
window.setTimeout = (fn, time) => {
  const wrap = () => {
    try {
      fn()
    } catch (e) {
      // do something
    }
  }
  return originalSetTimeout(wrap, time)
}

// 利用框架、三方库本身能力
/**
 * 重写原生、三方库相关方法：
 * 1.Vue.config.errorHandler
 * 2.React ErrorBoundary
 */
class ErrorBoundary extends React.Component {
  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    logErrorToMyService(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>
    }
    return this.props.children
  }
}
```

### sentry 和 SourceMap 之间的使用

https://www.jianshu.com/p/66e00077fac3
Sentry 和 SourceMap 是两个常用于前端错误监控和调试的工具，它们可以结合使用来更好地追踪和解决前端代码中的错误。

Sentry 是一款开源的错误监控平台，可以帮助开发人员捕获和报告前端和后端的错误。它提供了丰富的错误信息和堆栈跟踪，能够帮助开发人员快速定位和修复问题。Sentry 还支持集成到多种前端框架和工具中，如 Vue、React、Angular 等，以便更好地捕获和处理错误。

SourceMap 是一种用于将编译后的代码映射回原始源代码的文件。在前端开发中，为了提高性能和加载速度，通常会将 JavaScript、CSS 等代码进行压缩和合并。这样会导致在出现错误时难以定位到源代码中的具体位置。SourceMap 的作用就是提供了一个映射关系，将压缩后的代码位置映射回源代码中的位置，从而方便调试和错误追踪。

结合使用 Sentry 和 SourceMap，可以实现以下步骤：

1. 生成 SourceMap 文件：在构建过程中生成对应的 SourceMap 文件，通常是在压缩和合并代码的过程中生成。

2. 部署 SourceMap 文件：将生成的 SourceMap 文件部署到服务器上，确保它可以被访问到。

3. 配置 Sentry：在 Sentry 中创建项目并获取对应的 DSN（Data Source Name）。

4. 集成 Sentry 和 SourceMap：将 Sentry 的客户端 SDK 集成到前端应用中，并配置相关参数，包括 DSN 和 SourceMap 的 URL。

5. 错误监控和调试：当前端应用出现错误时，Sentry 会捕获错误信息，并根据 SourceMap 映射将错误定位到源代码的位置。开发人员可以在 Sentry 的控制台中查看错误报告，包括错误信息、堆栈跟踪和源代码位置。

通过使用 Sentry 和 SourceMap 的组合，开发人员可以更快速地定位和解决前端代码中的错误，提高应用的质量和稳定性。

### CORS 跨域资源共享

### 简单请求和非简单请求

- 简单请求：就先执行服务端程序，然后浏览器才会判断是否跨域；
- 非简单请求： 浏览器会在发送实际请求之前先发送一个 OPTIONS 的 HTTP 请求来判断服务器是否能接受该跨域请求；如果不能接受的话，浏览器会直接阻止接下来实际请求的发生。

### 同一页面三个组件请求同一个 API 发送了三次请求，如何优化

```js
const fetchUser = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Fetch: ', id)
      resolve(id)
    }, 5000)
  })
}

const cache = {}
const cacheFetchUser = (id) => {
  if (cache[id]) {
    return cache[id]
  }
  cache[id] = fetchUser(id)
  return cache[id]
}

cacheFetchUser(3).then((id) => console.log(id))
cacheFetchUser(3).then((id) => console.log(id))
cacheFetchUser(3).then((id) => console.log(id))
```

### 个人职业规划

1. 近期： 把重点放在工作上， 希望自己工作稳定， ，同时也希望能到咱们公司工作， 会快速融入公司，了解所用技术，踏踏实实吧工作开展起来
2. 三年： 未来三年在公司中潜心工作与学习， 先把工作做好，同时让自己技术提升更高的台阶（具体展开说下）， 踏踏实实做好技术， 同时提高自身综合素质
3. 五年：

### 有什么想问下公司的

1. 具体负责哪个方面的
2. 能来公司，我在技术方便需要提前关注哪些，或者学习哪些
3. 公司的未来发展

### app 内嵌 h5 是如何跟 app 通信的

在 App 内嵌 H5 页面时，通常可以通过以下几种方式实现 App 与 H5 页面之间的通信：

1. URL Scheme：App 可以通过 URL Scheme 启动 H5 页面，并通过 URL 中的参数传递数据。H5 页面可以通过 JavaScript 获取 URL 参数，从而实现与 App 之间的通信。

2. JavaScript Bridge：App 可以在 WebView 中注入 JavaScript Bridge，使得 H5 页面可以调用 Bridge 提供的方法，从而与 App 进行交互。通过 JavaScript Bridge，H5 页面可以向 App 发送请求，并接收来自 App 的响应。

3. postMessage：H5 页面可以使用 `window.postMessage` 方法向包含它的 WebView 发送消息，同时 App 可以通过监听 WebView 的 `onMessage` 事件来接收 H5 页面发送的消息。

4. LocalStorage 或 SessionStorage：H5 页面可以使用 LocalStorage 或 SessionStorage 存储数据，App 可以读取这些存储的数据，实现数据的传递和共享。

5. Webview 的 evaluateJavascript：App 可以通过 WebView 的 `evaluateJavascript` 方法执行 JavaScript 代码，并通过回调将结果传递给 H5 页面。

### jsbrige 实现方案

JSBridge（JavaScript Bridge）是一种用于在原生应用程序（如 Android 或 iOS 应用）和 Web 应用之间进行通信的技术。它允许在 Webview 内嵌入的 Web 应用和原生应用之间相互调用和传递数据，实现了 Web 应用与原生应用的无缝交互。

JSBridge 的实现原理如下：

1. 原生端提供接口：在原生应用中，开发者通过暴露一些接口（通常是以 JavaScript 对象的形式）来让 Webview 可以调用。这些接口通常以异步方式执行，并通过回调函数将结果传递给 Webview。

2. Webview 注入 JavaScript：在加载 Web 应用的 Webview 中，原生应用会将一个特定的 JavaScript 对象注入到 Webview 的全局环境中，让 Webview 可以访问到原生暴露的接口。

3. Web 应用调用原生接口：在 Web 应用中，通过调用注入的 JavaScript 对象中的方法来触发原生接口的调用。这些方法会将参数传递给原生接口，并等待原生应用的响应。

4. 原生应用执行操作：在原生应用中，收到 Webview 的调用请求后，执行相应的操作。可能涉及到访问原生功能、获取设备信息、打开新窗口、发送网络请求等。

5. 原生应用回调结果：在完成操作后，原生应用通过回调函数将结果传递给 Webview。Webview 中定义的回调函数会被调用，从而让 Web 应用可以得到执行结果。

通过以上步骤，JSBridge 实现了 Web 应用和原生应用之间的通信。这种技术使得 Webview 内嵌的 Web 应用可以调用原生功能，同时也让原生应用可以通过 Webview 调用 Web 应用的逻辑。这样，开发者可以更加灵活地在 Webview 中嵌入 Web 应用，并实现更丰富的功能和交互体验。

### 微信小程序和传统 H5 相比哪个性能更好

1. 加载速度：微信小程序的加载速度相对较快，因为小程序在用户打开时会下载并缓存整个应用，之后的访问会直接从缓存中加载。而传统 H5 页面每次访问都需要重新下载整个页面，因此加载速度可能会相对较慢。

2. 性能表现：小程序是在微信的运行环境中执行的，它对底层资源和硬件有更好的优化，因此在一些性能方面（例如渲染性能、CPU、内存等）可能表现更好。而传统 H5 页面则受限于浏览器环境，性能可能相对较弱。

3. 功能支持：传统 H5 页面可以使用浏览器提供的丰富功能和 API，拥有更多的自由度和灵活性，但在小程序中一些高级功能可能需要通过插件或特定的 API 实现。

4. 开发成本：传统 H5 页面开发相对简单，使用 Web 技术开发即可，而小程序开发需要使用特定的开发语言（如微信小程序使用的 WXML 和 WXSS），并遵循小程序的开发规范，因此可能会有一些额外的学习成本。

5. 体验流畅度：小程序在用户体验方面更为流畅，因为它的界面交互更接近原生应用，而传统 H5 页面可能存在一些滚动卡顿、界面闪烁等问题。

# 微前端

1. 拆分巨型应用， 使应用变得更加可维护
2. 兼容历史应用， 实现增量开发

### 如何是实现微应

### interface 和 type 区别

- 同： interface 与 type 都可以表示对象类型
- 不同点

  1. type 能够表示非对象类型，而 interface 只能表示对象类型
  2. interface 可以继承其它类型（extends），type 不支持继承
     继承的主要作用是添加属性，**type 定义的对象类型如果想要添加属性，只能使用&运算符，重新定义一个类型**。

     ```js
     type Animal = {
       name: string,
     }

     type Bear = Animal & {
       honey: boolean,
     }
     ```

  3. 同名 interface 会自动合并，同名 type 则会报错。也就是说，TypeScript 不允许使用 type 多次定义同一个类型。
  4. interface 不能包含属性映射

  ```js
  interface Point {
    x: number;
    y: number;
  }


  // 正确
  type PointCopy1 = {
  [Key in keyof Point]: Point[Key];
  };

  // 报错
  interface PointCopy2 {
  [Key in keyof Point]: Point[Key];
  };


  ```

  5. this 关键字只能用于 interface。
  6. type 可以扩展原始数据类型，interface 不行。
  7. interface 无法表达某些复杂类型（比如交叉类型和联合类型），但是 type 可以。

  ```js
  type A = {
    /* ... */
  }
  type B = {
    /* ... */
  }

  type AorB = A | B
  type AorBwithName = AorB & {
    name: string,
  }
  ```

### DOM 和 BOM5

- DOM
  DOM 又称文档对象模型，它是 HTML 和 XML 文档的编程接口，它主要描述了一些我们使用 JS 处理网页内容的方法和接口，它的目标是网页内容。比如说我们使用 JS 修改页面内容，其实就是操作的 DOM 文档。

  window 对象是 BOM 的核心对象，它表示的是浏览器的实例

  - navigator 对象
  - location 对象
  - history 对象

- BOM
  BOM 又称浏览器对象模型，它主要用来描述一些与浏览器行为相关的接口和方法，比如我们利用 JS 调整浏览器窗口大小、标签页跳转等等，这些都是 BOM 对象。

  下面是 DOM 和 BOM 中一些常见的属性示例：

**DOM 属性示例：**

1. `document`: 表示整个文档的对象。
2. `element.innerHTML`: 获取或设置 HTML 元素的内容。
3. `element.style`: 获取或设置 HTML 元素的样式。
4. `element.childNodes`: 获取一个元素的子节点列表。
5. `element.getAttribute(name)`: 获取元素的指定属性值。

**BOM 属性示例：**

1. `window`: 表示浏览器窗口的全局对象。
2. `window.navigator`: 提供关于浏览器的信息。
3. `window.screen`: 提供关于屏幕的信息。
4. `window.location`: 提供关于当前 URL 的信息，允许导航到新的 URL。
5. `window.history`: 提供浏览器历史记录的操作。

这只是其中的一小部分，DOM 和 BOM 提供了许多其他属性和方法，用于操作和控制文档结构、样式，以及与浏览器进行交互。
