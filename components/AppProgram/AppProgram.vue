<template>
  <div class="app-program">
    <div class="app-program__background">
      <AppImage :data="gradient" />
    </div>
    <div class="app-program__content">
      <div id="about" class="app-program__slider">
        <div v-if="isDesktop" class="app-program__slider--desk">
          <AppSliderCircle />
        </div>
        <div v-else class="app-program__slider--tablet">
          <AppSliderFactoid />
        </div>
      </div>

      <div id="advantages" class="app-program__features">
        <AppFeatures />
      </div>
    </div>
  </div>
</template>

<script>

// import _debounce from 'lodash.debounce';
import AppSliderFactoid from '~/components/AppSliderFactoids/AppSliderFactoids';
import AppFeatures from '~/components/AppFeatures/AppFeatures';
import AppImage from '~/components/AppImage/AppImage';
import AppSliderCircle from '~/components/AppSliderCircle/AppSliderCircle';

export default {
  name: 'AppProgram',
  components: { AppSliderCircle, AppImage, AppFeatures, AppSliderFactoid },
  data () {
    return {
      gradient: {
        src: 'images/gradient/gradient-1.jpg'
      },

      windowWidth: 0
    };
  },
  computed: {
    isDesktop () {
      return this.windowWidth >= 1025;
    }
  },
  mounted () {
    this.windowWidth = window.innerWidth;

    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth;
    });
  }
};
</script>

<style lang="scss" scoped>
@import "AppProgram";
</style>
