<template>
<div class="">
  <ts-section>
    <div slot="menu">
      <button class="button button-blue">发布供应</button>
    </div>
    <div slot="body">
      <!-- 过滤器 -->
      <div class="supply-filter">
        <ts-filter title="分类">
          <ts-radio-group v-model="Filter.sort" @change="hanleFilterSort">
            <ts-radio label="上海">上海</ts-radio>
            <ts-radio label="上海是">上海是</ts-radio>
          </ts-radio-group>
        </ts-filter>
        <ts-filter title="面料种类">
          <ts-radio-group v-model="Filter.fabricType" @change="hanleFilterFabric">
            <ts-radio label="上海">上海</ts-radio>
            <ts-radio label="上海是">上海是</ts-radio>
          </ts-radio-group>
        </ts-filter>
        <ts-filter title="供货方式">
          <ts-radio-group v-model="Filter.supplyMode" @change="hanleFilterSupply">
            <ts-radio label="上海">上海</ts-radio>
            <ts-radio label="上海是">上海是</ts-radio>
          </ts-radio-group>
        </ts-filter>
      </div>
      <!-- 表格 -->
      <div class="supply-table">
        <ts-menu-table>
          <div slot="header-left">
            <ts-check>温水可保证</ts-check>
          </div>
          <div slot="header-right">
            状态：<b>维护中</b>
          </div>
          <ts-menu-table-box width="310" class="supply-table--avatar">
            <ts-image width="80" height="80" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1493364654514&di=663dd7b0b318d20351579dba0006c37b&imgtype=0&src=http%3A%2F%2Fcdn.lizhi.fm%2Fradio_cover%2F2014%2F08%2F27%2F13991357699196804.jpg"></ts-image>
          </ts-menu-table-box>
          <ts-menu-table-box>
            大量提供，价格从优，要的赶紧来买
          </ts-menu-table-box>
          <ts-menu-table-box>
            供应：2000码
          </ts-menu-table-box>
          <ts-menu-table-box>
            收藏次数：<span class="supply-table--collect" @click.self="handleCollectDialog">8</span>
          </ts-menu-table-box>
          <ts-menu-table-box>
            <a class="supply-table--link">关闭</a>
            <a class="supply-table--link">编辑</a>
          </ts-menu-table-box>
        </ts-menu-table>
      </div>
    </div>
    <div slot="footer">
    </div>
  </ts-section>
  <ts-dialog v-model="showDialog" title="供应收藏记录">
    <span>这是一段信息</span>
  </ts-dialog>
</div>
</template>
<script>
export default {
  data() {
    return {
      Filter: {
        supplyMode: '',
        fabricType: '',
        sort: ''
      },
      showDialog: false
    };
  },
  methods: {
    hanleFilterSort(val) {
      console.log(val);
    },
    hanleFilterFabric(val) {
      console.log(val);
    },
    hanleFilterSupply(val) {
      console.log(val);
    },
    handleCollectDialog() {
      console.log(0);
      this.showDialog = true;
      console.log(this.showDialog);
    }
  }
};
</script>

<style lang="css" scoped>
@component-namespace supply{
  @component filter{
    margin-bottom: 23px;
  }
  @component table{
    @modifier link{
      display: block;
    }
    @modifier avatar{
      text-align: left;
    }
    @modifier collect{
      cursor: pointer;
      color:#4C93FD;
      &:hover{
        color:blue;
      }
    }
  }
}
</style>
