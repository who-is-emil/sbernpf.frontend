<template>
  <div class="app">
    <AppHeader />
    <AppCategories />
    <AppCalculator />
    <AppQA />
    <AppFooter />
  </div>
</template>

<script>
import AppCalculator from '~/components/AppCalculator/AppCalculator';
import AppCategories from '~/components/AppCategories/AppCategories';
import AppHeader from '~/components/AppHeader/AppHeader';
import AppFooter from '~/components/AppFooter/AppFooter';
import AppQA from '~/components/AppQA/AppQA';

export default {
  name: 'App',
  components: { AppQA, AppFooter, AppHeader, AppCategories, AppCalculator },
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
