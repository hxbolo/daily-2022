function quicksort(arr) {
  if (arr.length <= 1) {
    return arr
  }
  var pivotIndex = Math.floor(arr.length / 2)
  // 选择"基准"（pivot）
  var pivot = arr.splice(pivotIndex, 1)[0]
  var left = []
  var right = []
  // 小于"基准"的元素放入左边的子集，大于基准的元素放入右边的子集
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return quicksort(left).concat([pivot], quicksort(right))
}



function quicksort1(arr) {
  // 找基准
  if (arr.length <= 1) {
    return arr
  }
  var pivotIndex = Math.floor(arr.length / 2)
  var pivot = arr.splice(pivotIndex, 1)[0]
  var left = []
  var right = []
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return quicksort(left).concat([pivot], quicksort(right))
}


function quicksort2(arr) {
  if (arr.length <= 1) return arr
  // 找基准
  var pivotIndex = Math.floor(arr.length / 2)
  var provide = arr.splice(pivotIndex, 1)[0]
  var left = []
  var reight = []
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < provide) {
      left.push(arr[i])
    } else {
      reight.push(arr[i])
    }
  }
  return quicksort2(left).concat([provide], quicksort2(reight))

}


function quicksort3(arr) {
  if (arr.length <= 1) return arr
  // 找基准
  let provieIndex = Math.floor(arr.length / 2)
  let provie = arr.splice(provieIndex, 1)[0]
  let left = []
  let right = []
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < provie) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }

  return quicksort3(left).concat([provie], quicksort3(right))
}

function quicksort4(arr) {
  if (arr.length <= 1) return arr
  // 找基准下标
  let provideIndex = Math.floor(arr.length / 2)
  // 找基准下的值
  let provide = arr[provideIndex]
  let left = []
  let right = []
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < provide) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return quicksort4(left).concat([provide], quicksort4(right))
}
function quicksort4(arr) {
  if (arr.length <= 1) return arr
  // 找基准下标
  let provideIndex = Math.floor(arr.length / 2)
  // 找基准下的值
  let provide = arr.splice(provideIndex, 1)[0]
  let left = []
  let right = []
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < provide) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return quicksort4(left).concat([provide], quicksort4(right))
}

const arr = [87, 63, 54, 3, 43, 23, 2, 5, 6, 4]

console.log(quicksort4(arr));