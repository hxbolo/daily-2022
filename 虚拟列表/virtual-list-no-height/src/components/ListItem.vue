<template>
  <p><span style="color:red">{{item.id}}</span>{{item.value}}</p>
</template>

<script>
export default {
  name:'ListItem',
  props: {
    item:{
      type:Object,
      default:()=>{}
    }
  },
  
  mounted() {
    
  },
  updated(){
    
  },
  data() {
    return {
      
    };
  },
  methods: {
    
  }
};
</script>


<style scoped>
  p{
    word-wrap: break-word;
	word-break: break-all;
  }
</style>