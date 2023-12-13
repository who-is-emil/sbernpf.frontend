<template>
  <div class="app-slider-pagination" :class="theme">
    <div
      v-for="(_, idx) in items"
      :key="idx"
      class="app-slider-pagination__bullet"
      :class="activeIndex === idx ? 'app-slider-pagination__bullet--active' : ''"
    />
  </div>
</template>

<script>
export default {
  name: 'AppSliderPagination',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    items () {
      return this.data.items || [];
    },
    activeIndex () {
      return this.data.activeIndex || 0;
    },
    theme () {
      const theme = this.data.theme || '';
      return theme ? `app-slider-pagination--${theme}` : theme;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "AppSliderPagination";
</style>
