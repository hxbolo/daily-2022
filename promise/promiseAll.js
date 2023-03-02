
Promise.myAll = (promises) => {
  return new Promise((rs, rj) => {
    // 计数器
    let count = 0
    // 存放结果
    let result = []
    const len = promises.length
    
    if (len === 0) {
      return rs([])
    }
    
    promises.forEach((p, i) => {
      // 注意有的数组项有可能不是Promise，需要手动转化一下
      Promise.resolve(p).then((res) => {
        count += 1
        // 收集每个Promise的返回值 
        result[ i ] = res
        // 当所有的Promise都成功了，那么将返回的Promise结果设置为result
        if (count === len) {
          rs(result)
        }
        // 监听数组项中的Promise catch只要有一个失败，那么我们自己返回的Promise也会失败
      }).catch(rj)
    })
  })
}


Promise.myAllone = (promise) => {
  return new Promise((rs, rj) => {
    let count =  0
    let reslut = []
    let len = promise.length
    if (len == 0) {
      return rs([])
    }

    promise.forEach((p, i) => {
      Promise.resolve(p)
        .then(res => {
          count += 1
          reslut[i] = res
          if (count === len) {
            rs(reslut)
          }
        })
        .catch(rj)
    })
  })
}

Promise.allSettledMy = (promise) => {
  return new Promise((reslove, reject) => {
    let count = 0
    let reslut = []
    let len = promise.length

    if (len == 0) {
      reslove([])
    }

    promise.forEach((p, i) => {
      Promise.resolve(p)
        .then(res => {
          count += 1
          reslut[i] = {
            status: 'fulfilled',
            value:res
          }
          if (count == len) {
            reslove(reslut)
          }
        })
        .catch((err) =>{
          count += 1
          reslut[i] = {
            status: 'rejected',
            value:err
          }
          if (count == len) {
            reject(reslut)
          }
      })
    })
  })
}

// 测试一下
const p1 = Promise.resolve(1)
const p2 = new Promise((resolve) => {
  setTimeout(() => resolve(2), 1000)
})
const p3 = new Promise((resolve) => {
  setTimeout(() => resolve(3), 3000)
})

const p4 = Promise.reject('err4')
// const p5 = Promise.reject('err5')
// 1. 所有的Promise都成功了
const p11 = Promise.myAllone([ p1, p2, p3 ])
	.then(console.log) // [ 1, 2, 3 ]
      .catch(console.log)
      
// 2. 有一个Promise失败了
const p12 = Promise.allSettledMy([ p1, p2, p4 ])
	.then(console.log)
      .catch(console.log) // err4
      
// // 3. 有两个Promise失败了，可以看到最终输出的是err4，第一个失败的返回值
// const p13 = Promise.myAll([ p1, p4, p5 ])
// 	.then(console.log)
//       .catch(console.log) // err4
// // 与原生的Promise.all返回是一致的    
