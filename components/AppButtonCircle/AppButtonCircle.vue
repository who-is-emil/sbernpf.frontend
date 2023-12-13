<template>
  <button
    type="button"
    class="app-button-circle"
    :title="title"
    :disabled="disabled"
    @click="click"
  >
    <span class="app-button-circle__icon">
      <AppIcon :name="icon" />
    </span>
  </button>
</template>

<script>
import AppIcon from '~/components/AppIcon/AppIcon';
export default {
  name: 'AppButtonCircle',
  components: { AppIcon },
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
    icon () {
      return this.data.icon;
    },
    disabled () {
      return this.data.disabled;
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
@import "AppButtonCircle";
</style>
