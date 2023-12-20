// 给定一个数组 arr 和一个函数 fn，返回一个排序后的数组 sortedArr。你可以假设 fn 只返回数字，并且这些数字决定了 sortedArr 的排序顺序。sortedArr 必须按照 fn 的输出值 升序 排序。

// 你可以假设对于给定的数组，fn 不会返回重复的数字。

// 示例 1：

// 输入：arr = [5, 4, 1, 2, 3], fn = (x) => x
// 输出：[1, 2, 3, 4, 5]
// 解释：fn 只是返回传入的数字，因此数组按升序排序。

/**
 * @param {Array} arr
 * @param {Function} fn
 * @return {Array}
 */
var sortBy = function (arr, fn) {
  return arr.sort((a, b) => {
    return fn(a) - fn(b)
  })
}

let arr = [{"x": 1}, {"x": 0}, {"x": -1}]
let fn = (x) => x.x

console.log(sortBy(arr, fn))
