// 现给定一个函数 fn ，一个参数数组 args 和一个以毫秒为单位的超时时间 t ，返回一个取消函数 cancelFn 。

// 在经过 t 毫秒的延迟后，应该调用 fn 函数，并将 args 作为参数传递。除非 在 t 毫秒的延迟过程中，在 cancelT 毫秒时调用了 cancelFn。并且在这种情况下，fn 函数不应该被调用。

// 示例 1:

// 输入：fn = (x) => x * 5, args = [2], t = 20, cancelT = 50
// 输出：[{"time": 20, "returned": 10}]
// 解释：
// const cancel = cancellable((x) => x * 5, [2], 20); // fn(2) 在 t=20ms 时被调用
// setTimeout(cancel, 50);

// 取消操作被安排在延迟了 cancelT（50毫秒）后进行，这发生在 fn(2) 在20毫秒时执行之后。

/**
 * @param {Function} fn
 * @param {Array} args
 * @param {number} t
 * @return {Function}
 */
var cancellable = function (fn, args, t) {
  const j = setTimeout(fn, t, ...args)
  return () => clearTimeout(j)
}

const result = []

const fn = (x) => x * 5
const args = [2],
  t = 20,
  cancelTimeMs = 50

const start = performance.now()

const log = (...argsArr) => {
  const diff = Math.floor(performance.now() - start)
  result.push({ time: diff, returned: fn(...argsArr) })
}

const cancel = cancellable(log, args, t)

const maxT = Math.max(t, cancelTimeMs)

setTimeout(cancel, cancelTimeMs)

setTimeout(() => {
  console.log(result) // [{"time":20,"returned":10}]
}, maxT + 15)
