<template>
  <div class="app">
    <AppHeader />
    <AppCategories />
    <AppCalculator />
  </div>
</template>

<script>
import AppCalculator from '~/components/AppCalculator/AppCalculator';
import AppCategories from '~/components/AppCategories/AppCategories';
import AppHeader from '~/components/AppHeader/AppHeader';

export default {
  name: 'App',
  components: { AppHeader, AppCategories, AppCalculator },
  mounted () {
    this.resizeCheck();
  },
  methods: {
    resizeCheck () {
      let timer = 0;

      function start () {
        document.body.classList.add('resizing');
      }
      function stop () {
        document.body.classList.remove('resizing');
      }

      window.addEventListener('resize', function () {
        if (timer) {
          clearTimeout(timer);
        }

        timer = setTimeout(stop, 500);

        start();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "App";
</style>
