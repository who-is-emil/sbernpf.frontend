<template>
  <a
    v-if="href"
    v-scroll-to="target ? target : false"
    :href="href"
    :class="['app-button-text', className, theme]"
    :title="title"
  >
    <span class="app-button-text__text">
      {{ text }}
    </span>
    <span v-if="icon" class="app-button-text__icon">
      <AppIcon :name="icon" />
    </span>
  </a>
  <button
    v-else
    :type="type"
    :class="['app-button-text', className, theme]"
    :title="title"
    @click="click"
  >
    <span class="app-button-text__text">
      {{ text }}
    </span>
    <span v-if="icon" class="app-button-text__icon">
      <AppIcon :name="icon" />
    </span>
  </button>
</template>

<script>
import AppIcon from '~/components/AppIcon/AppIcon';

export default {
  name: 'AppButtonText',
  components: { AppIcon },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    className () {
      return this.data.class || '';
    },
    href () {
      return this.data.href || false;
    },
    target () {
      return this.data.target || false;
    },
    type () {
      return this.data.type || 'button';
    },
    theme () {
      return !this.data.theme ? '' : `app-button-text--${this.data.theme}`;
    },
    text () {
      return this.data.text || '';
    },
    icon () {
      return this.data.icon || '';
    },
    title () {
      return this.data.title || this.text;
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
@import "AppButtonText";
</style>
