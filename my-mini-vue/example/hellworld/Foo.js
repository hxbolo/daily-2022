import { h, renderSlot, getCurrentInstance } from '../../lib/guide-mini-vue.esm.js'

// 案例 getCrrentInstance
export const Foo = {
  setup() {
    const instance = getCurrentInstance()
    console.log('foo', instance);
    return {}
  },
  render() {

    return h('div', {}, h('p', {}, 'foo'))
  },
}

// 案例 slot
// export const Foo = {
//   setup() {},
//   render() {
//     const foo = h('p', {}, 'foo')
//     console.log(this.$slots)

//     //具名插槽
//     // 1. 获取到渲染的元素
//     // 获取到渲染的元素
//     const age = 18
//     return h('div', {}, [
//       renderSlot(this.$slots, 'header', {age}),
//       foo,
//       renderSlot(this.$slots, 'footer', {age}),
//     ])
//   },
// }

// 模拟prop  emit  案例
// export const Foo = {
//   setup(props, { emit }) {
//     console.log(props)
//     // 1. 获取到props
//     // 2. 通过this能访问到.props
//     // 3 .props 只读属性 shallow readOnly
//     // props.count++

//     // emit 事件处理
//     const emitAdd = () => {
//       console.log('emitAdd')
//       emit('add', 1,2)
//       emit('add-foo', 1,2)
//     }
//     return {
//       emitAdd
//     }
//   },
//   render() {
//     const btn = h('button', { onClick: this.emitAdd }, 'emitadd')
//     const foo = h('p', {}, 'foo')
//     // const foo = h('p', {}, 'foo' + this.count)
//     return h('div', {}, [btn, foo])
//   },
// }
