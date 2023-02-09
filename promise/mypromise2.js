

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
  resason = undefined
   // 成功失败回调
  successCallback = []
  failCallback = []
  reject(value) {
    if (this.status != PENDING) return
    this.status = FULFILLED
    this.value = value
  }
  reslove(resason) {
    if (this.status != PENDING) return
    this.status = REJECTED
    this.resason = resason
  }

  then(successCallback, failCallback) {
    successCallback = successCallback ? successCallback : value => value
    
    failCallback = failCallback ? failCallback : resason => resason

    let promise2 = new MyPromise((reject, reslove) => {
      if (this.status == FULFILLED) {
        setTimeout(() => {
          try {
            let x = successCallback(this.value)
            resolvePromise(promise2, x, reject, reslove)
          } catch (e) {
            reject(e)
          }
        }, 0)
      } else if (this.status == REJECTED) {
        setTimeout(() => {
          try {
            let x = failCallback(this.resason)
            resolvePromise(promise2, x, reject, reslove)
          } catch (e) {
            reject(e)
          }
        }, 0)
      } else {
        this.successCallback.push(() => {
          setTimeout(() => {
            try {
              let x = successCallback(this.value)
              resolvePromise(promise2, x, reject, reslove)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })

        this.failCallback.push(() => {
          setTimeout(() => {
            try {
              let x = failCallback(this.resason)
              resolvePromise(promise2, x, reject, reslove)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
      }
    })
    return promise2
  }

  static all(arr) {
    let result = []
    let index = 0
    return new MyPromise((reslove, reject) => {

      function addData(key, value) {
        result[key] = value
        index++
        if (index == arr.length) {
          reslove(result)
        }
      }


      for (let i = 0; i < arr.length; i++){
        let current = arr[i]
        if (current instanceof MyPromise) {
          current.then(value => addData(i, value), reason => reject(reason))
        } else {
          addData(i, arr[i])
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
    x.then(resolve, reject)
  } else {
    resolve(x)
  }
}

module.exports = MyPromise;