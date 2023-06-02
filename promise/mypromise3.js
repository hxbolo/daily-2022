

// promise 有3个状态一旦状态改变就不可修改逆转
// resolve reject 函数用来改变状态
// then 内部判断状态， 成功调用成功回调， 失败调用失败回调， 

const PENDING = 'pending'
const FULFILLED = 'fulfilled'; // 成功
const REJECTED = 'rejected'; // 失败
class MyPromise {
  constructor(executor){
    executor(this.reslove,this.reject)
  }
  status = PENDING
  value = undefined
  reason = undefined
  // 成功回调
  successCallback = []
  // 失败回调
  failCallback = []
  reslove = (value) =>{
    if(this.status != PENDING) return
    this.status = FULFILLED
    this.value = value
    while(this.successCallback.length) this.successCallback.shift()()
  }

  reject = (reason) =>{
    if(this.status != PENDING) return
    this.status = REJECTED
    this.reason = reason
    while(this.failCallback.length) this.failCallback.shift()()
  }
  then = (successCallback, failCallback) =>{
    successCallback = successCallback? successCallback: value =>value

    failCallback = failCallback? successCallback: reason =>{throw this.reason}

    let  promise2 = new MyPromise((resolve,reject)=>{
      if(this.status == FULFILLED){
        //  在resolvePromise中promise2 需要在promise2 执行完成后才能获取到， 改成异步的就可以获取到了
        setTimeout(() =>{
          try{
            let x = successCallback(this.value)
            resolvePromise(promise2,x,resolve,reject)
          }catch(e){
            reject(e)
          }
        },0)
      }else if (this.status == REJECTED){
        setTimeout(() =>{
          try{
            let x = failCallback(this.value)
            resolvePromise(promise2,x,resolve,reject)
          }catch(e){
            reject(e)
          }
        },0)
      }else{
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
              // then方法的链式调用
              let x = failCallback(this.value);
              
              resolvePromise(promise2, x, resolve, reject)
            } catch(e) {
              reject(e)
            }
          },0)
        })
      }
    })
    return promise2
  }

  static all(arr){
    let result = []
    let index  = 0
    return new MyPromise((reslove, reject) =>{
      function addData(key,value){
        result[key] = value
        index++
        if(index == arr.length){
          reslove(result)
        }
      }
      // for 循环参与异步，arr 都成功 执行reslove,
      for(let i = 0; i<arr.length; i++){
        let current = arr[i]
        if(current instanceof MyPromise){
          current.then(value  => addData(i,value), reason => reject(reason))
        }else{
          addData(i, arr[i])
        }
      }
    })
  }

  finally(callback){
    return this.then(value =>{
      return MyPromise.reslove(callback()).then(() =>value)
    }, reason =>{
      return MyPromise.reslove(callback()).then(() =>{throw reason})
    })
  }
}


function resolvePromise(promise2, x, resolve, reject){
  // 判断 x 的值是普通值还是promise对象
  // 如果是普通值 直接调用resolve
  // 如果是promise对象 查看promsie对象返回的结果
  // 再根据promise对象返回的结果 决定调用resolve 还是调用reject
  if(promise2 == x){
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }
  if(x instanceof MyPromise){
    x.then(resolve, reject)
  }else{
    resolve(x)
  }
}



module.exports = MyPromise;