<template>
  <div
    class="app-card-feature"
    :class="{'active': active, 'inactive' : inactive}"
  >
    <div class="app-card-feature__content">
      <div class="app-card-feature__top">
        <h4 v-if="title" class="app-card-feature__title">
          {{ title }}
        </h4>

        <div v-if="icon" class="app-card-feature__icon">
          <AppIcon :name="icon" />
        </div>
      </div>

      <p v-if="text" class="app-card-feature__text">
        <span v-html="text" />

        <template v-if="tooltip">
          <AppTooltip :data="tooltip" />
        </template>
      </p>
    </div>
  </div>
</template>

<script>
import AppIcon from '~/components/AppIcon/AppIcon';
import AppTooltip from '~/components/AppTippy/AppTooltip';
export default {
  name: 'AppCardFeature',
  components: { AppTooltip, AppIcon },
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
      return this.data.icon || false;
    },
    text () {
      return this.data.text || '';
    },
    active () {
      return this.data.active || false;
    },
    inactive () {
      return this.data.inactive || false;
    },
    tooltip () {
      return this.data.tooltip;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "AppCardFeature";
</style>
