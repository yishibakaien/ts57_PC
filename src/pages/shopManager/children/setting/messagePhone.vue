<template lang="html">
  <div class="messagePhone">
      <ts-section>
        <div slot="title">
          接受短信号码<span class="pot-warning" @click="messSettingDialog=!messSettingDialog">?</span>
        </div>
    <div slot="menu">
      <ts-button type="primary" @click="editCompany">新增号码</ts-button>
      <ts-button type="primary" @click="editCompany">短信设置</ts-button>
    </div>
    <div class="message-phone-container" v-for="(n,index) in 2">
      <p class="message-phone-container--left">
      短信接收号码_{{index+1}}：
    </p>
      <div class="message-phone-container--right">
        <ts-input max="16" style="width:30%"></ts-input>
        <ts-button type="plain">修改</ts-button>
      </div>
    </div>
  </ts-section>
  <!-- 短信接收设置说明对话框 -->
  <ts-dialog v-model="messSettingDialog" title="短信接收设置说明" type="alert" alertText="我知道了" @confirm="messSettingDialog=!messSettingDialog">
    <article class="message-phone-dialog">
    系统在以下几种情况会发送业务短信给您
    <p>1、<i>花型询价</i>：有买家对您店铺的某款花型发起询价时会发送短信；</p>
    <p>2、<i>花型索样</i>：有买家对您店铺的某款花型发起寄样请求时会发送短信；</p>
    <p>3、<i>求购接单</i>：有厂家对您发布的求购接单时会发送短信；</p>
    <p>4、<i>搜花查看花型</i>：有买家快照找花查看您店铺的某款花型时会发送短信；</p>
    <p class="message-phone-dialog--tip">
      您最多可以设置两个接收短信号码
    </p>
    </article>
  </ts-dialog>
    </div>
</template>

<script>
export default {
  data() {
    return {
      messSettingDialog: false
    };
  }
};
</script>

<style lang="css" scoped>
@component-namespace message-phone{
  @component container{
    display: flex;
    align-items: center;
    @modifier right{
      flex:1;
    }
    @modifier left{
      width: 20%;
    }
  }
  @component dialog{
    line-height: 200%;
    i{
      color:red;
    }
    @modifier tip{
      margin-top: 10px;
      text-align: center;
    }
  }
}
.pot-warning{
  color: #FF8400;
  position: relative;
  font-size: 14px;
  width: 21px;
  text-align: center;
  display: inline-block;
  vertical-align: 3px;
  cursor: pointer;
  margin-left:4px;
}
.pot-warning:after{
  content:' ';
  border: 1px solid;
  top:5px;
  height: 20px;
  left:0;
  right:0;
  bottom:0;
  border-radius: 50%;
  position: absolute;
  color:#FF8400;
}
</style>
