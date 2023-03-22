// 题目： 输入一组版本号，输出从大到小的排序
// 输入： ['2.1.0.1', '0.402.1', '10.2.1', '5.1.2', '1.0.4.5']
// 输出： ['10.2.1', '5.1.2', '2.1.0.1', '1.0.4.5', '0.402.1']
let arr =  ['2.1.0.1', '0.402.1', '10.2.1', '5.1.2', '1.0.4.5']
function versionSort(arr) { 
return arr.sort((a, b) => {
    // console.log('a =>',a);
    // console.log('b =>', b);
    let i = 0;
    const arr1 = a.split(".");
    const arr2 = b.split(".");
    console.log(arr1, arr2);
    while (true) {
      const s1 = arr1[i]
      const s2 = arr2[i]
      i++
      if (s1 === undefined || s2 === undefined) {
        return arr2.length - arr1.length;
      }
      if (s1 === s2) continue
      return s2-s1
      
    }
  })
}

let a = versionSort(arr);
console.log('===>a',a);