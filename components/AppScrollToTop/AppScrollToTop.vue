<template>
  <button v-scroll-to="'#hero'" type="button" class="app-scroll-to-top">
    <AppIcon name="24/arrow-top" />
  </button>
</template>

<script>
import AppIcon from '~/components/AppIcon/AppIcon';
export default {
  name: 'AppScrollToTop',
  components: { AppIcon }
};
</script>

<style lang="scss" scoped>
@import "AppScrollToTop";
</style>
