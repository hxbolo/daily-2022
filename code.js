// // // function forEach(arr,fn) {
// // //   for (let i = 0; i < arr.length; i++){
// // //     fn(arr[i])
// // //   }
// // // };

// // // let a = [1,3,3,4]

// // // forEach(a, function (item) {
// // //   console.log(item + 1);
// // // })

// // // filter
// // // 遍历返回一个数组

// // // function filter(arr, fn) {
// // //   let res = []
// // //   for (let i = 0; i < arr.length; i++){
// // //     if (fn(arr[i])) {
// // //       res.push(arr[i])
// // //     }
// // //   }
// // //   return res
// // // }

// // // let a = [1,3,4,5,6,7,8]

// // // let res = filter(a, function (item) {
// // //   return item % 2 == 0
// // // })

// // // console.log(res);

// // // map
// // // const map = (arr, fn) => {
// // //   let res = []
// // //   for (let val of arr) {
// // //     res.push(fn(val))
// // //   }
// // //   return res
// // // }

// // // console.log(map([1,2,3,4], v => v+ 1 ));

// // // every
// // // every() 方法测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。

// // // const every = (arr, fn) => {
// // //   let res = true
// // //   for (let val of arr) {
// // //     res = fn(val)
// // //     if (!res) {
// // //       break
// // //     }
// // //   }
// // //   return res
// // // }

// // // console.log(every([1, 2, 3, 4], i => i > 3));

// // // // some

// // // const some = (arr, fn) =>{
// // //   let res = false
// // //   for (let val of arr) {
// // //     res = fn(val)
// // //     if (res) {
// // //       break
// // //     }
// // //   }
// // //   return res
// // // }

// // // console.log(some([1, 2, 3, 4], i => i > 3));

// // const MyNumber = function (value) {
// //   this.value = value
// // }

// // // 定义 Symbol.toPrimitive 方法
// // MyNumber.prototype[Symbol.toPrimitive] = function (hint) {
// //   if (hint === 'number') {
// //     return this.value
// //   }
// //   if (hint === 'string') {
// //     return `MyNumber(${this.value})`
// //   }
// //   return this.value
// // }

// // const num = new MyNumber('40')

// // // 使用加法运算符，触发类型转换
// // const result = num + 8

// // console.log(result) // 输出 50

// // let user = {
// //   name: 'John',
// //   money: 1000,
// //   [Symbol.toPrimitive](hint) {
// //     // hint = "string"、"number" 和 "default" 中的一个
// //     return hint == 'string' ? `{name: "${this.name}"}` : this.money
// //   },
// // }

// // // 转换演示：
// // console.log(user) // hint: string -> {name: "John"}
// // console.log(+user) // hint: number -> 1000
// // console.log(user + 500) // hint: default -> 1500

// // var a = { value: 0 }
// // a[Symbol.toPrimitive] = function (hint) {
// //   console.log(hint) // default
// //   return (this.value += 1)
// // }
// // console.log(a == 1 ) // true

// // // var a = { value: 0 }
// // // a.valueOf = function () {
// // //   return (this.value += 1)
// // // }
// // // console.log(a == 1 && a == 2 && a == 3) // true

// // // var a = { value: 0 }
// // // a.toString = function () {
// // //   return (this.value += 1)
// // // }
// // // console.log(a == 1 && a == 2 && a == 3) // true

// // var test = {
// //   i: 10,
// //   toString: function() {
// //      console.log('toString');
// //      return this.i;
// //   },
// //   valueOf: function() {
// //      console.log('valueOf');
// //      return this.i;
// //   }
// //  }
// //  alert(test);// 10 toString
// //  alert(+test); // 10 valueOf
// //  alert(''+test); // 10 valueOf
// //  alert(String(test)); // 10 toString
// //  alert(Number(test)); // 10 valueOf
// //  alert(test == '10'); // true valueOf
// //  alert(test === '10'); // false

// console.log(a) // undefind
// a() // 10
// var a = 3
// function a() {
//   console.log(10)
// }
// console.log(a) // 3
// a = 6
// a() // 10

// Promise.resolve().then(function a() {
// console.log("then1");
// Promise.resolve().then(function b() {
// console.log("then1-1");
// Promise.resolve().then(function c() {
// console.log("then1-3");
// })
// return Promise.resolve();
// }).then(function d()
// console.log("then1 -2");

// }).then(function e() {
// console.log("then2");
// }).then(function e() {
// console.log("then3");
// }).then(function e()
// console.log("then4");
// }).then(function e() {
// console.log("then5");
// });
setTimeout(function timeout() {
  console.log('Timed out!');
  }, 0);
  Promise.resolve(1).then(function resolve() {
  console.log('Resolved!');
  Promise.resolve().then(function resolve() {
    console.log('Resolved2222!');
    }).then(r=>{
      console.log(333);
    }).then(r=>{
      console.log(4);
    })
  }).then(r=>{
    console.log(1);
  }).then(r=>{
    console.log(2);
  }).then(r=>{
    console.log(3);
  });
// Promise.resolve()
//   .then(function a() {
//     console.log('then1')
//     Promise.resolve()
//       .then(function b() {
//         console.log('then1--1')
//         Promise.resolve().then(function c() {
//           console.log('then1--3')
//         })
//         return Promise.resolve()
//       })
//       .then(function d() {
//         console.log('then1--2')
//       })
//   })
//   .then(function e() {
//     console.log('then2')
//   })
//   .then(function e() {
//     console.log('then3')
//   })
//   .then(function e() {
//     console.log('then4')
//   })
//   .then(function e() {
//     console.log('then5')
//   })

// var length = 10
// function fn() {
//   console.log(this.length)
// }
// var ichangtou = {
//   length: 5,
//   method: function (fn) {
//     fn()
//     arguments[0]()
//   },
// }
// ichangtou.method(fn, 1)

// function countDown(nums) {
//   console.log(nums)
//   const timer = setInterval(() => {
//     nums-- // 倒计时数字减一
//     if (nums >= 0) {
//       console.log(nums) // 打印当前倒计时的数字
//     } else {
//       clearInterval(timer)
//     }
//   }, 1000)
// }
// countDown(5)

// function countDown(n) {
//   if (n >= 0) {
//     console.log(n) // 打印当前倒计时的数字
//     setTimeout(() => countDown(n - 1), 1000) // 递归调用 countDown 函数，并设置 1 秒钟的延迟
//   }
// }

// // 使用例子，倒计时从 5 开始
// countDown(5)

// function myNew(constructor, ...args) {
//   // 1. 创建一个新的空对象
//   const obj = {}

//   // 2. 将新对象的原型链接到构造函数的原型对象
//   obj.__proto__ = constructor.prototype

//   // 3. 将构造函数的执行上下文设置为新对象，并执行构造函数
//   const result = constructor.apply(obj, args)

//   // 4. 如果构造函数没有返回其他对象，则返回这个新对象
//   return result instanceof Object ? result : obj
// }

// function newq(constructor, ...args) {
//   let obj = {}
//   obj.__proto__ = constructor.prototype
//   const res = constructor.apply(obj, args)
//   return res instanceof Object ? res : obj
// }

// // 测试
// function Person(name, age) {
//   this.name = name
//   this.age = age
// }

// const person1 = newq(Person, 'Alice', 30)
// console.log(person1) // 输出：Person { name: 'Alice', age: 30 }


function countDown(n){
  console.log(n);
  const timer= setInterval(() =>{
    n--
    if(n>=0){
      console.log(n);
    }else{
      clearInterval(timer)
    }
  },1000)
}
countDown(5)
