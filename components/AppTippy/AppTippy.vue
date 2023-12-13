<template>
  <span class="app-tippy">
    <button v-tippy="content" class="app-tippy__icon">
      <AppIcon :name="icon" />
    </button>
  </span>
</template>
<script>
import AppIcon from '~/components/AppIcon/AppIcon';
export default {
  components: { AppIcon },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    icon () {
      return this.data.icon || '24/info';
    },
    text () {
      return this.data.text;
    },
    trigger () {
      return this.data.trigger || 'mouseenter';
    },
    theme () {
      return this.data.theme || 'white';
    },
    interactive () {
      return this.data.interactive || false;
    },
    content () {
      return {
        content: this.text,
        trigger: this.trigger,
        theme: this.theme,
        interactive: this.interactive
      };
    }
  }
};
</script>

<style lang="scss" scoped>
@import "AppTippy";
</style>
