function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    // console.log(j);
    // ;[arr[i], arr[j]] = [arr[j], arr[i]]
    const temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp

  }
  return arr
}


function shuffleArray1(arr){
  for(let i=arr.length-1; i>0; i--){
    const j= Math.floor(Math.random()*(i+1))
    console.log(i, j);
    const temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
  }
  return arr
}
const originalArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const shuffledArray = shuffleArray1(originalArray)
console.log(shuffledArray) // 输出一个随机排列的数组
