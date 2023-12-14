<template>
  <div class="app">
    <AppHeader />
    <div class="mb-lg-132 mb-md-64 mb-80">
      <div class="container">
        <AppHero />
      </div>
    </div>

    <div>
      <AppCategories />
    </div>
    <div class="mb-lg-128 mb-md-96 mb-80">
      <AppProgram />
    </div>
    <div class="mb-lg-112 mb-md-96 mb-80">
      <div class="container">
        <AppCardRequest />
      </div>
    </div>
    <div class="mb-lg-120 mb-md-144 mb-112">
      <AppCardLayout />
    </div>
    <div class="mb-lg-128 mb-md-96 mb-80 relative z-1">
      <AppCalculator />
    </div>
    <div class="mb-lg-176 mb-md-96 mb-80">
      <div class="container">
        <AppSteps />
      </div>
    </div>
    <div class="mb-lg-128 mb-md-96 mb-80">
      <div class="container">
        <AppCardProgram />
      </div>
    </div>
    <AppInfo />
    <div class="mb-lg-128 mb-md-144 mb-16">
      <div class="container">
        <AppCardInfo />
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
import AppInfo from '~/components/AppInfo/AppInfo';
import AppSteps from '~/components/AppSteps/AppSteps';
import AppCardRequest from '~/components/AppCardRequest/AppCardRequest';
import AppCardProgram from '~/components/AppCardProgram/AppCardProgram';
import AppCardInfo from '~/components/AppCardInfo/AppInfoCard';
import AppCardLayout from '~/components/AppCardLayout/AppCardLayout';
import AppHero from '~/components/AppHero/AppHero';
import AppProgram from '~/components/AppProgram/AppProgram';

export default {
  name: 'App',
  components: {
    AppProgram,
    AppHero,
    AppCardLayout,
    AppCardInfo,
    AppCardProgram,
    AppCardRequest,
    AppSteps,
    AppInfo,
    AppFooter,
    AppHeader,
    AppCategories,
    AppCalculator
  },
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
