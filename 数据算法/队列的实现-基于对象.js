class Queue {
  constructor() {
    this.queue = {}
    this.count = 0
    this.head = 0
  }
  // 入栈方法
  enQueue(item) {
    this.queue[this.count++] = item
  }
  // 出栈
  deQueue() {
    if(this.isEmpty()){
      return
    }
    const headData = this.queue[this.head]
    
    delete this.queue[this.head]
    this.head++
    this.count--
    return headData
  }
  isEmpty() {
    return this.count == 0
  }
  top(){
    return this.queue[this.head]
  }
  clear(){
    this.count= 0
    this.head = 0
    this.queue = {}
  }
}


const s= new Queue()

s.enQueue('a')
s.enQueue('b')
s.enQueue('c')
s.enQueue('d')