<template lang="html">
</template>

<script>
import {
  checkOauth
} from '@/common/api/api';
export default {
  async created() {
    if (this.$route.query.token) {
      let res = await checkOauth({
        token: this.$route.query.token
      });
      if (!res.data.code) {
        await this.$store.commit('LOGIN', res.headers['x-token']);
        await this.$store.commit('GET_USERINFO', res.data.data);
        await this.$router.push('/homePage');
      }
    }
  }
};
</script>

<style lang="css">
</style>
