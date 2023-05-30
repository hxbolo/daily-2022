function aaa () {
  var arr = ["-1Z", "-3Z", "-4Z", ];
  // var arr = ["Jack", "Book", "Fung", 76, "Love", "Mark", "中国", "china", "phone", "刘德华"];
  // console.log('原数组');
  // console.log(arr);
  // console.log('for方法从小到大排序');
  // console.log(arrSortMinToMax(arr));
  // console.log('for方法从大到小排序');
  // console.log(arrSortMaxToMin(arr));
  // console.log('原数组');
  // console.log(arr);

  let b = arr.sort((a,b) =>  b.localeCompare(a, ) )
 
  console.log(b);
}

aaa()
function arrMinNum(arr) {
  var minNum = Infinity, index = -1, minVul = "";
  for (var i = 0; i < arr.length; i++) {
    if (typeof (arr[i]) == "string") {
      if (arr[i].charCodeAt() < minNum) {
        minNum = arr[i].charCodeAt();
        minVul = arr[i];
        index = i;
      }
    } else {
      if (arr[i] < minNum) {
        minNum = arr[i];
        minVul = arr[i]
        index = i;
      }
    }
  };
  return { "minNum": minVul, "index": index };
}
function arrSortMinToMax(arr) {
  var arrNew = [];
  var arrOld = arr.concat();
  for (var i = 0; i < arr.length; i++) {
    arrNew.push(arrMinNum(arrOld).minNum);
    arrOld.splice(arrMinNum(arrOld).index, 1)
  };
  return (arrNew);
}
function arrMaxNum(arr) {
  var maxNum = -Infinity, index = -1, maxVul = "";
  for (var i = 0; i < arr.length; i++) {
    if (typeof (arr[i]) == "string") {
      if (arr[i].charCodeAt() > maxNum) {
        maxNum = arr[i].charCodeAt();
        maxVul = arr[i];
        index = i;
      }
    } else {
      if (arr[i] > maxNum) {
        maxNum = arr[i];
        maxVul = arr[i];
        index = i;
      }
    }
  };
  return { "maxNum": maxVul, "index": index };
}
function arrSortMaxToMin(arr) {
  var arrNew = [];
  var arrOld = arr.slice(0);
  for (var i = 0; i < arr.length; i++) {
    arrNew.push(arrMaxNum(arrOld).maxNum);
    arrOld.splice(arrMaxNum(arrOld).index, 1);
  };
  return (arrNew);
}