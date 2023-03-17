// 题目： 给定一个数组 nums 和一个目标值 target，在该数组中找出和为目标值的两个数

// 输入： nums: [8, 2, 6, 5, 4, 1, 3] ； target:4

// 输出： [2, 5]

let nums = [8, 2, 6, 5, 4, 1, 3]
function sumArr(arr, target) {
  for (let i = 0; i < arr.length; i++){
    for (let j = 1; j < arr.length; j++){
      console.log(arr[i], arr[j]);
      if (arr[i] + arr[j] == target) {
        return [arr[i], arr[j]]
      }
    }
  }
}

function sum(arr, target) {
  let map = {}
  for (let i = 0; i < arr.length; i++){
    console.log(map[target - arr[i]],'------', target - arr[i]);
    if (map[target - arr[i]] != undefined) {
      return [target-arr[i], arr[i]]
    } else {
      map[arr[i]] =  i
    }

    console.log(map);
  }
}

let a = aaa(nums,4)
console.log(a, '====>a');

function aaa(arr, target) {
  if (Array.isArray(arr)) {
    let map = {}
    for (let i = 0; i < arr.length; i++){
      if (map[target - arr[i] ]!= undefined){
        return [target - arr[i], arr[i]]        
      } else {
        map[arr[i]] = i
      }
    }
  }
  return []
}