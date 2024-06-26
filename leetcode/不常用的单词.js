// 句子 是一串由空格分隔的单词。每个 单词 仅由小写字母组成。

// 如果某个单词在其中一个句子中恰好出现一次，在另一个句子中却 没有出现 ，那么这个单词就是 不常见的 。

// 给你两个 句子 s1 和 s2 ，返回所有 不常用单词 的列表。返回列表中单词可以按 任意顺序 组织。

 

// 示例 1：

// 输入：s1 = "this apple is sweet", s2 = "this apple is sour"
// 输出：["sweet","sour"]
// 示例 2：

// 输入：s1 = "apple apple", s2 = "banana"
// 输出：["banana"]

/**
 * @param {string} s1
 * @param {string} s2
 * @return {string[]}
 */
var uncommonFromSentences = function(s1, s2) {
  const arr =  s1.split(" ").concat( s2.split(' '))
  let map = {}
  for(let i= 0; i< arr.length; i++){
    let val =  arr[i]
    map[val] = map[val] ? ++map[val] :1
  }
  let res = []
  for(let k in map){
    if(map[k] == 1){
      res.push(k)
    }
  }
  return res
};

console.log(uncommonFromSentences("this apple is sweet", "this apple is sour"));