
<template>
  <button @click="handleIndex">{{index}}</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const emits =  defineEmits(['inputClick'])

defineProps<{ index: number }>()

const handleIndex = () =>{
  emits('inputClick')
}
</script>


<style scoped>
.read-the-docs {
  color: #888;
}
</style>
