<template>
  <div id="cardProgram" class="app-card-program" data-aos="fade" data-aos-delay="100">
    <div class="app-card-program__background" />
    <div class="app-card-program__content">
      <h2 class="app-card-program__title">
        <span v-for="(item, idx) in title" :key="idx">
          {{ item }}
        </span>
      </h2>
      <div class="app-card-program__action">
        <AppButton :data="action" @click="clickAction" />
      </div>
      <p v-if="caption" class="app-card-program__caption">
        {{ caption }}
      </p>
    </div>
    <div class="app-card-program__image">
      <AppImage :data="image" />
    </div>
  </div>
</template>

<script>
import AppButton from '~/components/AppButton/AppButton';
import AppImage from '~/components/AppImage/AppImage';
export default {
  name: 'AppCardProgram',
  components: { AppImage, AppButton },
  data () {
    return {
      title: ['Получите тройную выгоду', 'от ваших сбережений'],
      action: {
        title: 'Оформить программу',
        text: 'Оформить программу',
        href: 'https://sberbank.com/sms/promo_pds?utm_source=sbernpfsite&utm_medium=pdspage&utm_campaign=getpdscontract&utm_content=banner',
        external: true
      },
      caption: '',
      image: {
        alt: 'Получите тройную выгоду от ваших сбережений',
        src: 'images/card-program/image-1.png',
        srcset: ['images/card-program/image-1.png', 'images/card-program/image-1@2x.png']
      }
    };
  },
  methods: {
    clickAction () {
      const _tmr = window._tmr || (window._tmr = []);
      _tmr.push({ type: 'reachGoal', id: 2866471, goal: 'click_apply-program' });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "AppCardProgram";
</style>
