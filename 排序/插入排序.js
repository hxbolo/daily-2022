function insertionSort(arr) {
  var len = arr.length;
  var preIndex, current;
  for (var i = 1; i < len; i++) {
    preIndex = i - 1;
    current = arr[i];
    console.log('===', preIndex, current, arr[preIndex]);
    while (preIndex >= 0 && arr[preIndex] > current) {
      arr[preIndex + 1] = arr[preIndex];
      preIndex--;
    }
    arr[preIndex + 1] = current;
  }
  return arr;
}

function insertionSort1(arr) {
  let preIndex, current
  for (let i = 1; i < arr.length; i++) {
    preIndex = i - 1
    current = arr[i]
    while (preIndex >= 0 && arr[preIndex] > current) {
      arr[preIndex + 1] = arr[preIndex]
      console.log(preIndex, '===', arr[preIndex + 1]);
      preIndex--
    }
    arr[preIndex + 1] = current
  }
  return arr
}


function insertionSort2(arr){
  let preIndex, current
  for(let i= 1; i< arr.length; i++){
    preIndex = i-1; 
    current = arr[i]
    // 前面一个值 > 当前的值
    while(preIndex >= 0 && arr[preIndex] > current){
      arr[preIndex + 1] = arr[preIndex]
      preIndex--
    }
    arr[preIndex+ 1] = current
  }
  return arr
}

const arr = [87, 63, 54, 3, 43, 23, 2, 5, 6, 4]

console.log(insertionSort2(arr));