import { h, createTextVnode } from '../../lib/guide-mini-vue.esm.js'
import { Foo } from './Foo.js'

window.self = null
 
// 案例：  slot
export const App = {
  name: 'App',
  render() {
    const app = h('div', {}, 'app')
    // 单个vnode
    // const foo = h(Foo, {}, h('p', {}, '123'))
    // 数组类型
    // const foo = h(Foo, {}, [h('p', {}, '123'), h('p', {}, '456')])
    // 对象
    const foo = h(
      Foo,
      {},
      {
        header: ({ age }) => [
          h('p', {}, 'header' + age),
          createTextVnode('您好呀'),
        ],
        footer: ({ age }) => h('p', {}, 'footer' + age),
      }
    )
    return h('div', {}, [app, foo])
  },
  setup() {
    return {}
  },
}

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
