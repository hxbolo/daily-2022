// 输入：func = () => expect(5).toBe(5)
// 输出：{"value": true}
// 解释：5 === 5 因此该表达式返回 true。

/**
 * @param {string} val
 * @return {Object}
 */
var expect = function (val) {
  return {
    exp: val,
    toBe: function toBe(val) {
      if (this.exp !== val) {
        throw new Error('Not Equal')
      }
      return true
    },
    notToBe: function notToBe(val) {
      if (this.exp === val) {
        throw new Error('Equal')
      }
      return true
    },
  }
}

/**
 * expect(5).toBe(5); // true
 * expect(5).notToBe(5); // throws "Equal"
 */

console.log(expect(5).notToBe(5))
