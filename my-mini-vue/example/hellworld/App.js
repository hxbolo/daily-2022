import { h } from '../../lib/guide-mini-vue.esm.js'
import { Foo } from './Foo.js'

window.self = null
export const App = {
  name: 'App',
  render() {
    window.self = this
    // ui
    return h(
      'div',
      {
        id: 'root',
        class: ['red', 'hard'],
        // onClick() {
        //   console.log('click')
        // },
        // onMouseDown() {
        //   console.log('onMouseDown')
        // },
      },
      [
        h('div', {}, 'hi,' + this.msg),
        h(Foo, {
          count: 1,
          onAdd(a, b) {
            console.log('onADD---', a,b)
          },
          // add-foo   => AddFoo
          onAddFoo(){
            console.log('onAddFoo---', )
          }
        }),
      ]
      // string
      // setupstate : 取值  通过proxy

      // this.$el => 返回 get root element

      // 'hi,' + this.msg
      // 'hi,mini-vue',

      // array
      // [
      //   h('p', { class: ['red'] }, 'hi'),
      //   h('p', { class: ['blue'] }, 'mini-vue'),
      // ]
    )
  },
  setup() {
    // composition api
    return {
      msg: 'mini-vuehhh',
    }
  },
}
