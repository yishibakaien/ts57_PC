<template>
<section>
  <firm-info></firm-info>
  <firm-aptitude></firm-aptitude>
</section>
</template>

<script>
import FirmInfo from './aptitude/firmInfo';
import FirmAptitude from './aptitude/firmAptitude';
export default {
  components: {
    FirmInfo,
    FirmAptitude
  },
  created() {
    this.$store.dispatch('getCompanyAptitude');
  }
};
</script>

<style lang="css">
</style>
