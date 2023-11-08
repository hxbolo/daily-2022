import { h, ref, nextTick } from '../../lib/guide-mini-vue.esm.js'
import NextTicker from "./NextTicker.js";

export default {
  name: "App",
  setup() {

    const count  = ref(1)

    function onClick (){
      for (let i = 0; i < 100; i++) {
        count.value = i
        
      }

      // nextTick(()=>{console.log(count);})
    }
    return{
      count, 
      onClick
    }
  },

  render() {
    // return h("div", { tId: 1 }, [h("p", {}, "主页"), h(NextTicker)]);

    const button = h('button',{onClick: this.onClick},'update')

    const p = h('p',{},'count:'+ this.count)

    return h('div', {},[p,button])
  },
};
