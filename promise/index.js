const MyPromise = require('./my-promise');

// let promise1 = new MyPromise((resolve, reject) => {
//     // resolve('成功----')
//   setTimeout(() => {
//     console.log('sssss',);
//   },110)
//     // reject('失败')
// })


function p1() {
  return new MyPromise((resolve, reject) => {
    resolve('p1')
  })
}

function p2() {
  return new MyPromise((resolve, reject) => {
    resolve('p2')
  })
}

MyPromise.resolve(p1()).then(val => {
  console.log(val);
})
// MyPromise.all([p1, 'c', p2]).then(val => {
//   console.log(val);
// })