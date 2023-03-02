

// function flat(arr, depth = 1) {
//   if (depth > 0) {
//     // 以下代码还可以简化，不过为了可读性，还是....
//     return arr.reduce((pre, cur) => {
//       return pre.concat(Array.isArray(cur)? flat(cur) : cur)
//     },[])
//   }
//   return arr.slice();
// }

// console.log(flat([1, 3, 4, 5, [44, 5, 5]]));


function flat(arr, depth = 1) {
  if (depth > 0) {
    return arr.reduce((pre, cur) => {
      return pre.concat(Array.isArray(cur)? flat(cur):cur)
    },[])
  }
  return arr.slice()
}


// ===============
function faltten(arr) {
  return arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur)? faltten(cur) : cur)
  },[])
}


function faltten1(arr) {
  return arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur)? faltten1(cur):cur)
  },[])
  
}


console.log(faltten1([1, 3, 4, 5, [44, 5, [3, 4, 5], 5]]));
