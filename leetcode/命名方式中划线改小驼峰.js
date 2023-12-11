// // console.log(transName(['A-b-cee', 'ca-de-ea', 'e-fe-eaa', 'f-g', 'mn']))
// // function transName(arr) {
// //   let res = arr.map((item) => {
// //     let items = item.split('-').map((v, index) => {
// //       if (index) {
// //         let first = v.substring(0, 1)
// //         console.log(first, 'first')
// //         const rest = v.substring(1)
// //         return first.toUpperCase() + rest
// //       } else {
// //         return v.toLowerCase()
// //       }
// //     })
// //     return items.join('')
// //   })

// //   return res
// // }

// const myPromise = (num) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(resolve, 1000)
//   })
// }

// async function test() {
//   for (let i = 0; i < 5; i++) {
//     await myPromise(i)
//     console.log(i)
//   }
// }

// test()

// // for (let i = 0; i < 5; i++) {
// //   setTimeout(function () {
// //     console.log(i)
// //   }, 1000)
// // }

const arrayA = [4, 2, 1, 2, 5]
const arrayB = [2, 3, 1, 6]
function process(arrayA, arrayB) {
  // 这⾥是你实现代码的地⽅
  let res = []
  for (let i = 0; i < arrayA.length; i++) {
    for (let j = 0; j < arrayB.length; j++) {
      if (arrayA[i] == arrayB[j]) {
        console.log(arrayA[i], arrayA[i])
        res.push(arrayB[j])
      }
    }
  }
  return Array.from(new Set(res)).sort()
}
/*
应该返回 [1, 2]
*/
console.log(process(arrayA, arrayB))
