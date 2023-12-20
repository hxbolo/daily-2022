// 给你一个三位数整数 n 。

// 如果经过以下修改得到的数字 恰好 包含数字 1 到 9 各一次且不包含任何 0 ，那么我们称数字 n 是 迷人的 ：

// 将 n 与数字 2 * n 和 3 * n 连接 。
// 如果 n 是迷人的，返回 true，否则返回 false 。

// 连接 两个数字表示把它们首尾相接连在一起。比方说 121 和 371 连接得到 121371 。

// 示例 1：

// 输入：n = 192
// 输出：true
// 解释：我们将数字 n = 192 ，2 * n = 384 和 3 * n = 576 连接，得到 192384576 。这个数字包含 1 到 9 恰好各一次。

/**
 * @param {number} n
 * @return {boolean}
 */
var isFascinating = function (n) {
  let total = String(n) + String(2 * n) + String(3 * n)
  // total.split('').indexOf((i,index, arr)=>{
  //   console.log(arr, arr.indexOf(i) == index);
    
  // })
  if(total.includes("0") || total.length != 9) return false;
  console.log(new Set(total.split("")),new Set(total.split("")).size == 9);
  return new Set(total.split("")).size == 9

  
}

console.log(isFascinating(100))
