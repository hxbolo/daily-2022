<template>
  <div class="login-container">
    <van-nav-bar title="针车件资确认" left-text="" left-arrow> </van-nav-bar>
    <van-cell-group>
      <van-cell title="单号" :value="detail.lb" />
      <van-cell title="交接单号" :value="detail.lb" />
      <van-cell title="货号" :value="detail.hz" />
      <van-cell title="颜色" :value="detail.zl" />
      <van-cell title="组别" :value="detail.zb" />
      <van-cell title="工艺类别" />
    </van-cell-group>

    <table>
      <thead>
        <tr>
          <th colspan="2">工序</th>
          <th colspan="2">人员分配</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in processData" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td class="select" @click="openModal(item.id)">
            {{ item.personData[0].name }}({{ item.personData[0].num }})
          </td>
        </tr>
      </tbody>
    </table>

    <van-dialog
      v-model="show"
      title="分配人员"
      show-cancel-button
      confirmButtonColor="#1989fa"
      @confirm="confirm"
    >
      <div class="pop">
        <van-checkbox-group v-model="result">
          <van-checkbox
            class="checkbox"
            v-for="item in peopleList"
            :key="item.id"
            :name="item.id"
          >
            <div class="name">{{ item.name }}</div>
            <input
              v-model="item.num"
              type="number"
              class="input"
              label="数量"
              placeholder="请输入数量"
              @click.stop="handleInput"
            />
          </van-checkbox>
        </van-checkbox-group>
      </div>
    </van-dialog>

    <van-button type="info" block class="btn">保存/审核</van-button>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Detail',
  data() {
    return {
      show: false,
      detail: {
        lb: 'ZCJZ2023102400001',
        hz: 'E11727H',
        zl: '烟灰',
        zb: '帮面10组',
        hh: 'w222',
        num: 20,
        status: 1, // 1待确认， 2 已确定
        statusText: '待确认', // 1待确认， 2 已确定
      },
      processData: [
        {
          id: '1',
          name: '拼后帮里',

          personData: [
            {
              id: '员工001',
              name: '张三',
              num: 3,
            },
            {
              id: '员工001',
              name: '张三',
              num: 3,
            },
          ],
        },
        {
          id: '2',
          name: '拼后帮里',

          personData: [
            {
              id: '员工001',
              name: '张三',
              num: 3,
            },
            {
              id: '员工001',
              name: '张三',
              num: 3,
            },
          ],
        },
      ],
      result: [],

      dialogVisible: false,
      selectedPeople: [],
      inputValues: {},
      peopleList: [
        { id: 1, name: '小猫', num: null },
        { id: 2, name: '小J', num: null },
        { id: 3, name: 'ee', num: null },
        { id: 4, name: 'xx', num: null },
      ],
      changeId: null, //打开弹窗修改人员的id
    }
  },
  mounted() {},
  methods: {
    submit() {
      console.log('保存')
    },
    openModal(id) {
      this.show = true
      this.changeId = id
    },
    handleInput() {},
    // 弹窗确定
    confirm() {
      // 选中的人和数量
      let res = this.peopleList.filter((person) =>
        this.result.includes(person.id)
      )
      console.log(res)
      this.processData.forEach((v) => {
        if (v.id == this.changeId) {
          v.personData = res
        }
      })

      console.log(this.processData)
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
:deep .van-cell__label {
  margin-top: 0;
}
.tr {
  border: 1px solid #d0cccc;
  height: 40px;
  text-align: center;
  line-height: 40px;
}
.td {
  background-color: #1989fa;
  height: 40px;
  text-align: center;
  line-height: 40px;
  color: #fff;
}
.td:first-child {
  border-right: 1px solid #d0cccc;
}

table {
  width: 95%;
  border-collapse: collapse;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  font-size: 14px;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

th {
  background-color: #f2f2f2;
}
thead th {
  background-color: #1989fa;
  color: #fff;
}
.select {
  color: #1989fa;
  cursor: pointer;
}
.btn {
  position: fixed;
  bottom: 10px;
  left: 50%;
  width: 95%;
  transform: translateX(-50%);
  z-index: 1;
}
.pop {
  padding: 10px;
}
.checkbox {
  margin-bottom: 10px;
}
.input {
  width: 80px;
}
.name {
  display: inline-block;
  width: 60px;
}
</style>
