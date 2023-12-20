// 示例 1：

// 输入：prices = [1,2,2], money = 3
// 输出：0
// 解释：分别购买价格为 1 和 2 的巧克力。你剩下 3 - 3 = 0 块钱。所以我们返回 0 。
// 示例 2：

// 输入：prices = [3,2,3], money = 3
// 输出：3
// 解释：购买任意 2 块巧克力都会超过你拥有的钱数，所以我们返回 3

/**
 * @param {number[]} prices
 * @param {number} money
 * @return {number}
 */
var buyChoco = function (prices, money) {
  prices.sort((a, b) => a - b)
  let total = prices[0] + prices[1]

  return total <= money ? money - total : money
}

let prices = [1, 2, 2]
let money = 3
console.log(buyChoco(prices, money))
