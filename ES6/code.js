// // const { log } = require("console")

// // const arr = [1, 2, 3]
// // const [ b, ...c] = arr
// // console.log(c);

// // 对象解构
// const { log } = console
// log('foo')
// log('bar')
// log('123')

// // Object.assign 方法


// // const obj = { a: 1, b: 2, c: 3 }

// // let newobj = Object.assign({},obj)
// // console.log(newobj);


// // Object.is

// console.log(Object.is(0, ''));


// proxy

// const person = {
//   name: 'zce',
//   age: 20
// }

// const personProxy = new Proxy(person, {
//   // 监视属性读取
//   get(target, property) {
//     console.log(target, property);
    
//     return property in target ?target[property] : 'default'
//   },
//   // 监视属性设置
//   set(target, property, value) {
//     console.log(target, property, value);
//     if (value ==='age') {
//       if (!Number.isInteger(value)) {
//         throw new TypeError(`${value} is not an int`)
//       }
//     }

//     target[property] =  value
//   }
// })

// personProxy.age =  11

// console.log(personProxy.name)
// console.log(personProxy)


// const person = {
//   name: 'zce',
//   age: 20
// }

// const personProxy = new Proxy(person, {
//   deleteProperty(target, proprety) {
//     console.log('delete', proprety)
//     delete target[proprety]
//   }
// })

// delete personProxy.age

// console.log(person);

// 优势2：Proxy 可以很方便的监视数组操作 
// const list = []
// const listProxy = new Proxy(list, {
//   set(target, proprety, value) {
//     target[proprety] =  value
//     return true
//   }
// })

// listProxy.push(100)
// listProxy.push(1002)

// console.log(list);

// 优势3：Proxy 不需要侵入对象 
// const person = {}
// Object.defineProperty(person, 'name', {
//   get() {
//     return person._name
//   },
//   set(value) {
//     person._name = value
//   }
// })
// person.name = 'aaaa'
// console.log(person);


// // proxy
// const person2 = {
//   name: 'hx',
//   age: 20
// }
// const personProxy = new Proxy(person2, {
//   get (target, property) {
//     console.log('get', property)
//     return target[property]
//   },
//   set (target, property, value) {
//     console.log('set', property, value)
//     target[property] = value
//   }
// })

// personProxy.name = 'jack'

// console.log(personProxy.name)


// Reflect 对象
// const obj = {
//   foo: '123',
//   bar: '456'
// }

// console.log(Reflect.has(obj,'name'));
// console.log(Reflect.ownKeys(obj,));

// ====================
// set

// const s = new Set()
// s.add(1).add(2)
// console.log(s);

// // 去重 

// const arr =[1,3,3,4,43,3]
// // const res = Array.from(new Set(arr))
// const res =[...new Set(arr)]
// console.log(res);

// ============
// Map 数据结构

// const m  = new Map()
// const tom = { name: 'tom' }
// m.set(tom, 90)
// console.log(m);

// m.forEach((v, key) => {
//   console.log(v,key);
// })


// // for...of 循环
// 任意方式的遍历
// const arr = [100, 200, 300, 400]
// // 可以使用 break 终止遍历
// for (const item of arr) {
//   if (item > 300) {
//     break
//   }
//   console.log(item,);
// }

// 遍历 Map 可以配合数组结构语法，直接获取键值
const m = new Map()
m.set('foo', '123')
m.set('bar', '345')

for (const [key, value] of m) {
  console.log(key,value);
}
