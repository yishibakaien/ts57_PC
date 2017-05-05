<template lang="html">
  <ts-section>
    <div slot="menu">
      <ts-input style="width:30%" placeholder="输入花型编号搜索">
        <span slot="append">O</span>
      </ts-input>
      <ts-button type="warning" class="warehouse-photo--search">
        O
      </ts-button>
      <router-link to="addwarehouse" exact>
        <ts-button type="primary">新增花型</ts-button>
      </router-link>
    </div>
    <div slot="footer" class="warehouse-footer--button">
      <ts-button type="primary">上架平台</ts-button>
      <ts-button type="primary">上架店铺</ts-button>
      <ts-button type="cancel">取消</ts-button>
    </div>
    <!-- 品种过滤器 -->
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
      <ts-select :options="list" v-model="selectedVal" data-key-name="label" data-val-name="id"></ts-select>
      <ts-checkbox-group>
      <ts-menu-table>
        <div slot="header-left">
          <ts-checkbox label="1">温水可保证</ts-checkbox>
        </div>
        <div slot="header-right">
          状态：<b>维护中</b>
        </div>
        <ts-menu-table-item width="310" class="supply-table--avatar">
          <ts-image width="80" height="80" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1493364654514&di=663dd7b0b318d20351579dba0006c37b&imgtype=0&src=http%3A%2F%2Fcdn.lizhi.fm%2Fradio_cover%2F2014%2F08%2F27%2F13991357699196804.jpg"></ts-image>
        </ts-menu-table-item>
        <ts-menu-table-item>
          大量提供，价格从优，要的赶紧来买
        </ts-menu-table-item>
        <ts-menu-table-item>
          供应：2000码
        </ts-menu-table-item>
        <ts-menu-table-item>
          收藏次数：<span class="supply-table--collect" @click.self="handleCollectDialog">8</span>
        </ts-menu-table-item>
        <ts-menu-table-item>
          <a class="supply-table--link">关闭</a>
          <a class="supply-table--link">编辑</a>
        </ts-menu-table-item>
      </ts-menu-table>
      </ts-checkbox-group>
    </div>
    <pre>{{checked}}</pre>
    <ts-checkbox-group v-model="checked">
      <ts-checkbox type="circle" label="复选框 A" disabled>2222</ts-checkbox>
      <ts-checkbox  type="circle" label="复选框 B">22</ts-checkbox>
      <ts-checkbox label="复选框 AC">123</ts-checkbox>
  </ts-checkbox-group>
  </ts-section>
</template>

<script>
import {mapActions} from 'vuex';
export default {
  data() {
    return {
      checked: ['复选框 A'],
      list: [{
        id: 1,
        label: '11'
      }, {
        id: 2,
        label: '121'
      }, {
        id: 21,
        label: '33'
      }],
      selectedVal: '33',
      Filter: {
        fabricType: '1',
        sort: '1'
      }
    };
  },
  created() {
    this.getProductList();
  },
  methods: {
    ...mapActions(['getProductList']),
    hanleFilterSort() {},
    hanleFilterFabric() {}
  }
};
</script>

<style lang="css" scoped>
@component-namespace warehouse{
  @component filter{
    margin-bottom: 24px;
  }
  @component footer{
    @modifier button{
      button{
        margin-right:32px;
      }
    }
  }
  @component photo{
    @modifier search{
      margin:0 20px;
      min-width: 40px;
    }
  }
}
</style>
