<template>
  <div class="app-program">
    <div class="app-program__background">
      <span />
      <span />
      <span />
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
export default {
  name: 'AppProgram',
  components: { AppFeatures, AppSliderFactoid }
};
</script>

<style lang="scss" scoped>
@import "AppProgram";
</style>
