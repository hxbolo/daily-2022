<template>
  <div id="app">
    <!-- 定高 -->
    <VirtualList :listData="data" :itemSize="100" />
  </div>
</template>

<script>
import VirtualList from './components/VirtualList.vue'

let d = [];
for (let i = 0; i < 1000; i++) {
  d.push({ id: i, value: i });
}
console.log(d);
export default {
  name: 'App',
  components: {
    VirtualList,
  },
  data() {
    return {
      data: d
    };
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
