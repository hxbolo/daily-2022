class Deque {
  constructor() {
    this.queue = []
    this.count = 0
    this.head = 0
  }
  // 队首添加
  addFront(item) {
    this.queue[--this.head] = item
  }
  // 队尾添加
  addBack(item) {
    this.queue[this.count++] = item;
  }
  // 对首删除
  reomoveFrot() {
    if (this.isEmpty()) return
    const headData = this.queue[this.head]
    delete this.queue[this.head++]
    return headData
  }

  // 队尾删除
  reomoveBack() {
    if (this.isEmpty()) return
    const backData = this.queue[this.count - 1]
    delete this.queue[--this.count]

    return backData
  }
  isEmpty() {
    return this.size() == 0
  }
  // 获取对首的值
  frontTop() {
    if (this.isEmpty()) return
    return this.queue[this.head]
  }
  // 获取队尾的值
  backTop() {
    if (this.isEmpty()) return
    console.log(this.queue, this.count)
    return this.queue[this.count]
  }
  top() {
    if (this.isEmpty()) {
      return
    }
    return this.queue[0]
  }
  size() {
    return this.count - this.head
  }
  clear() {
    this.queue = []
    this.count = 0
  }
}

const s = new Deque()
// s.addFront('a')
// s.addFront('b')
// s.addFront('c')
