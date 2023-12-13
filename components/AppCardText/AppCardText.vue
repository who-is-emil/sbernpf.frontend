<template>
  <div
    class="app-card-text"
    :class="{'app-card-text--active' : active}"
    @click="click"
  >
    <p class="app-card-text__title" v-html="title" />
  </div>
</template>

<script>
export default {
  name: 'AppCardText',
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
    active () {
      return this.data.active || false;
    }
  },
  methods: {
    click () {
      this.$emit('click');
    }
  }
};
</script>

<style lang="scss" scoped>
@import "AppCardText";
</style>
