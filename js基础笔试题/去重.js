let arr = [1, 3, 4, 4, 5, 6, 7, 4]

let newarr = Array.from(new Set(arr))


let a = arr.filter((item, index, array) =>{
  return array.indexOf(item) === index
})


let c = arr.reduce((acc, cur) => {
  if(!acc.includes(cur)){
    return [...acc, cur]
  }
  return acc
}, [])


// ===============================
let b = arr.filter((item, index, array) => {
  return array.indexOf(item) === index
})
console.log(c);