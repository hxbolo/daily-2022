import { ShapeFlags } from '../shared/ShapeFlags'
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
  const { shapeFlag } = vnode
  if (shapeFlag & ShapeFlags.ELEMENT) {
    processElement(vnode, container)
  } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
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
  const { children, shapeFlag } = vnode

  if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
    // text_children
    el.textContent = children
  } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
    // array_children
    mountChildren(vnode, el)
  }

  // props
  const { props } = vnode
  console.log(vnode)

  for (const key in props) {
    console.log(key)

    const val = props[key]
    // 点击事件具体click => 通用
    // 命名规划 on+ Event name
    const isOn = (key: string) => /^on[A-Z]/.test(key)
    if (isOn(key)) {
      const event = key.slice(2).toLocaleLowerCase()
      el.addEventListener(event, val)
    }

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
