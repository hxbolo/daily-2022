

// promise 有3个状态一旦状态改变就不可修改逆转

const PENDING = 'pending'
const FULFILLED = 'fulfilled'; // 成功
const REJECTED = 'rejected'; // 失败
class MyPromise {
  constructor(executor) {
    executor(this.reslove, this.reject)
  }
  status = PENDING
  value = undefined
  reason = undefined
  // 成功失败回调
  successCallback = []
  failCallback = []
  // 成功
  reslove = (value) => {
    if(this.status != PENDING) return
    this.status = FULFILLED
    this.value = value
  }
  // 失败
  reject = (reason) => {
    if(this.status != PENDING) return
    this.status = REJECTED
    this.value =  reason
  }
  then = (successCallback, failCallback) => {
    // 成功调用成功函数， 失败调用失败函数
    successCallback =  successCallback ? successCallback : value => value
    failCallback =  failCallback ? failCallback : reason => { throw this.reason}
    // 会返回要给promise
    let promise2 = new MyPromise((reslove, reject) => {
      if (this.status == FULFILLED) {
        setTimeout(() => {
          try {
            let x = successCallback(this.value)
            // 判断x是普通值还是promise
            resolvePromise(promise2, x, reslove, reject)
          } catch (e) {
            reject(e)
          }
          
        }, 0);
      } else if (this.status == REJECTED) {
        setTimeout(() => {
          try {
            let x = failCallback(this.reason)
            // 判断x是普通值还是promise
            resolvePromise(promise2, x, reslove, reject)
          } catch (e) {
            reject(e)
          }
        }, 0);
      } else {
        // 等待 将成功和失败回调存储起来

        this.successCallback.push(() => {
          setTimeout(() => {
            try {
              let x = successCallback(this.value)
              // 判断x是普通值还是promise
              resolvePromise(promise2, x, reslove, reject)
            } catch (e) {
              reject(e)
            }
          }, 0);
        })
        this.failCallback.push(() => {
          setTimeout(() => {
            try {
              let x = failCallback(this.reason)
              // 判断x是普通值还是promise
              resolvePromise(promise2, x, reslove, reject)
            } catch (e) {
              reject(e)
            }
          }, 0);
        })
        
      }

    })
    return promise2
  }

  // 所有都成功才能返回，返回一个数组
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
      for (let i = 0; i < arr.length; i++){
        let current = arr[i]
        if (current instanceof MyPromise) {
          current.then(value => addData(i, value)),
            reason =>reject(reason)
        } else {
          addData(i,arr[i])
        }
      }
    })

  }

}

function resolvePromise(promise2, x, resolve, reject) { 
  if (promise2 == x) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }
  if (x instanceof MyPromise) {
    x.then(resolve,reject)
  } else {
    resolve(x)
  }
}

module.exports = MyPromise;