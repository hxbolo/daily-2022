class Queue {
  constructor() {
    this.queue = []
    this.count = 0
  }
  // 入队方法
  enQueue(item) {
    this.queue[this.count++] = item
  }
  // 出栈
  deQueue() {
    if (this.isEmpty()) {
      return
    }
    // delete this.queue[0]
    this.count--
    return this.queue.shift()
  }

  isEmpty() {
    return this.count === 0
  }
  top() {
    if (this.isEmpty()) {
      return
    }
    return this.queue[0]
  }
  size(){
    return this.count
  }
  clear(){
    this.queue = []
    this.count = 0
  }
}

const s = new Queue()
s.enQueue('a')
s.enQueue('b')
s.enQueue('c')
