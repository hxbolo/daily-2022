<template>
  <div id="app">
    <input type="button" value="fufufufuf打开新页面" @click="openWin" />
  </div>
</template>

<script>
export default {
  mounted() {},
  methods: {
    openWin() {
      var params = new Array()
      params[0] = new Array('params1', 'aaaaaa')
      params[1] = new Array('params2', 'bbbbbb')

      var popupwin = window.open('http://localhost:8080/')
      //onload只能执行一次，也就是如果子窗口有onload事件，可能会覆盖。
      popupwin.onload = function () {
        popupwin.postMessage(params, 'http://localhost:8080/ ')
      }

      popupwin.onunload = function () {
        var val = popupwin.returnValue
        alert(val)
      }
    },
  },
}
</script>

<style>
html {
  height: 100%;
}
body {
  height: 100%;
  margin: 0;
}
#app {
  height: 100%;
}
</style>
