<template lang="html">
  <ts-section>
    <div slot="menu">
    </div>
      <ts-table :data="data" @th-col-click="thColClick" @body-tr-click="trClick">
        <ts-column slot data-key="img"  align="center" image name="花型图片">
        </ts-column>
      <ts-column slot data-key="person"  align="center" name="询价人"></ts-column>
      <ts-column slot data-key="iden" width="90px" align="center" name="身份"></ts-column>
      <ts-column slot data-key="type"  align="center" name="采购类型"></ts-column>
      <ts-column slot data-key="num"  align="center" name="采购数量"></ts-column>
      <ts-column slot data-key="tel"  align="center" name="联系电话" width="130px"></ts-column>
      <ts-column slot data-key="time"  align="center" name="询价时间"></ts-column>
      <ts-column slot  align="center"  name="操作" action="[{'text':'查看花型','func':'view'},{'text':'询价人信息','func':'mess'}]"></ts-column>
    </ts-table>
    <ts-button></ts-button>
    <ts-select label="person" placeholder="Select your team" :options="data" @change="choose"></ts-select>
    <div slot="footer">
      一共
    </div>
  </ts-section>
</template>

<script>
export default {
  data() {
    return {
      data: [{
        id: 1,
        img: 'http://avatar.csdn.net/E/4/6/1_wangxiaohu__.jpg',
        person: '张三',
        iden: '厂家',
        type: '建扬',
        num: '1000码',
        tel: '1988900',
        time: '2017-03-32'
      }, {
        id: 1,
        img: 'http://avatar.csdn.net/E/4/6/1_wangxiaohu__.jpg',
        person: '张四',
        iden: '厂家',
        type: '建扬',
        num: '1000码',
        tel: '1988900',
        time: '2017-03-32'
      }]
    };
  },
  methods: {
    mess(data) {
      console.log(data);
    },
    choose(item) {
      console.log(item);
    },
    view(data) {
      console.log(data);
    },
    thColClick(row) {
      console.log(row);
    },
    trClick(row) {
      console.log(row);
    }
  }
};
</script>

<style lang="css">
</style>
