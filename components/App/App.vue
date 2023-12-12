<template>
  <div class="app">
    <AppHeader />
    <div class="mb-lg-128 mb-md-144 mb-112">
      <AppCategories />
    </div>
    <div class="mb-lg-128 mb-md-96 mb-80">
      <AppCalculator />
    </div>
    <div class="mb-lg-176 mb-md-96 mb-80">
      <div class="container">
        <AppSteps />
      </div>
    </div>
    <div class="mb-lg-128 mb-md-96 mb-80">
      <div class="container">
        <AppProgramCard />
      </div>
    </div>
    <AppInfo />
    <div class="mb-lg-128 mb-md-144 mb-56">
      <div class="container">
        <AppInfoCard />
      </div>
    </div>
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
import AppSteps from '~/components/AppSteps/AppSteps';
import AppProgramCard from '~/components/AppProgramCard/AppProgramCard';

export default {
  name: 'App',
  components: { AppProgramCard, AppSteps, AppInfo, AppInfoCard, AppFooter, AppHeader, AppCategories, AppCalculator },
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
