function selectionSort(arr) {
  var len = arr.length;
  var minIndex, temp;
  for (var i = 0; i < len - 1; i++) {
      minIndex = i;
      for (var j = i + 1; j < len; j++) {
          if (arr[j] < arr[minIndex]) {     // 寻找最小的数
              minIndex = j;                 // 将最小数的索引保存
          }
      }
      temp = arr[i];
      arr[i] = arr[minIndex];    
      arr[minIndex] = temp;
  }
  return arr;
} 


function select1(arr) {
  let len = arr.length
  let minIndex , temp
  for (let i = 0; i < len - 1; i++){
    minIndex = i
    for (let j = i + 1; j < len; j++){
      if (arr[j] < arr[minIndex]) { // 比对最小值
        minIndex = j                // 将最小数的索引保存
      }
    }
    temp = arr[i]
    arr[i] = arr[minIndex]
    arr[minIndex] = temp
  }
  return arr
}

function select(arr) {
  let minIndex, template
  for (let i = 0; i < arr.length - 1; i++){
    minIndex = i
    for (let j = i + 1; j < arr.length; j++){
      if (arr[j] < arr[minIndex]) {
        minIndex =j
      }
    }
    temp = arr[i]
    arr[i] = arr[minIndex]
    arr[minIndex]=  temp
  }
  return arr
}

const arr = [87, 63, 54, 3, 43, 23, 2, 5, 6, 4]

console.log(select(arr));