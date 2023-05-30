function bubbleSort(arr) {
  var len = arr.length;
  for (var i = 0; i < len - 1; i++) {
      for (var j = 0; j < len - 1 - i; j++) {
          if (arr[j] > arr[j+1]) {        // 相邻元素两两对比
              var temp = arr[j+1];        // 元素交换
              arr[j+1] = arr[j];
              arr[j] = temp;
          }
      }
  }
  return arr;
}


function bubble(arr) {
  var len = arr.length
  for (let i = 0; i < len - 1; i++){
    for (let j = 0; j < len - 1 - i; j++){
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j+1]
        arr[j+1] = arr[j]
        arr[j] = temp
      }
    }
  }
  return arr
}


function bubble1(arr) {
  var len =  arr.length
  for (let i = 0; i < len - 1; i++){
    for (let j = 0; j < len - 1 - i; j++){
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j + 1]
        arr[j + 1] = arr[j]
        arr[j]= temp
      }
    }
  }
  return arr
}

function bubble2(arr){
  for(let i = 0; i< arr.length-1; i++){
    for(let j = 0; j< arr.length-1-i; j++){
      if(arr[j] > arr[j+1]){
        let temp = arr[j+ 1]
        arr[j+1] = arr[j]
        arr[j] = temp
      }
    }
  }
  return arr
}


const arr = [87, 63, 54, 3, 43, 23, 2, 5, 6, 4]

console.log(bubble2(arr));