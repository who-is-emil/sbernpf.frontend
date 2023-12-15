<template>
  <div class="app-program">
    <div class="app-program__background">
      <AppImage :data="gradient" />
    </div>
    <div class="app-program__container container">
      <div id="about" class="app-program__slider">
        <AppSliderFactoid />
      </div>

      <div id="advantages" class="app-program__features">
        <AppFeatures />
      </div>
    </div>
  </div>
</template>

<script>

import AppSliderFactoid from '~/components/AppSliderFactoids/AppSliderFactoids';
import AppFeatures from '~/components/AppFeatures/AppFeatures';
import AppImage from '~/components/AppImage/AppImage';
export default {
  name: 'AppProgram',
  components: { AppImage, AppFeatures, AppSliderFactoid },
  data () {
    return {
      gradient: {
        src: 'images/gradient/gradient-1.jpg'
      }
    };
  }
};
</script>

<style lang="scss" scoped>
@import "AppProgram";
</style>
