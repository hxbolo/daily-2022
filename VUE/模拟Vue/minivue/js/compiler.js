// 负责解析指令。差值表达式
class Compiler {
  constructor (vm) {
    this.el = vm.$el
    this.vm = vm
    this.compile(this.el)
  }
  // 编译模板，处理文本节点和元素节点
  compile(el) {
    let childNodes = el.childNodes
    // console.log(childNodes,'childNodes');
    Array.from(childNodes).forEach(node => {
      // 判断文本节点
      if (this.isTextNode(node)) {
        this.compileText(node)
      } else if (this.isElementNode(node)) {
        // 处理元素节点
        this.compileElement(node)
      }

      // 判断node节点， 是否有子节点， 如果有子节点， 要递归调用compile
      if (node.childNodes && node.childNodes.length) {
        this.compile(node)
      }
    })
  }
  // 编译元素节点，处理指令
  compileElement(node) {
    // 遍历所有的属性节点
    Array.from(node.attributes).forEach(attr => {
      // 判断是否指令
      let attrName = attr.name
      if (this.isDirective(attrName)) {
          // attrName 的形式 v-text  v-model
        attrName = attrName.substr(2)
        let key = attr.value
        this.update( node, key, attrName)
        
      }
    })
    
  }

  update(node, key, attrName) {
    let updatFn = this[attrName + 'Updater']
    updatFn && updatFn.call(this, node, this.vm[key],key)
  }

  // 处理v-text指令
  textUpdater(node, value,key) {
    node.textContent = value
     // 创建watcher 对象,当数据改变更新视图
    new Watcher(this.vm, key, (newValue) => {
      node.textContent = newValue
    })
  }
  // 处理v-model指令
  // node 表单元素
  modelUpdater(node, value,key) {
    node.value = value
     // 创建watcher 对象,当数据改变更新视图
    new Watcher(this.vm, key, (newValue) => {
      node.value = newValue
    })

    // 双向绑定
    node.addEventListener('input', () => {
      this.vm[key] = node.value
    })
  }

  // 编译文本节点，处理差值表达式
  compileText(node) {
    console.dir(node)
    // 匹配差值表达式
    let reg = /\{\{(.+?)\}\}/
    let value = node.textContent
    if (reg.test(value)) {
      // 插值表达式中的值就是我们要的属性名称
      let key = RegExp.$1.trim()
      // 把差值表达式替换成具体的值
      node.textContent = value.replace(reg, this.vm[key])
      
      // 创建watcher 对象,当数据改变更新视图
      new Watcher(this.vm, key, (newValue) => {
        node.textContent = newValue
      })
    }
  }
  // 判断元素属性是否是指令
  isDirective(attrName) {
    return attrName.startsWith('v-')
  }
  // 判断节点是否是文本节点
  isTextNode(node) {
    return node.nodeType === 3
  }
  // 判断节点是否是元素节点
  isElementNode(node) {
    return node.nodeType === 1
  }
}