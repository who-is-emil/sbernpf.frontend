<template>
  <button
    type="button"
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
    theme () {
      return this.data.theme || '';
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
