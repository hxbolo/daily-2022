import {
  h,
  createTextVnode,
  getCurrentInstance,
  provide,
  inject,
} from '../../lib/guide-mini-vue.esm.js'

import { Foo } from './Foo.js'

window.self = null

const Provider = {
  name: 'Provider',
  setup() {
    provide('foo', 'fooval')
    provide('bar', 'fooval')
  },
  render() {
    return h('div', {}, [h('p', {}, 'Provider'), h(ProviderTwo)])
  },
}
const ProviderTwo = {
  name: 'Provider',
  setup() {
    provide('foo', 'foovalTwo')
    const foo = inject('foo')
    return {
      foo
    }
  },
  render() {
    return h('div', {}, [h('p', {}, `ProviderTwo'foo: ${this.foo}`), h(Consumer)])
  },
}
const Consumer = {
  name: 'Consumer',
  setup() {
    const foo = inject('foo')
    const bar = inject('bar')
    const baz = inject('baz',()=> 'bazDefault')
    
    return {
      foo,
      bar,
      baz
    }
  },
  render() {
    return h('div', {}, `consumer: ---${this.foo}----${this.bar}---${this.baz}`)
  },
}

export const App = {
  name: 'App',
  render() {
    return h('div', {}, [h('p', {}, 'apiInject'), h(Provider)])
  },
  setup() {},
}

// 案例 getCurrentInstance
// export const App = {
//   name: 'App',
//   render() {
//     return h('div', {}, [h('p', {}, 'currnetInstance demo'), h(Foo)])
//   },
//   setup() {
//     const instance = getCurrentInstance()

//     console.log('app', instance)
//   },
// }

// 案例：  slot   text  fargment
// export const App = {
//   name: 'App',
//   render() {
//     const app = h('div', {}, 'app')
//     // 单个vnode
//     // const foo = h(Foo, {}, h('p', {}, '123'))
//     // 数组类型
//     // const foo = h(Foo, {}, [h('p', {}, '123'), h('p', {}, '456')])
//     // 对象
//     const foo = h(
//       Foo,
//       {},
//       {
//         header: ({ age }) => [
//           h('p', {}, 'header' + age),
//           createTextVnode('您好呀'),
//         ],
//         footer: ({ age }) => h('p', {}, 'footer' + age),
//       }
//     )
//     return h('div', {}, [app, foo])
//   },
//   setup() {
//     return {}
//   },
// }

// 模拟props   emit 案例
// export const App = {
//   name: 'App',
//   render() {
//     window.self = this
//     // ui
//     return h(
//       'div',
//       {
//         id: 'root',
//         class: ['red', 'hard'],
//         // onClick() {
//         //   console.log('click')
//         // },
//         // onMouseDown() {
//         //   console.log('onMouseDown')
//         // },
//       },
//       [
//         h('div', {}, 'hi,' + this.msg),
//         h(Foo, {
//           count: 1,
//           onAdd(a, b) {
//             console.log('onADD---', a,b)
//           },
//           // add-foo   => AddFoo
//           onAddFoo(){
//             console.log('onAddFoo---', )
//           }
//         }),
//       ]
//       // string
//       // setupstate : 取值  通过proxy

//       // this.$el => 返回 get root element

//       // 'hi,' + this.msg
//       // 'hi,mini-vue',

//       // array
//       // [
//       //   h('p', { class: ['red'] }, 'hi'),
//       //   h('p', { class: ['blue'] }, 'mini-vue'),
//       // ]
//     )
//   },
//   setup() {
//     // composition api
//     return {
//       msg: 'mini-vuehhh',
//     }
//   },
// }
