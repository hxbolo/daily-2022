

## promise
- promise 就是一个类， 在执行这个类的时候， 需要传递一个执行器进去 执行器会立即执行

```js
class MyPromise{
  constructor (executor) {
    executor(this.resolve,this.reject)
  }
  resolve =() => {}
  reject =() => {}
}
module.exports = MyPromise;
```
- promise 有三个不同的状态，  成功 失败 等待  一旦状态改变就无法修改
```js
const PENDING = 'pending'; // 等待
const FULFILLED = 'fulfilled'; // 成功
const REJECTED = 'rejected'; // 失败
```
- resolve 和reject 函数是用来改变状态
```js
  // 成功
  resolve =() => {
    // 如果状态不是等待 阻止程序向下执行
    if (this.status !== PENDING) return;
    // 将状态更改为成功
    this.status = FULFILLED;
  }
  // 失败
  reject =() => {
    // 如果状态不是等待 阻止程序向下执行
    if (this.status !== PENDING) return;
    // 将状态更改为失败
    this.status = REJECTED;
  }
```
- then 方法内部做的事情就判断状态， 如果状态是成功 调用成功的回调函数 如果状态是失败 调用失败回调函数 then方法是被定义在原型对象中的

- then成功回调有一个参数 表示成功之后的值 then失败回调有一个参数 表示失败后的原因
```js
 then = (successCallback, failCallBack) => {
    if (this.status == FULFILLED) {
      successCallback(this.value)
    }
    if (this.status == REJECTED) {
      failCallBack(this.reason)
    }
  }
```


- 同一个promise对象下面的then方法是可以被调用多次的
```js
  // 可以多次调用所以要声明个成功回调和失败回调为数组
   // 成功回调
  successCallback = [];
  // 失败回调
  failCallback = [];
  // 成功回调中
  while (this.successCallback.length) this.successCallback.shift()(this.value)

  let promise = new MyPromise((resolve, reject) => {
      resolve('成功----')
      // reject('失败')
  })
  //eg: then可以被多次调用
  promise.then(val => {
    console.log(val);
  })
  promise.then(val => {
    console.log(val);
  })
  promise.then(val => {
    console.log(val);
  })

```
- then方法是可以被链式调用的, 后面then方法的回调函数拿到值的是上一个then方法的回调函数的返回值

```js
   then = (successCallback, failCallBack) => {
    
    let promise2 = MyPromise((resolve, reject) => {
      
      if (this.status == FULFILLED) {
        // then方法的链式调用
        let x = successCallback(this.value);
        // 判断 x 的值是普通值还是promise对象
        // 如果是普通值 直接调用resolve
        // 如果是promise对象 查看promsie对象返回的结果
        // 再根据promise对象返回的结果 决定调用resolve 还是调用reject
        resolvePromise( x, resolve, reject)
        
      }
    })
    return promise2
  }

  function resolvePromise(x, resolve, reject) {
  if (x instanceof MyPromise) {
    // promise对象
    x.then(resolve, reject)
  } else {
    // 普通值
    resolve(x)
  }
  
}
```
- then 方法的参数变成可选参数
```js
  promise.then().then().then((val) => console.log(val))

  // 参数可选
  successCallback = successCallback ? successCallback : value => value
  
  failCallback = failCallback ? failCallback : reason => { throw this.reason}
```

- promise.all  接收一个数组作为参数， 接收的参数的顺序，是返回结果值的顺序， 返回的是一个promise对象  在all 方法中如果方法都是成功了，返回就是成功的值， 如果有一个失败的值， 那他就是失败的返回

```js
static all(arr) {
    let result = []
    let index = 0
  
    return new MyPromise((reslove, reject) => {
      function addData(key, value) {
        result[key] = value
        index++ 
        if (index === arr.length) {
          reslove(result)
        }
      }
      // for循环参与异步方法， 解决方法， 定义一个index 变量， 让index 和arr 的长度相同才执行reslove
      for (let i = 0; i < arr.length; i++){
        let current = arr[i]
        if (current instanceof MyPromise) {
          // promise对象
          current.then(value =>addData(i,value),reason => reject(reason))
        } else {
          // 普通值
          addData(i,arr[i])
        }
      }
    })
  }
```

