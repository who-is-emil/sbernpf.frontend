<template>
  <div class="app-card-action">
    <div class="app-card-action__content">
      <p v-if="title" class="app-card-action__title">
        {{ title }}
      </p>

      <div v-if="icon" class="app-card-action__icon">
        <AppIcon :name="icon" />
      </div>

      <div v-if="action" class="app-card-action__action">
        <AppButtonText :data="action" />
      </div>
    </div>
  </div>
</template>

<script>
import AppIcon from '~/components/AppIcon/AppIcon';
import AppButtonText from '~/components/AppButtonText/AppButtonText';
export default {
  name: 'AppCardAction',
  components: { AppButtonText, AppIcon },
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
    action () {
      return this.data.action;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "AppCardAction";
</style>
