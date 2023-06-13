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
    1. 全局执行上下文： 这是默认的、最基础的执行上下文。不在任何函数中的代码都位于全局执行上下文中。它做了两件事：
      -  创建一个全局对象，在浏览器中这个全局对象就是 window 对象。
      - 将 this 指针指向这个全局对象。一个程序中只能存在一个全局执行上下文。
    2. 函数执行上下文： 每次调用函数时，都会为该函数创建一个新的执行上下文。每个函数都拥有自己的执行上下文，但是只有在函数被调用的时候才会被创建。一个程序中可以存在任意数量的函数执行上下文。每当一个新的执行上下文被创建，它都会按照特定的顺序执行一系列步骤，具体过程将在本文后面讨论。
    3. Eval 函数执行上下文： 运行在 eval 函数中的代码也获得了自己的执行上下文，但由于 Javascript 开发人员不常用 eval 函数，所以在这里不再讨论。

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
# web存储
  - cookie 
  1. 4kb左右， 主要用于保存登录信息
  2. 生命周期： 一个会话周期， 可以设置他是时效
  3. 每次都会携带在HTTP头中，如果使用cookie保存过多数据会带来性能问题

- localStorage
  1. 一般为5M 
  2. 永久存储， 除非被清除
  3. 仅在客户端（即浏览器）中保存，不参与和服务器的通信
- sessionStorage
  1. 一般为5M 
  2. 当前会话有效， 关闭浏览器后被清除
  3. 仅在客户端（即浏览器）中保存，不参与和服务器的通信
# HTTP
  ### http 1.0 、1.1、 2.0 发展史
    1. 连接复用性:
      - HTTP/1.0: 每个请求和响应都需要建立一个新的TCP连接，导致性能较低。
      - HTTP/1.1: 引入了持久连接（Keep-Alive），允许在单个TCP连接上传输多个请求和响应，提高了性能。
      - HTTP/2.0: 支持多路复用（Multiplexing），允许在单个TCP连接上同时传输多个请求和响应，减少了延迟。

    2. 请求和响应的处理方式:
      - HTTP/1.0: 请求和响应之间是按序处理的，即一个请求的响应必须完全接收后才能发送下一个请求。
      - HTTP/1.1和HTTP/2.0: 支持管道化（Pipelining），允许在一个TCP连接上同时发送多个请求和响应。

    3. 二进制传输:
      - HTTP/1.0和HTTP/1.1: 使用文本格式传输数据。
      - HTTP/2.0: 引入了二进制传输，将HTTP消息分解为二进制帧进行传输，提高了传输效率。

    4. 头部压缩:
      - HTTP/1.0和HTTP/1.1: 每个请求和响应的Header信息都需要重复传输，增加了数据传输量。
      - HTTP/2.0: 引入了头部压缩技术，可以减少Header信息的传输大小。

    5. 服务器推送:
      - HTTP/1.0和HTTP/1.1: 服务器无法主动向客户端推送数据。
      - HTTP/2.0: 支持服务器推送（Server Push），服务器可以主动将响应的资源推送给客户端，减少客户端的请求次数。

    总体而言，HTTP/1.0、HTTP/1.1和HTTP/2.0在性能、传输效率和功能特性上有不同程度的改进和优化。HTTP/2.0相对于HTTP/1.x版本具有更高的性能和效率，能够更好地满足现代Web应用的需求。


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
      - Exprires的值为服务端返回的数据到期时间。当再次请求时的请求时间小于返回的此时间，则直接使用缓存数据。
      
    2. Cache-Control。
      - private：客户端可以缓存 
      - public：客户端和代理服务器都可以缓存 
      - max-age=t：缓存内容将在t秒后失效 
      - no-cache：需要使用协商缓存来验证缓存数据 
      - no-store：所有内容都不会缓存。
  - 协商缓存： 客户端会先从缓存数据库中获取到一个缓存数据的标识，得到标识后请求服务端验证是否失效（新鲜），如果没有失效服务端会返回304，此时客户端直接从缓存中获取所请求的数据，如果标识失效，服务端会返回更新后的数据
    - Last-Modified： 服务器在响应请求时，会告诉浏览器资源的最后修改时间
    - Etag： 服务器响应请求时，通过此字段告诉浏览器当前资源在服务器生成的唯一标
      - If-None-Match： 再次请求服务器时，浏览器的请求报文头部会包含此字段，后面的值为在缓存中获取的标识。服务器接收到次报文后发现If-None-Match则与被请求资源的唯一标识进行对比。

  - 优点
    1. 减少了冗余的数据传递，节省宽带流量
    2. 减少了服务器的负担，大大提高了网站性能
    3. 加快了客户端加载网页的速度 这也正是HTTP缓存属于客户端缓存的原因。

  - 强制缓存的优先级高于协商缓存

