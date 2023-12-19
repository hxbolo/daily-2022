// 输入：arr = [1,2,3,4,5], size = 1
// 输出：[[1],[2],[3],[4],[5]]
// 解释：数组 arr 被分割成了每个只有一个元素的子数组。

/**
 * @param {Array} arr
 * @param {number} size
 * @return {Array}
 */
var chunk = function (arr, size) {
  let newArr = []
  for (let i = 0; i < arr.length; i = i + size) {
    console.log(i,i+size)
    newArr.push(arr.slice(i, i+ size))
  }
  return newArr
}

console.log(chunk([1, 23, 4, 5, 5, 6, 44, 7, 8], 2))
