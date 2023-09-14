import { createVNode } from "./vnode"


export function createAppAPI(render){

  return function createApp(rootComponent){
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
}

