<template>
  <div class="app">
    <AppHeader />

    <div class="mb-lg-128 mb-md-96 mb-80 relative z-1">
      <AppCalculator />
    </div>

    <div class="mb-lg-132 mb-md-64 mb-80">
      <div class="container">
        <AppHero />
      </div>
    </div>
    <div class="mb-lg-120 mb-md-144 mb-112">
      <AppCategories />
    </div>
    <!--    <div class="mb-lg-120 mb-md-144 mb-112">-->
    <!--      <AppSliderVideo />-->
    <!--    </div>-->
    <div class="mb-lg-128 mb-md-96 mb-80">
      <AppProgram />
    </div>
    <div class="mb-lg-112 mb-md-96 mb-80">
      <div class="container">
        <AppCardRequest />
      </div>
    </div>
    <div class="mb-lg-120 mb-md-144 mb-112 relative z-1">
      <AppCardLayout />
    </div>
    <!--  Калькулятор здесь-->

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
    <div class="mb-lg-112 mb-md-96 mb-80">
      <AppInfo />
    </div>
    <div class="mb-lg-128 mb-md-144 mb-16">
      <div class="container">
        <AppCardInfo />
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import _debounce from 'lodash.debounce';
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
// import AppSliderVideo from '~/components/AppSliderVideo/AppSliderVideo';

export default {
  name: 'App',
  components: {
    // AppSliderVideo,
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

    window.addEventListener('touchmove', _debounce(() => {
      // TODO костыль, чтобы закрывать открытый typpy при свайпе на тач устройствах
      document.body.click();
    }, 100));
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
