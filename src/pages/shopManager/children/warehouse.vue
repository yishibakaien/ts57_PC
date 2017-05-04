<template lang="html">
  <ts-section>
    <div slot="menu">
      <router-link to="addwarehouse" exact>
        <ts-button type="primary">新增花型</ts-button>
      </router-link>
    </div>
    <!-- 品种过滤器 -->
    <!-- 过滤器 -->
    <div class="warehouse-filter">
      <ts-filter title="分类">
        <ts-radio-group v-model="Filter.sort" @change="hanleFilterSort">
          <ts-radio label="0">全部（1000）</ts-radio>
          <ts-radio label="1">本地仓库（200）</ts-radio>
          <ts-radio label="2">上架店铺（200）</ts-radio>
          <ts-radio label="3">上架平台（60）</ts-radio>
        </ts-radio-group>
      </ts-filter>
      <ts-filter title="面料种类">
        <ts-radio-group v-model="Filter.fabricType" @change="hanleFilterFabric">
          <ts-radio label="0">全部（4000）</ts-radio>
          <ts-radio label="1">面料（200）</ts-radio>
          <ts-radio label="2">大边（200）</ts-radio>
        </ts-radio-group>
      </ts-filter>
    </div>
    <!-- 表格 -->
    <div class="warehouse-table">
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
  </ts-section>
</template>

<script>
export default {
  data() {
    return {
      Filter: {
        fabricType: '1',
        sort: '1'
      }
    };
  },
  methods: {
    hanleFilterSort() {},
    hanleFilterFabric() {}
  }
};
</script>

<style lang="css">
</style>
