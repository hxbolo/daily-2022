import { ShapeFlags } from '../shared/ShapeFlags'
import { creatComponentInstance, setupComponent } from './component'
import { Fragment, Text } from './vnode'
import { createAppAPI } from './createApp'
import { effect } from '../reactvity/effect'
import { EMPTY_OBJ } from '../shared'
import { shouldUpdateComponent } from "./componentRenderUtils";
import { queueJob } from "./scheduler.js";

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
    patch(null, vnode, container, null, null)
  }

  // n1=> 老的
  // n2 => 新的
  function patch(n1, n2, container, parentComponent, anchor) {
    // 处理组件
    // 判断vnode 是不是一个element
    // 是element处理 element

    const { type, shapeFlag } = n2;

    // fragment => 只渲染 children
    switch (type) {
      case Fragment:
        processFragment(n1, n2, container, parentComponent, anchor)
        break
      case Text:
        processText(n1, n2, container)
        break
      default:
        if (shapeFlag & ShapeFlags.ELEMENT) {
          processElement(n1, n2, container, parentComponent, anchor)
        } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
          //组件 object
          processComponent(n1, n2, container, parentComponent, anchor)
        }
        break
    }
  }

  function processFragment(
    n1,
    n2: any,
    container: any,
    parentComponent,
    anchor
  ) {
    // 渲染children
    mountChildren(n2.children, container, parentComponent, anchor)
  }
  function processText(n1, n2: any, container: any) {
    const { children } = n2
    console.log('children', children)

    const textNode = (n2.el = document.createTextNode(children))

    console.log('textNode', textNode)

    container.append(textNode)
  }

  function processElement(
    n1,
    n2: any,
    container: any,
    parentComponent,
    anchor
  ) {
    if (!n1) {
      // 初始话
      mountElement(n1, n2, container, parentComponent, anchor)
    } else {
      // 更新
      patchELement(n1, n2, container, parentComponent, anchor)
    }
  }

  function patchELement(n1, n2, container, parentComponent, anchor) {
    console.log('patchELement')
    console.log('n1', n1)
    console.log('n2', n2)

    const oldProps = n1.props || EMPTY_OBJ
    const newProps = n2.props || EMPTY_OBJ

    const el = (n2.el = n1.el)

    patchChildren(n1, n2, el, parentComponent, anchor)

    patchProps(el, oldProps, newProps)
  }

  function patchChildren(n1, n2, container, parentComponent, anchor) {
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
        mountChildren(c2, container, parentComponent, anchor)
      } else {
        // array diff array
        // 如果之前是 array_children
        // 现在还是 array_children 的话
        // 那么我们就需要对比两个 children 啦
        patchKeyedChildren(c1, c2, container, parentComponent, anchor)
      }
    }
  }

  function patchKeyedChildren(
    c1: any[],
    c2: any[],
    container,
    parentAnchor,
    parentComponent
  ) {
    let i = 0
    const l2 = c2.length
    let e1 = c1.length - 1
    let e2 = l2 - 1

    const isSameVNodeType = (n1, n2) => {
      return n1.type === n2.type && n1.key === n2.key
    }

    while (i <= e1 && i <= e2) {
      const prevChild = c1[i]
      const nextChild = c2[i]

      if (!isSameVNodeType(prevChild, nextChild)) {
        console.log('两个 child 不相等(从左往右比对)')
        console.log(`prevChild:${prevChild}`)
        console.log(`nextChild:${nextChild}`)
        break
      }

      console.log('两个 child 相等，接下来对比这两个 child 节点(从左往右比对)')
      patch(prevChild, nextChild, container, parentAnchor, parentComponent)
      i++
    }

    while (i <= e1 && i <= e2) {
      // 从右向左取值
      const prevChild = c1[e1]
      const nextChild = c2[e2]

      if (!isSameVNodeType(prevChild, nextChild)) {
        console.log('两个 child 不相等(从右往左比对)')
        console.log(`prevChild:${prevChild}`)
        console.log(`nextChild:${nextChild}`)
        break
      }
      console.log('两个 child 相等，接下来对比这两个 child 节点(从右往左比对)')
      patch(prevChild, nextChild, container, parentAnchor, parentComponent)
      e1--
      e2--
    }

    if (i > e1 && i <= e2) {
      // 如果是这种情况的话就说明 e2 也就是新节点的数量大于旧节点的数量
      // 也就是说新增了 vnode
      // 应该循环 c2
      // 锚点的计算：新的节点有可能需要添加到尾部，也可能添加到头部，所以需要指定添加的问题
      // 要添加的位置是当前的位置(e2 开始)+1
      // 因为对于往左侧添加的话，应该获取到 c2 的第一个元素
      // 所以我们需要从 e2 + 1 取到锚点的位置
      const nextPos = e2 + 1
      const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor
      while (i <= e2) {
        console.log(`需要新创建一个 vnode: ${c2[i].key}`)
        patch(null, c2[i], container, anchor, parentComponent)
        i++
      }
    } else if (i > e2 && i <= e1) {
      // 这种情况的话说明新节点的数量是小于旧节点的数量的
      // 那么我们就需要把多余的
      while (i <= e1) {
        console.log(`需要删除当前的 vnode: ${c1[i].key}`)
        hostRemove(c1[i].el)
        i++
      }
    } else {
      // 左右两边都比对完了，然后剩下的就是中间部位顺序变动的
      // 例如下面的情况
      // a,b,[c,d,e],f,g
      // a,b,[e,c,d],f,g

      let s1 = i
      let s2 = i
      const keyToNewIndexMap = new Map()
      let moved = false
      let maxNewIndexSoFar = 0
      // 先把 key 和 newIndex 绑定好，方便后续基于 key 找到 newIndex
      // 时间复杂度是 O(1)
      for (let i = s2; i <= e2; i++) {
        const nextChild = c2[i]
        keyToNewIndexMap.set(nextChild.key, i)
      }

      // 需要处理新节点的数量
      const toBePatched = e2 - s2 + 1
      let patched = 0
      // 初始化 从新的index映射为老的index
      // 创建数组的时候给定数组的长度，这个是性能最快的写法
      const newIndexToOldIndexMap = new Array(toBePatched)
      // 初始化为 0 , 后面处理的时候 如果发现是 0 的话，那么就说明新值在老的里面不存在
      for (let i = 0; i < toBePatched; i++) newIndexToOldIndexMap[i] = 0

      // 遍历老节点
      // 1. 需要找出老节点有，而新节点没有的 -> 需要把这个节点删除掉
      // 2. 新老节点都有的，—> 需要 patch
      for (i = s1; i <= e1; i++) {
        const prevChild = c1[i]

        // 优化点
        // 如果老的节点大于新节点的数量的话，那么这里在处理老节点的时候就直接删除即可
        if (patched >= toBePatched) {
          hostRemove(prevChild.el)
          continue
        }

        let newIndex
        if (prevChild.key != null) {
          // 这里就可以通过key快速的查找了， 看看在新的里面这个节点存在不存在
          // 时间复杂度O(1)
          newIndex = keyToNewIndexMap.get(prevChild.key)
        } else {
          // 如果没key 的话，那么只能是遍历所有的新节点来确定当前节点存在不存在了
          // 时间复杂度O(n)
          for (let j = s2; j <= e2; j++) {
            if (isSameVNodeType(prevChild, c2[j])) {
              newIndex = j
              break
            }
          }
        }

        // 因为有可能 nextIndex 的值为0（0也是正常值）
        // 所以需要通过值是不是 undefined 或者 null 来判断
        if (newIndex === undefined) {
          // 当前节点的key 不存在于 newChildren 中，需要把当前节点给删除掉
          hostRemove(prevChild.el)
        } else {
          // 新老节点都存在
          console.log('新老节点都存在')
          // 把新节点的索引和老的节点的索引建立映射关系
          // i + 1 是因为 i 有可能是0 (0 的话会被认为新节点在老的节点中不存在)
          newIndexToOldIndexMap[newIndex - s2] = i + 1
          // 来确定中间的节点是不是需要移动
          // 新的 newIndex 如果一直是升序的话，那么就说明没有移动
          // 所以我们可以记录最后一个节点在新的里面的索引，然后看看是不是升序
          // 不是升序的话，我们就可以确定节点移动过了
          if (newIndex >= maxNewIndexSoFar) {
            maxNewIndexSoFar = newIndex
          } else {
            moved = true
          }

          patch(prevChild, c2[newIndex], container, null, parentComponent)
          patched++
        }
      }

      // 利用最长递增子序列来优化移动逻辑
      // 因为元素是升序的话，那么这些元素就是不需要移动的
      // 而我们就可以通过最长递增子序列来获取到升序的列表
      // 在移动的时候我们去对比这个列表，如果对比上的话，就说明当前元素不需要移动
      // 通过 moved 来进行优化，如果没有移动过的话 那么就不需要执行算法
      // getSequence 返回的是 newIndexToOldIndexMap 的索引值
      // 所以后面我们可以直接遍历索引值来处理，也就是直接使用 toBePatched 即可
      const increasingNewIndexSequence = moved
        ? getSequence(newIndexToOldIndexMap)
        : []
      let j = increasingNewIndexSequence.length - 1

      // 遍历新节点
      // 1. 需要找出老节点没有，而新节点有的 -> 需要把这个节点创建
      // 2. 最后需要移动一下位置，比如 [c,d,e] -> [e,c,d]

      // 这里倒循环是因为在 insert 的时候，需要保证锚点是处理完的节点（也就是已经确定位置了）
      // 因为 insert 逻辑是使用的 insertBefore()
      for (let i = toBePatched - 1; i >= 0; i--) {
        // 确定当前要处理的节点索引
        const nextIndex = s2 + i
        const nextChild = c2[nextIndex]
        // 锚点等于当前节点索引+1
        // 也就是当前节点的后面一个节点(又因为是倒遍历，所以锚点是位置确定的节点)
        const anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor

        if (newIndexToOldIndexMap[i] === 0) {
          // 说明新节点在老的里面不存在
          // 需要创建
          patch(null, nextChild, container, anchor, parentComponent)
        } else if (moved) {
          // 需要移动
          // 1. j 已经没有了 说明剩下的都需要移动了
          // 2. 最长子序列里面的值和当前的值匹配不上， 说明当前元素需要移动
          if (j < 0 || increasingNewIndexSequence[j] !== i) {
            // 移动的话使用 insert 即可
            hostInsert(nextChild.el, container, anchor)
          } else {
            // 这里就是命中了  index 和 最长递增子序列的值
            // 所以可以移动指针了
            j--
          }
        }
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

  function mountElement(n1, n2: any, container: any, parentComponent, anchor) {
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
      mountChildren(n2.children, el, parentComponent, anchor)
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

  function mountChildren(children, el, parentComponent, anchor) {
    children.forEach((v) => {
      patch(null, v, el, parentComponent, anchor)
    })
  }

  function processComponent(
    n1,
    n2: any,
    container: any,
    parentComponent,
    anchor
  ) {
    if (!n1) {
      // 挂载组件
      mountComponent(n2, container, parentComponent, anchor)
    } else {
      // 更新组件
      updateComponent(n1, n2)
    }
  }

  function updateComponent(n1, n2) {
    // 检测组件的 props
    if (shouldUpdateComponent(n1, n2)) {
      const instance = (n2.component = n1.component)

      // 下次更新的虚拟节点
      instance.next = n2
      instance.update()
    } else {
    }
  }



  function mountComponent(
    initialVNode: any,
    container,
    parentComponent,
    anchor
  ) {
    //创建组件实例
    const instance = (initialVNode.component = creatComponentInstance(
      initialVNode,
      parentComponent
    ))

    setupComponent(instance)
    setupRenderEffect(instance, initialVNode, container, anchor)
  }

  function setupRenderEffect(instance, initialVNode, container, anchor) {
    instance.update = effect(() => {
      // 第一次渲染初始化触发
      if (!instance.isMounted) {
        console.log('init-- 初始化')

        const { proxy } = instance

        // 虚拟节点树
        const subTree = (instance.subTree = instance.render.call(proxy))
        console.log('subTree', subTree)

        // vnode -> patch
        // vnode -> element -> mounElement
        patch(null, subTree, container, instance, anchor)

        // element => mount
        // // 把 root element 赋值给 组件的vnode.el ，为后续调用 $el 的时候获取值ƒ
        initialVNode.el = subTree.el

        instance.isMounted = true
      } else {
        // 更新触发
        console.log('update')

        // 需要一个vnode
        // 如果有 next 的话， 说明需要更新组件的数据（props，slots 等）
        // 先更新组件的数据，然后更新完成后，在继续对比当前组件的子元素
        const { next, vnode } = instance
        if (next) {
          next.el = vnode.el
          updateComponentPreRender(instance, next)
        }

        const { proxy } = instance

        // 虚拟节点树
        const subTree = instance.render.call(proxy)
        const prevSubTree = instance.subTree
        instance.subTree = subTree
        console.log('subTree', subTree, prevSubTree)

        patch(prevSubTree, subTree, container, instance, anchor)
      }
    },{scheduler(){
      console.log('scheduler------',);
      queueJob(instance.update)
    }})
  }

  function updateComponentPreRender(instance, nextVNode) {
    // 更新 nextVNode 的组件实例
    // 现在 instance.vnode 是组件实例更新前的
    // 所以之前的 props 就是基于 instance.vnode.props 来获取
    // 接着需要更新 vnode ，方便下一次更新的时候获取到正确的值
    nextVNode.component = instance
    // TODO 后面更新 props 的时候需要对比
    // const prevProps = instance.vnode.props;
    instance.vnode = nextVNode
    instance.next = null

    const { props } = nextVNode
    console.log('更新组件的 props', props)
    instance.props = props
    console.log('更新组件的 slots')
    // TODO 更新组件的 slots
    // 需要重置 vnode
  }

  return {
    createApp: createAppAPI(render),
  }
}

function getSequence(arr: number[]): number[] {
  const p = arr.slice()
  const result = [0]
  let i, j, u, v, c
  const len = arr.length
  for (i = 0; i < len; i++) {
    const arrI = arr[i]
    if (arrI !== 0) {
      j = result[result.length - 1]
      if (arr[j] < arrI) {
        p[i] = j
        result.push(i)
        continue
      }
      u = 0
      v = result.length - 1
      while (u < v) {
        c = (u + v) >> 1
        if (arr[result[c]] < arrI) {
          u = c + 1
        } else {
          v = c
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p[i] = result[u - 1]
        }
        result[u] = i
      }
    }
  }
  u = result.length
  v = result[u - 1]
  while (u-- > 0) {
    result[u] = v
    v = p[v]
  }
  return result
}
