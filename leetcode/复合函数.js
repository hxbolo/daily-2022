// 请你编写一个函数，它接收一个函数数组 [f1, f2, f3，…， fn] ，并返回一个新的函数 fn ，它是函数数组的 复合函数 。

// [f(x)， g(x)， h(x)] 的 复合函数 为 fn(x) = f(g(h(x))) 。

// 一个空函数列表的 复合函数 是 恒等函数 f(x) = x 。

// 你可以假设数组中的每个函数接受一个整型参数作为输入，并返回一个整型作为输出。

// 输入：functions = [x => x + 1, x => x * x, x => 2 * x], x = 4
// 输出：65
// 解释：
// 从右向左计算......
// Starting with x = 4.
// 2 * (4) = 8
// (8) * (8) = 64
// (64) + 1 = 65

/**
 * @param {Function[]} functions
 * @return {Function}
 */
var compose = function (functions) {
  return function (x) {
    // if (functions.length == 0) return x
    // let temp = functions.shift()
    // return temp(compose(functions)(x))
    // return functions.reduceRight((target, fn) => fn(target), x)
    let arrFuns = functions.reverse()
    console.log(arrFuns)
    arrFuns.forEach((i) => {
      x = i(x)
    })
    return x
  }
}

const fn = compose([(x) => x + 1, (x) => 2 * x])
console.log(
  fn(4) // 9
)

var argumentsLength = function (...args) {
  console.log(Array.from(args))

  //  Array.from(...args).length
}

argumentsLength(123, 1, 3)
