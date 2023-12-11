<template>
  <div id="app">
    <h3>Parameter params1: <b id="params1"></b></h3>
    <h3>Parameter params2: <b id="params2"></b></h3>
    <div><input type="button" value="Return Value" @click="closeWin" /></div>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    closeWin() {
      window.opener.postMessage({ returnValue: true }, window.location.origin)
      window.close()
    },
  },
  mounted() {

     window.addEventListener('message', (e) => {
      var params = e.data;
      console.log('params',params);
      console.log('Received message:', params);
      document.getElementById('params1').innerHTML = params[0];
      document.getElementById('params2').innerHTML = params[1];
    });
    // document.onreadystatechange = function () {
    //   if (document.readyState === 'complete') {
    //     window.addEventListener('message', function (e) {
    //       var params = e.data
    //       console.log('params', params)

    //       if (params && params.length >= 2) {
    //         // 确保在尝试访问属性之前 params[0] 和 params[1] 是定义的
    //         document.getElementById('params1').innerHTML = params[0]
    //           ? params[0][1]
    //           : '222'
    //         document.getElementById('params2').innerHTML = params[1]
    //           ? params[1][1]
    //           : '111'
    //       }
    //     })
    //   }
    // }
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
