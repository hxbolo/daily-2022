<script setup>
import { ref, onUpdated, onMounted } from 'vue'
import HelloWorld from './components/HelloWorld.vue'

const count = ref(0)


const inputClick = () =>{
  count.value++ 
}

</script>

<template>
  <div class="home">
    <HelloWorld :index="count" @inputClick = "inputClick" /> 
  </div>
</template>

