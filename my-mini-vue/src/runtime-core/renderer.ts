import { creatComponentInstance, setupComponent } from './component'

export function render(vnode, container) {
  // patch
  patch(vnode, container)
}

function patch(vnode, container) {
  // 处理组件
  // 判断vnode 是不是一个element
  // 是element处理 element
  // processElement()
  processComponent(vnode, container)
}

function processComponent(vnode: any, container: any) {
  // 挂载组件
  mountComponent(vnode, container)
}

function mountComponent(vnode: any, container) {
  //创建组件实例
  const instance = creatComponentInstance(vnode)

  setupComponent(instance)
  setupRenderEffect(instance, container)
}

function setupRenderEffect(instance, container) {
  // 虚拟节点树
  const subTree = instance.render()
  // vnode -> patch
  // vnode -> element -> mounElement
  patch(subTree, container )
}
