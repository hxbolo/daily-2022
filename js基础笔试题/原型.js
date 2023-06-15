function Person(name, age){ 
  this.name = name;
  this.age = age;
}

Person.prototype.motherland = 'China'

let person01 = new Person('小明', 18)

Person.prototype.constructor == Person // **准则1：原型对象（即Person.prototype）的constructor指向构造函数本身**
 person01.__proto__ == Person.prototype // **准则2：实例（即person01）的__proto__和原型对象指向同一个地方**

 console.log(Person.prototype.constructor == Person);
 console.log(person01.__proto__ == Person.prototype);