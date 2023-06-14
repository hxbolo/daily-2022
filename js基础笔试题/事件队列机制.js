// 实现一个LazyMan，可以按照以下方式调用:
// LazyMan("Hank")输出:
// Hi! This is Hank!

const { log } = require("console")

 
// LazyMan("Hank").sleep(10).eat("dinner")输出
// Hi! This is Hank!
// //等待10秒..
// Wake up after 10
// Eat dinner~
 
// LazyMan("Hank").eat("dinner").eat("supper")输出
// Hi This is Hank!
// Eat dinner~
// Eat supper~
 
// LazyMan("Hank").sleepFirst(5).eat("supper")输出
// //等待5秒
// Wake up after 5
// Hi This is Hank!
// Eat supper

class Lazy {
  constructor(name) {
    this.name = name
    // 任务列表
    this.taskList = []
    // 将输出名称推入任务列表
    this.taskList.push(this.sayName)
    this.do()
  }
  do () {
    // 每一个任务通过setTimeout执行，这样就让sleepFirst在执行前做操作
    setTimeout(() => {
      let fn = this.taskList.shift()
      fn && fn.call(this)
    }, 0)
  }
  sayName () {
    console.log(this)
    console.log(`Hi! This is ${this.name}!`)
    this.do()
  }
  sleep (time) {
    // 插入一个睡眠任务
    this.taskList.push(() => {
      setTimeout(() => {
        console.log(`Wake up after ${time}`)
        this.do()
      }, time)
    })
    return this
  }
  sleepFirst (time) {
    // 将提前睡眠任务插入任务列表首位
    this.taskList.unshift(() => {
      setTimeout(() => {
        console.log(`Wake up after ${time}`)
        this.do()
      }, time)
    })
    return this
  }
  eat (thing) {
    this.taskList.push(() => {
      console.log(`Eat ${thing}`)
      this.do()
    })
    return this
  }
}

class Lazy1{
  constructor(name){
    this.name =  name
    this.taskList = []
    this.taskList.push(this.sayName)
    console.log(this.taskList,111);
    this.do()
  }
  do(){
    setTimeout(() =>{
      let fn = this.taskList.shift()
      fn && fn.call(this)
    }, 0)
  }
  sayName(){
    console.log(this.name,'名字');
    this.do()
  }
  sleep(time){
    this.taskList.push(() =>{
      setTimeout(() => {
        console.log('时间',time);
        this.do()
      }, time);
    })
    return this
  }
  eat(thing){
    this.taskList.push(() =>{
        console.log('吃饭',thing);
      this.do()
    })
    return this
  }
  sleepFirst(time){
    this.taskList.unshift(() =>{
      setTimeout(() => {
        console.log('sleepFirst',time);
        this.do()
      }, time)
    })
    return this
  }
}
function LazyMan (name) {
  return new Lazy1(name)
}


// LazyMan("Hank")

// LazyMan("Hank").sleep(3000).eat("dinner")
// LazyMan("Hank").sleep(3000).eat("dinner")


// LazyMan("Hank").eat("dinner").eat("supper")

LazyMan("Hank").sleepFirst(3000).eat("supper")

