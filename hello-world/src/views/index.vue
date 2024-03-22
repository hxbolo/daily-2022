<template>
  <div class="login-container">
    <van-nav-bar title="针车件资" left-text="" left-arrow> </van-nav-bar>

    <van-search
      v-model="searchValue"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
    >
      <template #action>
        <div @click="onSearch">搜索</div>
      </template>
    </van-search>

    <van-tabs v-model="active" color="#1989fa">
      <van-tab v-for="(item, index) in tabList" :key="index" :title="item.name">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div v-for="item in list" :key="item.id">
            <div class="row" @click="goNext(item.lb)">
              <div class="between pb5">
                <div class="left">单号:{{ item.lb }}</div>
                <van-tag
                  :type="item.status == 1 ? 'primary' : 'success'"
                  plain
                  round
                  >{{ item.statusText }}</van-tag
                >
              </div>

              <div class="between pb5">
                <div class="left">
                  <span class="name">货号: </span>{{ item.hz }}
                </div>
                <div class="right">
                  <span class="name">颜色: </span>{{ item.zl }}
                </div>
              </div>
              <div class="between pb5">
                <div class="left">
                  <span class="name">数量: </span>{{ item.color }}
                </div>
                <div class="right">
                  <span class="name">组别: </span>{{ item.zb }}
                </div>
              </div>
            </div>
          </div>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Home',
  data() {
    return {
      tabList: [
        {
          index: 0,
          name: '待确认',
        },
        {
          index: 1,
          name: '已确认',
        },
      ],
      active: 0,
      list: [
        {
          lb: 'ZCJZ2023102400001',
          hz: 'E11727H',
          zl: '烟灰',
          zb: '帮面10组',
          hh: 'w222',
          num: 20,
          status: 1, // 1待确认， 2 已确定
          statusText: '待确认', // 1待确认， 2 已确定
        },
        {
          lb: 'ZCJZ2023102400002',
          hz: 'E11727H',
          zl: '烟灰',
          zb: '帮面10组',
          hh: 'w222',
          num: 20,
          status: 2, // 1待确认， 2 已确定
          statusText: '已确认', // 1待确认， 2 已确定
        },
      ],
      loading: false,
      finished: false,
      searchValue: '',
    }
  },
  mounted() {
    this.onLoad()
  },
  methods: {
    // 搜索
    onSearch() {
      // 传输到后端
      console.log(this.searchValue, this.active)
    },

    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        // for (let i = 0; i < 10; i++) {
        //   this.list.push(this.list.length + 1)
        // }

        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 1000)
    },
    // tab切换调接口
    onClickTab(name, title) {
      console.log(name, title)
    },
    goNext(id) {
      this.$router.push({ path: 'detail', query: { id: id } })
    },
  },
}
</script>


<style  scoped>
.p20 {
  padding: 0 20px;
}
.flex-row {
  display: flex;
  justify-content: center;
  align-items: center;
}
.between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.row {
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
  background: #fff;
  border: 1px solid #1989fa;
  border-radius: 10px;
  margin-bottom: 10px;
}
.row:first-child {
  margin-top: 10px;
}
.left {
  font-size: 14px;
}
.pb5 {
  padding-bottom: 5px;
}
.name {
  color: #706969;
}
:deep .van-list {
  padding: 0 10px;
}
</style>