- reslove 把给定的值转换成给定的promise对象
```js
  static resolve(value) {
    if (value instanceof MyPromise) return value;
    return new MyPromise(resolve => resolve(value));
  }
```

- finally 1. 无论是成功还是失败都会执行一次 2.在finally方法后面可以链式调用then方法拿到promise 最终返回的结果

```js
  finally(callback){
    return this.then(value => {
      return MyPromise.resolve(callback()).then(() => value);
    }, resaon => {
      return MyPromise.resolve(callback()).then(() => { throw resaon })
    })
  }
```

整体代码
```js

const PENDING = 'pending' //等待
const FULFILLED = 'fulfilled'; // 成功
const REJECTED = 'rejected'; // 失败
class MyPromise {
  constructor(executor) {
    executor(this.reslove,this.reject)
  }
  status = PENDING
  value = undefined
  reason = undefined
  // 成功回调
  successCallback = []
  // 失败回调
  failCallback = []
  reslove = (value) => {
    if(this.status != PENDING) return 
    this.status = FULFILLED
    this.value = value
    while(this.successCallback.length) this.successCallback.shift()()
  }
  reject = (reason) => {
    if(this.status != PENDING) return 
    this.status = REJECTED
    this.reason = reason
    console.log(this.failCallback);
    while(this.failCallback.length) this.failCallback.shift()()
  }
  then = (successCallback, failCallback) => {
    // 参数可选
    successCallback = successCallback ? successCallback : value => value
    
    failCallback = failCallback ? failCallback : reason => { throw this.reason}

    let promise2 = new MyPromise((resolve, reject) => {
      
        if (this.status == FULFILLED) {
          // 在resolvePromise中promise2 需要在promise2 执行完成后才能获取到， 改成异步的就可以获取到了
          setTimeout(() => {
            try {
              // then方法的链式调用
              let x = successCallback(this.value);
              // 判断 x 的值是普通值还是promise对象
              // 如果是普通值 直接调用resolve
              // 如果是promise对象 查看promsie对象返回的结果
              // 再根据promise对象返回的结果 决定调用resolve 还是调用reject
              resolvePromise(promise2, x, resolve, reject)
            } catch(e) {
              reject(e)
            }
          },0)
          
        }else if (this.status == REJECTED) {
           // 在resolvePromise中promise2 需要在promise2 执行完成后才能获取到， 改成异步的就可以获取到了
          setTimeout(() => {
            try {
              let x = failCallback(this.reason);
              resolvePromise(promsie2, x, resolve, reject)
            }catch (e) {
              reject(e);
            }
          }, 0)
        } else{
          // 等待
          // 将成功回调和失败回调存储起来
          this.successCallback.push(() => {
            setTimeout(() => {
              try {
                // then方法的链式调用
                let x = successCallback(this.value);
                resolvePromise(promise2, x, resolve, reject)
              } catch(e) {
                reject(e)
              }
            },0)
          })
          this.failCallback.push(() => {
            setTimeout(() => {
              try {
                let x = failCallback(this.reason);
                resolvePromise(promsie2, x, resolve, reject)
              }catch (e) {
                reject(e);
              }
            }, 0)
          })
        }
      
    })
    return promise2
  }

  finally(callback){
    return this.then(value => {
      return MyPromise.resolve(callback()).then(() => value);
    }, resaon => {
      return MyPromise.resolve(callback()).then(() => { throw resaon })
    })
  }

  static all(arr) {
    let result = []
    let index = 0
  
    return new MyPromise((reslove, reject) => {
      function addData(key, value) {
        result[key] = value
        index++ 
        if (index === arr.length) {
          reslove(result)
        }
      }
      // for循环参与异步方法， 解决方法， 定义一个index 变量， 让index 和arr 的长度相同才执行reslove
      for (let i = 0; i < arr.length; i++){
        let current = arr[i]
        if (current instanceof MyPromise) {
          // promise对象
          current.then(value =>addData(i,value),reason => reject(reason))
        } else {
          // 普通值
          addData(i,arr[i])
        }
      }
    })
  }

  static resolve(value) {
    if (value instanceof MyPromise) return value;
    return new MyPromise(resolve => resolve(value));
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }
  
  if (x instanceof MyPromise) {  
    // promise对象
    x.then(resolve, reject)
  } else {
    // 普通值
    resolve(x)
  }
  
}
module.exports = MyPromise;

```