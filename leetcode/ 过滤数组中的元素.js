// 输入：arr = [0,10,20,30], fn = function greaterThan10(n) { return n > 10; }
// 输出： [20,30]
// 解释：
// const newArray = filter(arr, fn); // [20, 30]
// 过滤函数过滤掉不大于 10 的值
/**
 * @param {number[]} arr
 * @param {Function} fn
 * @return {number[]}
 */
var filter = function (arr, fn) {
  let res = []
  for (let i = 0; i < arr.length; i++) {
    if (fn(arr[i], i)) {
      res.push(arr[i])
    }
  }

  return res
}

let arr = [1, 2, 3]
let fn = function firstIndex(n, i) {
  return i === 0
}

console.log(filter(arr, fn))
