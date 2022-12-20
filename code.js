// function forEach(arr,fn) {
//   for (let i = 0; i < arr.length; i++){
//     fn(arr[i])
//   }
// };

// let a = [1,3,3,4]

// forEach(a, function (item) {
//   console.log(item + 1);
// })

// filter
// 遍历返回一个数组

// function filter(arr, fn) {
//   let res = []
//   for (let i = 0; i < arr.length; i++){
//     if (fn(arr[i])) {
//       res.push(arr[i])
//     }
//   }
//   return res
// }

// let a = [1,3,4,5,6,7,8]

// let res = filter(a, function (item) {
//   return item % 2 == 0
// })

// console.log(res);

// map
// const map = (arr, fn) => {
//   let res = []
//   for (let val of arr) {
//     res.push(fn(val))
//   }
//   return res
// }

// console.log(map([1,2,3,4], v => v+ 1 ));

// every
// every() 方法测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。

// const every = (arr, fn) => {
//   let res = true
//   for (let val of arr) {
//     res = fn(val)
//     if (!res) {
//       break
//     }
//   }
//   return res
// }

// console.log(every([1, 2, 3, 4], i => i > 3));

// // some 

// const some = (arr, fn) =>{
//   let res = false
//   for (let val of arr) {
//     res = fn(val)
//     if (res) {
//       break
//     }
//   }
//   return res
// }

// console.log(some([1, 2, 3, 4], i => i > 3));