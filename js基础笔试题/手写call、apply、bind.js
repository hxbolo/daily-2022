// call ： 改变this指向， 后面参数一个个传输

Function.prototype.myCall = function (context, ...argument) {
  context.fn = this
  console.log(argument);
  let res = context.fn(...argument)
  delete context.fn
  return res
}

// function add (x,y){
//   //通过my_call第一个参数 改变了this的指向， 
//   console.log(this); // { a: 1, fn: [Function: add] }
//   return this.a + x + y
// }
// let obj = {a:1}
// console.log(add.myCall(obj, 1, 3));


Function.prototype.Mycall = function (context,...arg) {
  context.fn = this
  let res = context.fn(...arg)
  delete context.fn
  return res
}

// ========================================


// apply ： 改变this指向，第二个参数是一个数组

Function.prototype.myApplay = function (context) {
  context.fn = this
  let arg = [...arguments].splice(1)[0]

  if(!Array.isArray(arg)) {
    throw new Error('apply的第二个参数必须是数组') 
  }  
  let res = context.fn(arg)
  console.log(context.fn,'res');
  delete context.fn
  return res
}

function add (arr){
  console.log(this.a, arr); 

}
let obj = {a:1}
add.myApplay(obj, [1, 2, 3])



// ====================================
Function.prototype.myBind = function (context) {
  // 判断调用对象是否为函数
  if (typeof this !== "function") {
    throw new Error("Type error");
  }
  // 获取参数
  const args = [...arguments].slice(1),
  const fn = this;
  return function Fn() {
    return fn.apply(
      this instanceof Fn ? this : context,
      // 当前的这个 arguments 是指 Fn 的参数
      args.concat(...arguments)
    );
  };
};
