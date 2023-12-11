const arr = [1, 2, 3, 4, 5, 6, 7]

// 方法一
function printArrayWithDelay(arr) {
  for (let i = 0; i < arr.length; i++) {
    ;(function (i) {
      setTimeout(() => {
        console.log(arr[i])
      }, i * 2000)
    })(i)
  }
}
// printArrayWithDelay(arr)


// 方法二 sleep
function sleep(t){
  return new Promise(resolve => setTimeout(resolve, t))
}

async function printArrayWithDelay2(arr){
  for(const num of arr){
    console.log(num);
    await sleep(2000)
  }
}

printArrayWithDelay2(arr)

// 方法三


