<template>
  <a
    v-if="href"
    v-scroll-to="target ? target : false"
    :href="href"
    :class="['app-button', theme, size]"
    :title="title"
    :target="external ? '_blank' : false"
  >
    <span class="app-button__text">{{ text }}</span>
  </a>
  <button
    v-else
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
    href () {
      return this.data.href || false;
    },
    target () {
      return this.data.target || false;
    },
    text () {
      return this.data.text || '';
    },
    title () {
      return this.data.title || this.text;
    },
    external () {
      return this.data.external || false;
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
