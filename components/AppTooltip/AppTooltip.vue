<template>
  <span
    class="app-tooltip"
    :class="iconTheme"
  >
    <button
      ref="tippy"
      v-tippy="content"
      type="button"
      class="app-tooltip__icon"
    >
      <AppIcon :name="icon" />
    </button>
  </span>
</template>
<script>
import { isDesktop } from '~/assets/js/breakpoints';
import AppIcon from '~/components/AppIcon/AppIcon';
export default {
  name: 'AppTooltip',
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
      return this.data.trigger || isDesktop() ? 'mouseenter' : 'click';
    },
    theme () {
      return this.data.theme || 'white';
    },
    iconTheme () {
      const theme = this.data.iconTheme || '';

      return theme ? `app-tooltip--${theme}` : '';
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
@import "AppTooltip";
</style>
