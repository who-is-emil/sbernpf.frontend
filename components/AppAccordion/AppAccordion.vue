<template>
  <div class="aap-accordion">
    app-accordion
  </div>
</template>

<script>
export default {
  name: 'AppAccordion',
  props: {
    data: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
@import "AppAccordion";
</style>
