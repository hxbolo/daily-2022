/**
* @param {string} s
* @param {string[]} wordDict
* @return {boolean}
*/
var wordBreak = function(s, wordDict) {
  const map = {};
  
  for (let word of wordDict) {
  map[word] = true;
  }
  console.log(map);
  
  const d = [];
  d[0] = true;
  
  for (let i=0; i<s.length; i++) {
    for (let j=1; j <= i+1; j++) {
      let substr = s.substr(i + 1 - j, j);
      if (d[i+1-j] && map[substr]) {
        d[i+1] = true;
        break;
      }
    }
    d[i + 1] = d[i + 1] || false;
    console.log(d,'d[i + 1]');
  }
  
  return d[s.length];
};


/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
let wordBreak1 = function (s, wordDict) {
  let n = s.length
  if (!n) return true

  let wordSet = new Set(wordDict)
  console.log(wordSet,'wordSet');
  let dp = []
  dp[0] = true

  for (let i = 0; i <= n; i++) {
    for (let j = i; j >= 0; j--) {
      let word = s.slice(j, i)
      if (wordSet.has(word) && dp[j]) {
        console.log(wordSet.has(word) , dp[j]);
        dp[i] = true
        break
      }
    }
  }

  return !!dp[n]
}
  
// s = “leetcode”, wordDict = [“leet”, “code”]
console.log(

  wordBreak1('leetcode',['leet', 'code'])
);