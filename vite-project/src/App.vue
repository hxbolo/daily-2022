<template>
  <div>
    <div>{{city}}</div>
    <button @click="changeData">修改</button>
  </div>
</template>

<script>
import { reactive,toRefs } from 'vue';
export default {
  setup(){
    const obj = reactive({
      name:'张三',
      city:'西安',
    });
    let obj2 = toRefs(obj);
    
    const changeData = () => {
      obj2.city.value = '北京';
      console.log(obj,obj2)
    };
    
    return {
      ...obj2,
      changeData
    } 
  }
}
</script>
