// 给定一个函数 fn ，它返回一个新的函数，返回的函数与原始函数完全相同，只不过它确保 fn 最多被调用一次。

// 第一次调用返回的函数时，它应该返回与 fn 相同的结果。
// 第一次后的每次调用，它应该返回 undefined 。

// 输入：fn = (a,b,c) => (a + b + c), calls = [[1,2,3],[2,3,6]]
// 输出：[{"calls":1,"value":6}]
// 解释：
// const onceFn = once(fn);
// onceFn(1, 2, 3); // 6
// onceFn(2, 3, 6); // undefined, fn 没有被调用

/**
 * @param {Function} fn
 * @return {Function}
 */
var once = function (fn) {
  // let hasBeenCalled = false;
  // return function(...args){
  //   if (!hasBeenCalled) {
  //     hasBeenCalled = true;
  //     return fn.apply(this, args);
  //   }
  // }

  let one = false
  return function(...args){
    if(!one){
      one = true
      return fn.apply(this,args)
    }
  }

}

let fn = (a, b) => a - b
let onceFn = once(fn)

// onceFn(1, 2, 3) // 6
// onceFn(2, 3, 6) // returns undefined without calling fn

console.log(onceFn(1, 2, 3))
console.log(onceFn(2, 3, 6))
