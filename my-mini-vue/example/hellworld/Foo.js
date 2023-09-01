import { h } from '../../lib/guide-mini-vue.esm.js'

export const Foo = {
  setup(props, { emit }) {
    console.log(props)
    // 1. 获取到props
    // 2. 通过this能访问到.props
    // 3 .props 只读属性 shallow readOnly
    // props.count++

    // emit 事件处理
    const emitAdd = () => {
      console.log('emitAdd')
      emit('add', 1,2)
      emit('add-foo', 1,2)
    }
    return {
      emitAdd
    }
  },
  render() {
    const btn = h('button', { onClick: this.emitAdd }, 'emitadd')
    const foo = h('p', {}, 'foo')
    // const foo = h('p', {}, 'foo' + this.count)
    return h('div', {}, [btn, foo])
  },
}
