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
  const el = document.createElement(vnode.type)

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
  patch(subTree, container)
}
