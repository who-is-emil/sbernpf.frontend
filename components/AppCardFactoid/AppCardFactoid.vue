<template>
  <div class="app-card-factoid">
    <h4 v-if="title" class="app-card-factoid__title">
      {{ title }}
    </h4>
    <p v-if="value" class="app-card-factoid__value h2">
      {{ value }}
    </p>
    <p v-if="text" class="app-card-factoid__text">
      {{ text }}
    </p>
    <p v-if="description" class="app-card-factoid__description">
      {{ description }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'AppCardFactoid',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    title () {
      return this.data.title || '';
    },
    value () {
      return this.data.value || '';
    },
    text () {
      return this.data.text || '';
    },
    description () {
      return this.data.description || '';
    }
  }
};
</script>

<style lang="scss" scoped>
@import "AppCardFactoid";
</style>
