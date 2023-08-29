import { render } from "./renderer"
import { createVNode } from "./vnode"

export function createApp(rootComponent){
  return {
    mount(rootContainer){
      // 先 vnode
      // componet -> vnode
      // 所有的逻辑都会基于虚拟节点 做处理
      const vnode = createVNode(rootComponent)

      render(vnode, rootContainer)
    }
  }
}

