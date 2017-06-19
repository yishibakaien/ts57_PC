<template lang="html">

</template>

<script>
import {
  checkOauth
} from '@/common/api/api';
export default {
  async created() {
    if (this.cookie.get('x-token')) {
      let res = await checkOauth({
        token: this.cookie.get('x-token')
      });
      if (!res.data.code) {
        await this.$router.push('/');
      }
    }
  }
};
</script>

<style lang="css">
</style>
