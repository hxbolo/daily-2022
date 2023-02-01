Array.prototype.myreduce = function (cb,initialValue ) {
  const arr = this;
  let total = initialValue || arr[0];
  // 有初始值的话从0遍历，否则从1遍历
  for (let i = initialValue ? 0 : 1; i < arr.length; i++) {

    total = cb(total, arr[i], i, arr);
  }
  return total;
};


let a = [12, 4, 5]

let b = a.myreduce((pre, cur) => {
  return pre += cur
}, 0)
console.log(b);