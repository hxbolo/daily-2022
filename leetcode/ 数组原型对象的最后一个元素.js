// 请你编写一段代码实现一个数组方法，使任何数组都可以调用 array.last() 方法，这个方法将返回数组最后一个元素。如果数组中没有元素，则返回 -1 。

// 你可以假设数组是 JSON.parse 的输出结果。

// 示例 1 ：

// 输入：nums = [null, {}, 3]
// 输出：3
// 解释：调用 nums.last() 后返回最后一个元素： 3。
// 示例 2 ：

// 输入：nums = []
// 输出：-1
// 解释：因为此数组没有元素，所以应该返回 -1。

/**
 * @return {null|boolean|number|string|Array|Object}
 */
Array.prototype.last = function () {
  console.log(this.length - 1);
  return this.length ? this[this.length - 1] : -1
  // console.log(this);
}

const arr = []
console.log(
  arr.last() // 3
)
