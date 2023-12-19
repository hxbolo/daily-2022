// 输入: nums = [0,1,0,3,12]
// 输出: [1,3,12,0,0]
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
  let len = nums.length
  for(let i=0; i<len; i++){
    if(nums[i] == 0){
      nums.splice(i,1)
      nums.push(0)
      i--
      len--
    }
  }
  

  

  console.log(nums, 'res++++')
}
// var moveZeroes = function (nums) {
//   for (let i = nums.length; i >=0; i--) {
//     if (nums[i] == 0) {
//       nums.splice(i, 1)
//       nums.push(0)
//     }
//   }

  

//   console.log(nums, 'res++++')
// }

moveZeroes([0,0,1])
