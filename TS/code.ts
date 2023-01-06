import { title } from "process";

const arr: Array<number> = [1, 2, 3]
const arr1: number[] = [2,3,4]
console.log(arr,arr1);


// const obj: object = function () {} // [] // {}
// console.log(obj);

// 如果需要明确限制对象类型，则应该使用这种类型对象字面量的语法，或者是「接口」
const foo: { name: string, age: number } = { name: 'hx', age: 10 }

// 对象枚举
const Status = {
  a: 1,
  b: 2,
  c:3
}
// 数字枚举
const num = {
  a: 2,
  b,c
}


const enum StatusEnum{
  Status,
  num
}

const post = {
  aaa: StatusEnum.Status
}

function fun(a: number, b: number = 10, ...res: number[]): string{
  return '1'
}


fun(10, 10, 2,)

// 接口

interface Post{

  title: string
  content?: string
  readonly a:string
}
function p(post: Post) {
  post.title = 'hx'
  console.log(post);
  
}
p({ title: '1', content: '3', a: '3' })

// 泛型

function createNumberArray(length: number, value: number): number[]{
  const arr = Array<number>(length).fill(value)
  return arr
}
function createStringArray(length: number, value: string): string[]{
  const arr = Array<string>(length).fill(value)
  return arr
}


// 用泛型替代

function creatArr<T>(length: number, value: T):T[] {
  const arr = Array<T>(length).fill(value)
  return arr
}

creatArr<string>(3,'str')


export {} // 确保跟其它示例没有成员冲突