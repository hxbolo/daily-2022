// 示例 1：

// 输入：
// nums = [1,2,3,4]
// fn = function sum(accum, curr) { return accum + curr; }
// init = 0
// 输出：10
// 解释：
// 初始值为 init=0 。
// (0) + nums[0] = 1
// (1) + nums[1] = 3
// (3) + nums[2] = 6
// (6) + nums[3] = 10
// Val 最终值为 10。

/**
 * @param {number[]} nums
 * @param {Function} fn
 * @param {number} init
 * @return {number}
 */
var reduce = function (nums, fn, init) {
  let res = init
  for(let i of nums){
    res = fn(res, i)

  }
  return res
}
nums = [1, 2, 3, 4]
fn = function sum(accum, curr) {
  return accum + curr
}
init = 0

console.log(reduce(nums, fn, init))
