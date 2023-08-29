import { isObject } from './../shared/index'
import { creatComponentInstance, setupComponent } from './component'

export function render(vnode, container) {
  // patch
  patch(vnode, container)
}

function patch(vnode, container) {
  // 处理组件
  // 判断vnode 是不是一个element
  // 是element处理 element
  if (typeof vnode.type === 'string') {
    processElement(vnode, container)
  } else if (isObject(vnode.type)) {
    //组件 object
    processComponent(vnode, container)
  }
}

function processElement(vnode: any, container: any) {
  // 初始话
  mountElement(vnode, container)
  // 更新
}

function mountElement(vnode: any, container: any) {
  // vnode =》 属于 element  -> div
  const el = (vnode.el = document.createElement(vnode.type))

  // string array
  const { children } = vnode

  if (typeof children === 'string') {
    el.textContent = children
  } else if (Array.isArray(children)) {
    mountChildren(vnode, el)
  }

  // props
  const { props } = vnode
  console.log(vnode)

  for (const key in props) {
    const val = props[key]
    el.setAttribute(key, val)
  }
  container.append(el)
}

function mountChildren(vnode, el) {
  vnode.children.forEach((v) => {
    patch(v, el)
  })
}

function processComponent(vnode: any, container: any) {
  // 挂载组件
  mountComponent(vnode, container)
}

function mountComponent(initialVNode: any, container) {
  //创建组件实例
  const instance = creatComponentInstance(initialVNode)

  setupComponent(instance)
  setupRenderEffect(instance, initialVNode, container)
}

function setupRenderEffect(instance, initialVNode, container) {
  const { proxy } = instance

  // 虚拟节点树
  const subTree = instance.render.call(proxy)
  // vnode -> patch
  // vnode -> element -> mounElement
  patch(subTree, container)

  // element => mount
  // // 把 root element 赋值给 组件的vnode.el ，为后续调用 $el 的时候获取值ƒ
  initialVNode.el = subTree.el
}
