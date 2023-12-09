<template>
  <div class="app-image">
    <picture v-if="src">
      <source v-if="srcset" :srcset="srcset">
      <img :src="src" :alt="alt">
    </picture>
  </div>
</template>

<script>
export default {
  name: 'AppImage',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    srcset () {
      return this.data.srcset?.map((item) => {
        return require('~/public/' + item);
      })?.join(', ');
    },
    src () {
      if (!this.data.src) { return ''; }

      return require('~/public/' + this.data.src);
    },
    alt () {
      return this.data.alt || '';
    }
  }
};
</script>

<style lang="scss" scoped>
@import "AppImage";
</style>
