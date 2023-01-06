### var let const
- var 变量可以提升
- let 块级作用域
- const 恒量声明过后不允许重新赋值， 恒量要求声明同时赋值， 恒量只是要求内层指向不允许被修改

### 数组解构

```js
const arr = [1, 2, 3]
const [ b, ...c] = arr
console.log(c);
```

### 对象解构

```js
const { log } = console
log('foo')
log('bar')
log('123')
```

###  函数参数的默认值
```js
// 默认参数一定是在形参列表的最后
function foo (enable = true) {
  console.log('foo invoked - enable: ')
  console.log(enable)
}

foo(false)
```
### 模板字符串
### 箭头函数
  - 箭头函数不会改变this的指向

### 对象字面量
```js
const obj = {
  foo: 123,
  // bar: bar
  // 属性名与变量名相同，可以省略 : bar
  bar,
  // method1: function () {
  //   console.log('method111')
  // }
  // 方法可以省略 : function
  method1 () {
    console.log('method111')
    // 这种方法就是普通的函数，同样影响 this 指向。
    console.log(this)
  },
  // Math.random(): 123 // 不允许
  // 通过 [] 让表达式的结果作为属性名
  [bar]: 123
}

// obj[Math.random()] = 123

console.log(obj)
obj.method1()
```

### Object.assign

```js
const obj = { a: 1, b: 2, c: 3 }
let newobj = Object.assign({},obj)
console.log(newobj);
```

### Object.is

###  Proxy
```js
const personProxy = new Proxy(person, {
  // 监视属性读取
  get(target, property) {
   
  },
  // 监视属性设置
  set(target, property, value) {
   
  }
})
```
-  Proxy 对比 Object.defineProperty() 
 1. 优势1：Proxy 可以监视读写以外的操作 
 ```js
 const personProxy = new Proxy(person, {
  deleteProperty(target, proprety) {
    console.log('delete', proprety)
    delete target[proprety]
  }
})

delete personProxy.age

console.log(person);
 ```
 - proxy 如何对数组进行监视
 ```js
  const list = []
  const listProxy = new Proxy(list, {
    set(target, proprety, value) {
      target[proprety] =  value
      return true
    }
  })

  listProxy.push(100)
  listProxy.push(1002)

  console.log(list);
 ```
 - 以非侵入的方式来监管了对象的读写

 ```js
 const person = {}
Object.defineProperty(person, 'name', {
  get() {
    return person._name
  },
  set(value) {
    person._name = value
  }
})
person.name = 'aaaa'
console.log(person);


// proxy
const person2 = {
  name: 'hx',
  age: 20
}
const personProxy = new Proxy(person2, {
  get (target, property) {
    console.log('get', property)
    return target[property]
  },
  set (target, property, value) {
    console.log('set', property, value)
    target[property] = value
  }
})

personProxy.name = 'jack'

console.log(personProxy.name)
 ```


### Reflect 对象
 统一了对象的方式 
 ```js
 // console.log('name' in obj)
// console.log(delete obj['age'])
// console.log(Object.keys(obj))

console.log(Reflect.has(obj, 'name'))
console.log(Reflect.deleteProperty(obj, 'age'))
console.log(Reflect.ownKeys(obj))
 ```

 ### set 数据结构
 set 内部成员只能是唯一的

 ```js
// 去重 
const arr =[1,3,3,4,43,3]
// const res = Array.from(new Set(arr))
const res =[...new Set(arr)]
console.log(res);
 ```

 ### Map数据结构
 ```js

const m  = new Map()
const tom = { name: 'tom' }
m.set(tom, 90)
console.log(m);

m.forEach((v, key) => {
  console.log(v,key);
})
 ```