# VUE
  ### vue理解
  - 一个渐进式框架
  - 数据驱动
  - 组件化
  ### vue2.0 原理
    通过数据劫持和发布订阅模式的方式通过object.defineProperty()来劫持各个属性的个getter setter , 在数据发生变化是发布消息给订阅者触发监听
    1. observe是对数据的劫持： 需要把data数据递归遍历包括各个子属性通过object.defineProperty()来劫持数据转换成个getter 和 setter， 添加订阅器（dep） 和watcherd 依赖关系，当数据发生变化发生通知
    2. compiler: 负责编译模板，解析指令，差值表达式，负责页面的首次渲染，当数据发生变化，收到通知，更新视图
    3. wathch: 订阅者是observe和compiler之间的桥梁， 主要做的是
      ①自身实例化的时候往dep对象中添加自己
      ②自身必须有一个 update()方法
      ③待属性变动 dep.notice()通知时，能调用自身的 update()方法，并触发 Compile 中绑定的回调，则功成身退。
  ### vue3.0 原理
  1. 响应式系统升级
    - 3.0 使用proxy设置响应式，
        1. 可以监听动态添加对象的属性
        2. 可以监听删除的属性
        3. 可以监听数组的索引以及数组的length属性
  2. 编译优化：对diff进行优化
  - Vue2.x中通过标记静态根节点 优化diff的过程
  - Vue3.0中标记和提升所有静态的根节点，diff的时候只需要对比动态节点内容
      - Fragments （升级vetur插件）
      - 静态提升
      - Patch flag（标记）跳过静态节点，更新动态节点，提升diff性能
      - 缓存事件处理函数
  3. 源码体积优化： 源码体积这块 Vue3.0通过将各个功能都解耦可以单独引入的方式
    - 优化打包体积
    - Vue3.0中移除了一些不常用的API
      - inline-template filter等
      - Tree-shaking

   ### VUE3响应式
    - reactive
      1. 传入的必须是一个对象，如果不是对象就直接返回
      2. 对象的属性添加删除都是响应式的 但是对对象进行重新赋值会丢失响应式
      3. 不可以解构 解构后的属性不是响应式
    - ref
      1. 对传入的基本数据类型的数据进行响应式处理
      2. 将这个基本类型的数据包装为一个响应式对象
      3. 通过value属性来访问这个包装后对象的值
    - toRefs 
      1. toRefs是对我们reactive包装过的响应式对象进行处理，在经过处理后就可以进行解构赋值的操作
    - computed
      - computed 接收的是一个函数，在计算后返回得到一个值

  ### vue2和vue3 的区别
    - 响应式系统的改进： 2.x是通过object.defineProperty()响应， 3.x通过proxy响应，还支持更深的数据响应和数组的数据响应
    - Composition API： 3.x引入compositionAPI 是基于函数风格的api，允许用户组合函数来组织和重用代码逻辑。与options api 相比有更强的代码组织和复用性， 是组建更易于维护
    - 虚拟 DOM 的优化： vue3.x中优化了虚拟DOM 采用了标记和提升所有静态根节点，通过patch flag 跳过静态节点，更新动态节点，提升diff 性能
    - 支持ts, 
    - 源代码体积的优化，移除不常用的api 

  ## Vue和react 区别
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