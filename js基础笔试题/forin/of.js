// var arr = ['red', 'green', 'blue']

// for(let item in arr) {
//   console.log('for in item', item)
// }
// /*
//   for in item 0
//   for in item 1
//   for in item 2
// */
 
// for(let item of arr) {
//   console.log('for of item', item)
//   // for of item red
//   // for of item green
//   // for of item blue
// }

// var obj = {
//   'name': 'Jim Green',
//   'age': 12
// }

// for(let key in obj) {
//   console.log('for of obj', key)
// }

let arr = [1, 2, 3, 5, 9]
// arr.forEach(item => {
//   if(item % 2 === 0) {
//     return
//   }
//   console.log('item', item)
// })

for (let i of arr) {
  if(i % 2 === 0) {
    break
  }
  console.log('item', i)
}
/*
  item 1
  item 3
  item 5
  item 9
*/