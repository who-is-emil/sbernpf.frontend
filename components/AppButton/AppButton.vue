<template>
  <button
    :type="type"
    :class="['app-button', theme, size]"
    :title="title"
    @click="click"
  >
    <span class="app-button__text">{{ text }}</span>
  </button>
</template>

<script>
export default {
  name: 'AppButton',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    type () {
      return this.data.type || 'button';
    },
    text () {
      return this.data.text || '';
    },
    title () {
      return this.data.title || this.text;
    },
    theme () {
      return this.data.theme
        ? `app-button--${this.data.theme}`
        : '';
    },
    size () {
      return this.data.size
        ? `app-button--${this.data.size}`
        : '';
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
@import "AppButton";
</style>
