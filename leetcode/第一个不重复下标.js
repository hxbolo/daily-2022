// 题目： 输入一个字符串，找到第一个不重复字符的下标

// 输入： 'abcabcde'

// 输出： 6


function findOneStr(str) {
  if (!str) return -1
  let map = {}
  let arr =  str.split('')
  for (let i = 0; i < arr.length; i++){
    let val = map[arr[i]]
    map[arr[i]] = val? ++val : 1
  
  }
  
  for (let i = 0; i < arr.length; i++){
    if (map[arr[i]] == 1) { 
      return i
    }
  }
  return -1

}


let str = 'abcabcde'
let a = findOneStr(str)
console.log('a===>',a);