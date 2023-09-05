import { createVNode, Fragment } from '../vnode'

/**
 * Compiler runtime helper for rendering `<slot/>`
 * 用来 render slot 的
 * 之前是把 slot 的数据都存在 instance.slots 内(可以看 componentSlot.ts)，
 * 这里就是取数据然后渲染出来的点
 * 这个是由 compiler 模块直接渲染出来的
 * 其最终目的就是在 render 函数中调用 renderSlot 取 instance.slots 内的数据
 * TODO 这里应该是一个返回一个 block ,但是暂时还没有支持 block ，所以这个暂时只需要返回一个 vnode 即可
 * 因为 block 的本质就是返回一个 vnode
 *
 * @private
 */
export function renderSlot(slots, name: string, props) {
  const slot = slots[name]
  if (slot) {
    // 因为 slot 是一个返回 vnode 的函数，我们只需要把这个结果返回出去即可
    // slot 就是一个函数，所以就可以把当前组件的一些数据给传出去，这个就是作用域插槽
    // 参数就是 props
    if (typeof slot == 'function') {
      return createVNode(Fragment, {}, slot(props))
    }
  }
}
