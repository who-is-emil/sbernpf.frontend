<template>
  <div class="app-card-category">
    <div v-if="image" class="app-card-category__background">
      <AppImage :data="image" />
    </div>
    <div class="app-card-category__info">
      <span v-if="label" class="app-card-category__label">
        {{ label }}
      </span>
      <h3 v-if="title" class="app-card-category__title">
        {{ title }}
      </h3>
      <p v-if="text" class="app-card-category__text">
        {{ text }}
      </p>
    </div>
  </div>
</template>

<script>
import AppImage from '~/components/AppImage/AppImage';
export default {
  name: 'AppCardCategory',
  components: { AppImage },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    label () {
      return this.data.label;
    },
    title () {
      return this.data.title;
    },
    text () {
      return this.data.text;
    },
    image () {
      return this.data.image || false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "AppCardCategory";
</style>
