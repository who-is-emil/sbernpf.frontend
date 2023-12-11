<template>
  <div class="app">
    <AppHeader />
    <AppCategories />
    <div class="mb-lg-128 mb-md-96 mb-80">
      <AppCalculator />
    </div>
    <br>
    <br>
    <AppInfo />
    <div class="mb-lg-128 mb-md-144 mb-56">
      <div class="container">
        <AppInfoCard />
      </div>
    </div>
    <br>
    <br>
    <AppFooter />
  </div>
</template>

<script>
import AppCalculator from '~/components/AppCalculator/AppCalculator';
import AppCategories from '~/components/AppCategories/AppCategories';
import AppHeader from '~/components/AppHeader/AppHeader';
import AppFooter from '~/components/AppFooter/AppFooter';
import AppInfoCard from '~/components/AppInfoCard/AppInfoCard';
import AppInfo from '~/components/AppInfo/AppInfo';

export default {
  name: 'App',
  components: { AppInfo, AppInfoCard, AppFooter, AppHeader, AppCategories, AppCalculator },
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
