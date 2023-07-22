class Stack {
  constructor() {
    // 存储栈的数据
    this.data = {}
    this.count = 0
  }
  // push  入栈方法
  push(item) {
    // 方式1: 数组方法push 添加
    // this.data.push(item)

    // 方法2: 利用数组长度
    // this.data[this,data.length] =  item

    // 推荐   方式3： 计数方式
    this.data[this.count] = item
    // 入栈后count 自增
    this.count++
    console.log(this.data, this.count)
  }
  // pop 出栈
  pop() {
    // 出栈的前提是栈中存在元素，先检查
    if (this.isEmpty()) {
      console.log('栈为空')
      return
    }
    // 移除栈顶数据
    // 方式1： 数组方式pop 移除
    // return this.data.pop()

    // 方式2： 计数方式
    const temp = this.data[this.count - 1]
    delete this.data[--this.count]
    return temp
  }
  isEmpty() {
    return this.count === 0
  }
  // top()获取栈顶值
  top() {
    if (this.isEmpty()) {
      console.log('栈为空')
      return
    }
    return this.data[this.count - 1]
  }
  // size 获取元素个数
  size() {
    return this.count
  }
  // clear() 清空
  clear() {
    this.data = []
    this.count = 0
  }
}

const s = new Stack()
s.push('a')
s.push('b')
s.push('c')
