import { ShapeFlags } from '../shared/ShapeFlags'
import { creatComponentInstance, setupComponent } from './component'
import { Fragment, Text } from './vnode'
import { createAppAPI } from './createApp';

export function createRenderer(options){
  const {
    createElement,
    patchProp,
    insert
  } = options


function render(vnode, container) {
  // patch
  patch(vnode, container, null)
}

function patch(vnode, container, parentComponent) {
  // 处理组件
  // 判断vnode 是不是一个element
  // 是element处理 element
  const { type, shapeFlag } = vnode

  // fragment => 只渲染 children
  switch (type) {
    case Fragment:
      processFragment(vnode, container, parentComponent)
      break
    case Text:
      processText(vnode, container)
      break
    default:
      if (shapeFlag & ShapeFlags.ELEMENT) {
        processElement(vnode, container, parentComponent)
      } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
        //组件 object
        processComponent(vnode, container, parentComponent)
      }
      break
  }
}

function processFragment(vnode: any, container: any, parentComponent) {
  // 渲染children
  mountChildren(vnode, container, parentComponent)
}
function processText(vnode: any, container: any) {
  const { children } = vnode
  console.log('children', children)

  const textNode = (vnode.el = document.createTextNode(children))

  console.log('textNode', textNode)

  container.append(textNode)
}

function processElement(vnode: any, container: any, parentComponent) {
  // 初始话
  mountElement(vnode, container, parentComponent)
  // 更新
}

function mountElement(vnode: any, container: any, parentComponent) {
  // canvas
  // new  Element()
  // vnode =》 属于 element  -> div
  const el = (vnode.el = createElement(vnode.type))

  // string array
  const { children, shapeFlag } = vnode

  if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
    // text_children
    el.textContent = children
  } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
    // array_children
    mountChildren(vnode, el, parentComponent)
  }

  // props
  const { props } = vnode
  console.log(vnode)

  for (const key in props) {
    console.log(key)

    const val = props[key]
    // 点击事件具体click => 通用
    // 命名规划 on+ Event name
    // const isOn = (key: string) => /^on[A-Z]/.test(key)
    // if (isOn(key)) {
    //   const event = key.slice(2).toLocaleLowerCase()
    //   el.addEventListener(event, val)
    // }else{

    //   el.setAttribute(key, val)
    // }
    
    patchProp(el, key,val)
  }
  // container.append(el)

  insert(el, container)
}

function mountChildren(vnode, el, parentComponent) {
  vnode.children.forEach((v) => {
    patch(v, el, parentComponent)
  })
}

function processComponent(vnode: any, container: any, parentComponent) {
  // 挂载组件
  mountComponent(vnode, container, parentComponent)
}

function mountComponent(initialVNode: any, container, parentComponent) {
  //创建组件实例
  const instance = creatComponentInstance(initialVNode, parentComponent)

  setupComponent(instance)
  setupRenderEffect(instance, initialVNode, container)
}

function setupRenderEffect(instance, initialVNode, container) {
  const { proxy } = instance

  // 虚拟节点树
  const subTree = instance.render.call(proxy)
  // vnode -> patch
  // vnode -> element -> mounElement
  patch(subTree, container, instance)

  // element => mount
  // // 把 root element 赋值给 组件的vnode.el ，为后续调用 $el 的时候获取值ƒ
  initialVNode.el = subTree.el
}

return {
  createApp:createAppAPI(render)
}

}