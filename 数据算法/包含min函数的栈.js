// // 定义栈的数据结构，请在该类型中实现一个能够得到栈的最小元素的 min 函数在该栈中，调用 min、push 及 pop 的时间复杂度都是 O(1)。

// MinStack minStack = new MinStack();
// minStack.push(-2);
// minStack.push(0);
// minStack.push(-3);
// minStack.min();   --> 返回 -3.
// minStack.pop();
// minStack.top();      --> 返回 0.
// minStack.min();   --> 返回 -2.

class MinStack {
  constructor() {
    this.stackA = []
    this.countA = 0
    this.stackB = []
    this.countB = 0
  }
  // PUSH
  push(item) {
    this.stackA[this.countA++] = item
    // 初始化 |  B 栈顶的值比item 的值大
    if (this.countB === 0 || this.min() >= item) {
      this.stackB[this.countB++] = item
    }
  }
  // POP 
  pop(){
    // stackA 都要出， B 是只有A和B的值相同才出栈
    if(this.top() === this.min()){
      delete this.stackB[--this.countB]
    }
    delete this.stackA[--this.countA]

  }

  // TOP
  top(){
    return this.stackA[this.countA - 1]
  }
  // min
  min() {
    return this.stackB[this.countB - 1]
  }
}

const s = new MinStack()
s.push(1)
s.push(2)
s.push(3)
s.push(1)
