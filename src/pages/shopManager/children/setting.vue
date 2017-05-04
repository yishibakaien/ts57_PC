<template>
<div class="setting">
  <company-info></company-info>
  <message-phone></message-phone>
  <address-info></address-info>
</div>
</template>

<script>
import AddressInfo from './setting/addressInfo.vue';
import CompanyInfo from './setting/companyInfo.vue';
import MessagePhone from './setting/messagePhone.vue';
export default {
  components: {
    MessagePhone,
    CompanyInfo,
    AddressInfo
  }
};
</script>
