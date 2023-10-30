import { h, ref } from '../../lib/guide-mini-vue.esm.js'

export const App = {
  setup() {
    const count = ref(0)
    const onClick = () => {
      count.value++
    }

    const props = ref({
      foo: 'foo',
      bar: 'bar',
    })
    const onChangePropsDemo1 = () => {
      props.value.foo = 'new-foo'
    }
    const onChangePropsDemo2 = () => {
      props.value.foo = undefined
    }
    const onChangePropsDemo3 = () => {
      props.value = {
        foo: 'foo',
      }
    }
    return {
      count,
      onClick,
      onChangePropsDemo1,
      onChangePropsDemo2,
      onChangePropsDemo3,
      props,
    }
  },
  render() {
    return h('div', { id: 'root', ...this.props }, [
      h('div', {}, 'count' + this.count), // 依赖收集
      h('button', { onClick: this.onClick }, 'click'),
      h('button', { onClick: this.onChangePropsDemo1 }, 'changeprops- 值改变-修改'),
      h('button', { onClick: this.onChangePropsDemo2 }, 'changeprops- 值改变-undfined - 删除'),
      h('button', { onClick: this.onChangePropsDemo3 }, 'changeprops- key在新的里面没有了 - 删除'),
    ])
  },
}
