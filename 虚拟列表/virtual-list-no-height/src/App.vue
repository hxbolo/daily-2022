<template>
  <div id="app">
    <!-- 不定高 -->
    <VirtualListHeight :listData="data" :estimatedItemSize="100" v-slot="slotProps">
      <ListItem :item="slotProps.item" />
    </VirtualListHeight>
  </div>
</template>

<script>
import VirtualListHeight from './components/VirtualListHeight.vue'
import ListItem from './components/ListItem'

let randomStr = function(flag, min, max) {
  var str = "";
  var index = "";
  var range = min;
  var arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b',
  'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p',
  'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D',
  'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
  'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  //min,max范围内随机的一个数
  if(flag) {
    range = Math.floor(Math.random() * (max - min + 1) + min);
  }
  for(var i = 0; i < range; i++) {
    index = Math.round(Math.random() * (arr.length - 1));
    str += arr[index];
  }
  return str;
}
let d = [];
for (let i = 0; i < 1000; i++) {
  d.push({ id: i, value: randomStr(330,20,330) });
}
console.log(d);
export default {
  name: 'App',
  components: {
    VirtualListHeight,
    ListItem
  },
  data() {
    return {
      data: d
    };
  },
}
</script>

<style>
html{
  height: 100%;
}
body{
  height: 100%;
  margin:0;
}
#app{
  height:100%;
}

</style>
