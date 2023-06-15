// [1, 2, 3, 4, 5, 6, 7, 8, 9] => [[1, 2, 3],[4, 5, 6],[7, 8, 9]]，把一个一维数组变成三个三个的二维数组

function convertTo2DArray(arr, chunkSize) {
  let a = []
  for(let i=0; i< arr.length; i += chunkSize){
    a.push(arr.slice(i, i+chunkSize))
  }
  return a
}
console.log(convertTo2DArray([1, 2, 3, 4, 5, 6, 7, 8, 9],3));