// 基本数据类型
// number . string. boolean . null, undefined, Symbol, 
let a = {}
function new_instance_of(leftVaule, rightVaule) { 
  let rightProto = rightVaule.prototype; // 取右表达式的 prototype 值
  leftVaule = leftVaule.__proto__; // 取左表达式的__proto__值
  console.log(leftVaule,'leftVaule',rightProto);
  while (true) {
    if (leftVaule === null) {
          return false;	
      }
      if (leftVaule === rightProto) {
          return true;	
      } 
      leftVaule = leftVaule.__proto__ 
  }
}


function newInstanceOf (left, right){
  let rightProto = right.prototype
  left =  left.__proto__
  while(true){
    if(left === null){
      return false
    }
    if(left === rightProto){
      return true
    }
    left = left.__proto__
  }
}
console.log( newInstanceOf([], Object));



// console.log(typeof a);
// console.log(Object.prototype.toString.call(a));