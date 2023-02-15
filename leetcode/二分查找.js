Array.prototype.binarySearch = function (item){
  if(!this.length) return -1;
  //注意：二分搜索必须在有序数组中进行
  this.sort((a, b)=> a-b);
  let start = 0, end = this.length - 1;
  console.log(start, end);
  while(start <= end){
    let mid = Math.floor((start + end) / 2);
    console.log(mid);
    let result = this[mid];
    console.log(result);
      if(item > result){
          start = mid+1;
      }else if(item < result){
          end = mid-1;
      }else{
          return mid;
      }
  }
  return -1;
}
var arr = [1, 3, 43, 54, 64, 74, 474, 833, 853, 864, 954]

console.log(

  arr.binarySearch(64)
);