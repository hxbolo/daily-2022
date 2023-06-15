// 给定一个字符串 s 和一个整数 k，从字符串开头算起，每计数至 2k 个字符，就反转这 2k 字符中的前 k 个字符。

// 如果剩余字符少于 k 个，则将剩余字符全部反转。
// 如果剩余字符小于 2k 但大于或等于 k 个，则反转前 k 个字符，其余字符保持原样。
// 输入：s = "abcdefg", k = 2
// 输出："bacdfeg"


/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var reverseStr = function(s, k) {
  // let arr =  s.split('')
  // if(arr.length < k){
  //   return arr.reverse()
  // }else{
  //   let left = arr.splice(k)
  //   return arr.reverse().concat(left).join('')
  // }


  let res = '';
  for(let i = 0;i < s.length;i += 2 * k){
      res += s.substr(i,k).split('').reverse().join('') + s.substr(i+k,k);
  }
  return res;

};

console.log(reverseStr("bacdfeg", 2));