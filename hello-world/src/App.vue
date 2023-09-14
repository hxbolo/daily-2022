<template>
  <div>
    <div class="container"></div>
    1
  </div>
</template>

<script>
import ChildComponent from './components/ChildComponent.vue'

const $container = $('.container')

//   100000   <div class="target"></div>
function createTargets() {
  const htmlString = new Array(100000)
    .fill('<div class="target"></div>')
    .join('')
  $container.html(htmlString)
}

export default {
  components: {
    ChildComponent,
  },
  data() {
    return {
      childData: null,
      showChild: true,
    }
  },

  methods: {
    isInViewPort(element) {
      const viewWidth =
        window.innerWidth || document.documentElement.clientWidth
      const viewHeight =
        window.innerHeight || document.documentElement.clientHeight
      const { top, right, bottom, left } = element.getBoundingClientRect()

      return top >= 0 && left >= 0 && right <= viewWidth && bottom <= viewHeight
    },
  },
}
</script>
<style scoped>
container {
  display: flex;
  flex-wrap: wrap;
}
.target {
  margin: 5px;
  width: 20px;
  height: 20px;
  background: red;
}
</style>
