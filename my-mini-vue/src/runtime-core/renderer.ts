import { ShapeFlags } from '../shared/ShapeFlags'
import { creatComponentInstance, setupComponent } from './component'
import { Fragment, Text } from './vnode'
import { createAppAPI } from './createApp'
import { effect } from '../reactvity/effect'
import { EMPTY_OBJ } from '../shared'

export function createRenderer(options) {
  const {
    createElement: hostCreateElememt,
    patchProp: hostPatchProp,
    insert: hostInsert,
    remove: hostRemove,
    setElementText: hostSetElementText,
  } = options

  function render(vnode, container) {
    // patch
    patch(null, vnode, container, null)
  }

  // n1=> 老的
  // n2 => 新的
  function patch(n1, n2, container, parentComponent) {
    // 处理组件
    // 判断vnode 是不是一个element
    // 是element处理 element
    const { type, shapeFlag } = n2

    // fragment => 只渲染 children
    switch (type) {
      case Fragment:
        processFragment(n1, n2, container, parentComponent)
        break
      case Text:
        processText(n1, n2, container)
        break
      default:
        if (shapeFlag & ShapeFlags.ELEMENT) {
          processElement(n1, n2, container, parentComponent)
        } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
          //组件 object
          processComponent(n1, n2, container, parentComponent)
        }
        break
    }
  }

  function processFragment(n1, n2: any, container: any, parentComponent) {
    // 渲染children
    mountChildren(n2.children, container, parentComponent)
  }
  function processText(n1, n2: any, container: any) {
    const { children } = n2
    console.log('children', children)

    const textNode = (n2.el = document.createTextNode(children))

    console.log('textNode', textNode)

    container.append(textNode)
  }

  function processElement(n1, n2: any, container: any, parentComponent) {
    if (!n1) {
      // 初始话
      mountElement(n1, n2, container, parentComponent)
    } else {
      // 更新
      patchELement(n1, n2, container, parentComponent)
    }
  }

  function patchELement(n1, n2, container, parentComponent) {
    console.log('patchELement')
    console.log('n1', n1)
    console.log('n2', n2)

    const oldProps = n1.props || EMPTY_OBJ
    const newProps = n2.props || EMPTY_OBJ

    const el = (n2.el = n1.el)

    patchChildren(n1, n2, el, parentComponent)

    patchProps(el, oldProps, newProps)
  }

  function patchChildren(n1, n2, container, parentComponent) {
    const prevShapeFlag = n1.shapeFlag
    const { shapeFlag } = n2
    const c1 = n1.children
    const c2 = n2.children
    // 数组-> 文本
    // 判断是否是文本节点
    
    // 如果 n2 的 children 是 text 类型的话
    // 就看看和之前的 n1 的 children 是不是一样的
    // 如果不一样的话直接重新设置一下 text 即可
    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      // 数组-> 文本
      // taxt -> text
      if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        // 1.把老的清空
        unmountChildren(n1.children)
      }
      if (c2 !== c1) {
        // 2. 设置text
        hostSetElementText(container, c2)
      }
    } else {
      // 看看之前的是不是 text
      if (prevShapeFlag & ShapeFlags.TEXT_CHILDREN) {
        // 先清空
        // 然后在把新的 children 给 mount 生成 element
        hostSetElementText(container, '')
        mountChildren(c2, container, parentComponent)
      }
    }
  }

  function unmountChildren(children) {
    for (let i = 0; i < children.length; i++) {
      const el = children[i].el
      // remove
      hostRemove(el)
    }
  }

  function patchProps(el, oldProps, newProps) {
    if (oldProps !== newProps) {
      for (const key in newProps) {
        const prevProp = oldProps[key]
        const nextProp = newProps[key]

        if (prevProp !== nextProp) {
          hostPatchProp(el, key, prevProp, nextProp)
        }
      }

      if (oldProps !== EMPTY_OBJ) {
        for (const key in oldProps) {
          if (!(key in newProps)) {
            // 这里是以 oldProps 为基准来遍历，
            // 而且得到的值是 newProps 内没有的
            // 所以交给 host 更新的时候，把新的值设置为 null
            hostPatchProp(el, key, oldProps[key], null)
          }
        }
      }
    }
  }

  function mountElement(n1, n2: any, container: any, parentComponent) {
    // canvas
    // new  Element()
    // vnode =》 属于 element  -> div
    const el = (n2.el = hostCreateElememt(n2.type))

    // string array
    const { children, shapeFlag } = n2

    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      // text_children
      el.textContent = children
    } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
      // array_children
      mountChildren(n2.children, el, parentComponent)
    }

    // props
    const { props } = n2
    console.log(n2)

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

      hostPatchProp(el, key, null, val)
    }
    // container.append(el)

    hostInsert(el, container)
  }

  function mountChildren(children, el, parentComponent) {
    children.forEach((v) => {
      patch(null, v, el, parentComponent)
    })
  }

  function processComponent(n1, n2: any, container: any, parentComponent) {
    // 挂载组件
    mountComponent(n2, container, parentComponent)
  }

  function mountComponent(initialVNode: any, container, parentComponent) {
    //创建组件实例
    const instance = creatComponentInstance(initialVNode, parentComponent)

    setupComponent(instance)
    setupRenderEffect(instance, initialVNode, container)
  }

  function setupRenderEffect(instance, initialVNode, container) {
    effect(() => {
      // 第一次渲染初始化触发
      if (!instance.isMounted) {
        console.log('init-- 初始化')

        const { proxy } = instance

        // 虚拟节点树
        const subTree = (instance.subTree = instance.render.call(proxy))
        console.log('subTree', subTree)

        // vnode -> patch
        // vnode -> element -> mounElement
        patch(null, subTree, container, instance)

        // element => mount
        // // 把 root element 赋值给 组件的vnode.el ，为后续调用 $el 的时候获取值ƒ
        initialVNode.el = subTree.el

        instance.isMounted = true
      } else {
        // 更新触发
        console.log('update')
        const { proxy } = instance

        // 虚拟节点树
        const subTree = instance.render.call(proxy)
        const prevSubTree = instance.subTree
        instance.subTree = subTree
        console.log('subTree', subTree, prevSubTree)

        patch(prevSubTree, subTree, container, instance)
      }
    })
  }

  return {
    createApp: createAppAPI(render),
  }
}
