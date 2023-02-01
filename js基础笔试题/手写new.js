// new : 
// 创建一个空对象
// 这个对象构造函数指向prototype
// 执行构造函数
// 返回这个对象


function mynew() {
  let obj = {}
  let Con = [].shift.call(arguments)
  obj.__proto__ = Con.prototype
  
  let res = Con.apply(obj, arguments)
  return res instanceof Object ? res : res
  
}