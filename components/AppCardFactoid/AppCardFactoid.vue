<template>
  <div class="app-card-factoid">
    <h4 v-if="title" class="app-card-factoid__title">
      {{ title }}
    </h4>
    <p v-if="value" class="app-card-factoid__value h2">
      {{ value }}
    </p>
    <p v-if="text" class="app-card-factoid__text">
      {{ text }}
    </p>
    <p v-if="description" class="app-card-factoid__description">
      <span v-html="description" />
      <template v-if="tooltip">
        <AppTooltip :data="tooltip" />
      </template>
    </p>
  </div>
</template>

<script>
import AppTooltip from '~/components/AppTooltip/AppTooltip';
export default {
  name: 'AppCardFactoid',
  components: { AppTooltip },
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
    value () {
      return this.data.value || '';
    },
    text () {
      return this.data.text || '';
    },
    tooltip () {
      return this.data.tooltip || false;
    },
    description () {
      return this.data.description || '';
    }
  }
};
</script>

<style lang="scss" scoped>
@import "AppCardFactoid";
</style>
