<template lang="html">
  <ts-section pageTitle="企业信息">
    <div slot="menu">
      <ts-button type="primary" @click="editCompany">编辑</ts-button>
    </div>
    <div class="ts-flex">
      <!-- 左边 -->
      <div class="ts-flex--row">
        <div class="ts-flex--left">
          商家id：
        </div>
        <div class="ts-flex--right">
          00001
        </div>
        <div class="ts-flex--left">
          公司名称：
        </div>
        <div class="ts-flex--right">
          福建坐视布管蕾丝有限公司
        </div>
        <div class="ts-flex--left">
          座机号码：
        </div>
        <div class="ts-flex--right">
          0591一28765779
        </div>
        <div class="ts-flex--left">
          店铺头像：
        </div>
        <div class="ts-flex--right">
          <ts-image width="90" height="90" src="https://img6.bdstatic.com/img/image/smallpic/h2.jpg"></ts-image>
        </div>
        <div class="ts-flex--left">
          厂家风采：
        </div>
        <div class="ts-flex--right">
          <ts-image width="90" height="90" src="https://img6.bdstatic.com/img/image/smallpic/h2.jpg"></ts-image>
          <ts-image width="90" height="90" src="https://img6.bdstatic.com/img/image/smallpic/h2.jpg"></ts-image>
        </div>
      </div>
        <!-- 右边 -->
      <div class="ts-flex--row">
          <div class="ts-flex--left">
            账户号码：
          </div>
          <div class="ts-flex--right">
            13719220901
          </div>
          <div class="ts-flex--left">
            公司简称：
          </div>
          <div class="ts-flex--right">
            坐视布管
          </div>
          <div class="ts-flex--left">
            传真号码：
          </div>
          <div class="ts-flex--right">
          0591一28709628
          </div>
          <div class="ts-flex--left">
            店招：
          </div>
          <div class="ts-flex--right">
          <ts-image width="224" height="112" src="https://img6.bdstatic.com/img/image/smallpic/h2.jpg"></ts-image>
          </div>
      </div>
    </div>
  </ts-section>
</template>

<script>
export default {};
</script>


<style lang="css" scoped>
@import '../../../../common/css/common/flex.css';
</style>
