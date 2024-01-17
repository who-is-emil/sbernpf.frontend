<template>
  <div
    class="app-accordion"
    :class="{'app-accordion--active' : active}"
  >
    <button
      type="button"
      class="app-accordion__button"
      :aria-expanded="ariaExpanded"
      @click="toggle"
    >
      {{ title }}
    </button>
    <collapse-transition>
      <div
        v-show="active"
        class="app-accordion__content"
      >
        <div
          class="app-accordion__text user-text"
          v-html="text"
        />
      </div>
    </collapse-transition>
  </div>
</template>

<script>
import { CollapseTransition } from '@ivanv/vue-collapse-transition';

export default {
  name: 'AppAccordion',
  components: { CollapseTransition },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      active: false
    };
  },
  computed: {
    title () {
      return this.data.title || '';
    },
    text () {
      return this.data.text || '';
    },
    ariaExpanded () {
      if (this.active) {
        return 'true';
      }

      return 'false';
    }
  },
  methods: {
    toggle () {
      this.active = !this.active;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "AppAccordion";
</style>
