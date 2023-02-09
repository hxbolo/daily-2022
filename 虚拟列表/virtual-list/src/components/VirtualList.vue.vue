<template>
  <!-- 可是区域 -->
  <div ref="list" class="infinite-list-container" @scroll="scrollEvent($event)">
  <!-- 列表总高度 -->
    <div class="infinite-list-phantom" :style="{ height: listHeight + 'px' }"></div>
    <!-- 渲染区域 -->
    <div class="infinite-list" :style="{ transform: getTransform }">
      <div ref="items"
        class="infinite-list-item" 
        v-for="item in visibleData" 
        :key="item.id"
        :style="{ height: itemSize + 'px',lineHeight: itemSize + 'px' }"
      >{{ item.value }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name:'VirtualList',
  props: {
    //所有列表数据
    listData:{
      type:Array,
      default:()=>[]
    },
    //每项高度
    itemSize: {
      type: Number,
      default:200
    }
  },
  computed:{
    //列表总高度
    listHeight(){
      return this.listData.length * this.itemSize
    },
    //可显示区域的列表项个数
    visibleCount(){
      return Math.ceil(this.screenHeight / this.itemSize) 
    },
    //偏移量对应的style
    getTransform(){
      return `translate3d(0,${this.startOffset}px,0)`;
    },
    //获取真实显示列表数据
    visibleData(){
      console.log( Math.min(this.end,this.listData.length),' Math.min(this.end,.listData.lengthisth)');
      return this.listData.slice(this.start, Math.min(this.end,this.listData.length))
    }
  },
  mounted() {
    // 可是区域固定高度
    console.log(this.$el.clientHeight);
    this.screenHeight =  this.$el.clientHeight

    this.start = 0
    this.end = this.start + this.visibleCount

  },
  data() {
    return {
      start: 0, // 开始下标
      end:null,// 结束下标
      screenHeight : 0, // 可视区域高度
      startOffset: 0, // 偏移量
    };
  },
  methods: {
    scrollEvent() {
      let scrollTop =  this.$refs.list.scrollTop
      console.log('scrollTop',scrollTop);
      this.start = Math.floor(scrollTop/this.itemSize) 
      this.end =  this.start + this.visibleCount
      this.startOffset = scrollTop - (scrollTop % this.itemSize)
    }
  }
};
</script>


<style scoped>
.infinite-list-container {
  height: 100vh;
  overflow: auto;
  position: relative;
  -webkit-overflow-scrolling: touch;
}

.infinite-list-phantom {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}

.infinite-list {
  left: 0;
  right: 0;
  top: 0;
  position: absolute;
  text-align: center;
}

.infinite-list-item {
  padding: 10px;
  color: #555;
  box-sizing: border-box;
  border-bottom: 1px solid #999;
}
</style>