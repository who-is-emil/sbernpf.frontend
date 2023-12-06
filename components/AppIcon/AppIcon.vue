<template>
  <div class="app-icon" :class="className">
    <component :is="svgComponent" />
  </div>
</template>

<script>
export default {
  name: 'AppIcon',
  props: {
    name: {
      required: true,
      type: String
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    svgComponent () {
      return () => import(`@/assets/icons/${this.name}.svg?raw`);
    }
  }
};
</script>

<style lang="scss">
@import "AppIcon";
</style>
