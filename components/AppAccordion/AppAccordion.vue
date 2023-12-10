<template>
  <div class="aap-accordion">
    <button class="aap-accordion__header" @click="toggleItem">
      button
    </button>
    <transition name="height">
      <div v-show="isOpen" ref="content" class="aap-accordion__content">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error ipsum laboriosam nemo non perspiciatis.
        Consectetur cupiditate dolores labore nostrum numquam obcaecati quidem rem soluta, voluptate voluptatem. Dolorum
        laborum sunt tempora!
      </div>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'AppAccordion',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isOpen: false
    };
  },
  methods: {
    toggleItem () {
      const contentElement = this.$refs.content;
      contentElement.style.height = contentElement.scrollHeight + 'px';

      console.log(contentElement.scrollHeight);

      this.$nextTick(() => {
        this.isOpen = !this.isOpen;

        if (this.isOpen) {
          contentElement.style.height = 'auto';
        } else {
          contentElement.style.height = '';
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "AppAccordion";
</style>
