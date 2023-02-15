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
    for (let j=1;j<=i+1;j++) {
      let substr = s.substring(i + 1 - j, j);
      console.log('substr',substr);
      if (d[i+1-j] && map[substr]) {
      d[i+1] = true;
      break;
    }
  }
  d[i+1] = d[i+1] || false;
  }
  
  return d[s.length];
};
  
// s = “leetcode”, wordDict = [“leet”, “code”]
console.log(

  wordBreak('leetcode',['leet', 'code'])
);