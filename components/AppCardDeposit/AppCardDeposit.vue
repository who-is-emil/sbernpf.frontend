<template>
  <div class="app-card-deposit">
    <p v-if="title" class="app-card-deposit__title h4" v-html="title" />

    <p v-if="text" class="app-card-deposit__text" v-html="text" />

    <div v-if="icon" class="app-card-deposit__icon">
      <AppIcon :name="icon" />
    </div>
  </div>
</template>

<script>
import AppIcon from '~/components/AppIcon/AppIcon';
export default {
  name: 'AppCardDeposit',
  components: { AppIcon },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    title () {
      return this.data?.title || '';
    },
    text () {
      return this.data?.text || '';
    },
    icon () {
      return this.data?.icon || '';
    }
  }
};
</script>

<style lang="scss" scoped>
@import "AppCardDeposit";
</style>
