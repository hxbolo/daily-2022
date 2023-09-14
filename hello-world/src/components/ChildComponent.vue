<template>
  <div>
    <p>Child Component</p>
  </div>
</template>

<script>
export default {
  props: ['data'],
  beforeCreate() {
    console.log('Child: beforeCreate');
  },
  created() {
    console.log('Child: created');
    // 模拟异步操作获取数据
    setTimeout(() => {
      const dataFromChild = 'Data from Child Component';
      this.$emit('child-data', dataFromChild);
    }, 1000);
  },
  beforeMount() {
    console.log('Child: beforeMount');
  },
  mounted() {
    console.log('Child: mounted');
  },
  beforeUpdate() {
    console.log('Child: beforeUpdate')
  },
  updated() {
    console.log('Child: updated')
  },
  beforeDestroy() {
    console.log('Child: beforeDestroy')
  },
  destroyed() {
    console.log('Child: destroyed')
  },
};
</script>
