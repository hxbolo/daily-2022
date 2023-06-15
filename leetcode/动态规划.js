function maxNonAdjacentSum(nums) {
  if (nums.length === 0) {
    return 0;
  }
  
  const dp = []; // 用于存储中间状态的数组
  dp[0] = nums[0]; // 初始状态，第一个数作为初始值
  dp[1] = Math.max(nums[0], nums[1]); // 第二个数的最大和为较大的那个数


  for (let i = 2; i < nums.length; i++) {
    console.log(dp[i - 1], dp[i - 2], dp[i - 1], dp[i - 2] + nums[i],  nums[i]);
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
    // 状态转移方程：当前位置的最大和为前两个位置的最大和加上当前位置的数值，或者前一个位置的最大和
  }

  return dp[nums.length - 1]; // 返回最后一个位置的最大和
}

// 示例用法
const nums = [1, 2, 3, 1];
const result = maxNonAdjacentSum(nums);
console.log(result); // 输出 4
