// 示例 1:

// 输入：arr = [1,2,3], fn = function plusone(n) { return n + 1; }
// 输出：[2,3,4]
// 解释：
// const newArray = map(arr, plusone); // [2,3,4]
// 此映射函数返回值是将数组中每个元素的值加 1。

/**
 * @param {number[]} arr
 * @param {Function} fn
 * @return {number[]}
 */
var map = function (arr, fn) {
  let newArr = []
  for (let i = 0; i < arr.length; i++) {
    newArr.push(fn(arr[i], i))
  }
  return newArr
}

let arr = [1, 2, 3]
let fn = function plusone(n) {
  return n + 1
}

console.log(map(arr, fn))
