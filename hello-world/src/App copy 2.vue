<template>
  <div>
    <p>Parent Component</p>
    <ChildComponent :data="childData" v-if="showChild"  />
    <button @click="toggleChild">Toggle Child</button>
  </div>
</template>

<script>
import ChildComponent from './components/ChildComponent.vue'

export default {
  components: {
    ChildComponent,
  },
  data() {
    return {
      childData: null,
      showChild:true
    }
  },
  beforeCreate() {
    console.log('Parent: beforeCreate')
  },
  created() {
    console.log('Parent: created')
  },
  beforeMount() {
    console.log('Parent: beforeMount')
  },
  mounted() {
    console.log('Parent: mounted')
  },
  beforeUpdate() {
    console.log('Parent: beforeUpdate')
  },
  updated() {
    console.log('Parent: updated')
  },
  beforeDestroy() {
    console.log('Parent: beforeDestroy')
  },
  destroyed() {
    console.log('Parent: destroyed')
  },
  methods: {
    toggleChild() {
      this.showChild = !this.showChild
    },
    getChildData(data) {
      this.childData = data
    },
  },
}
</script>
