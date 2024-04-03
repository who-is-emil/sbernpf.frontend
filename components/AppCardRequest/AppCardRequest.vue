<template>
  <div class="app-card-request" data-aos="fade" data-aos-delay="100">
    <div class="app-card-request__background" />
    <div class="app-card-request__content">
      <h2 class="app-card-request__title">
        <span v-for="(item, idx) in title" :key="idx" v-html="item" />
      </h2>

      <div class="app-card-request__action">
        <AppButton :data="action" @click="clickAction" />
      </div>
    </div>
    <div class="app-card-request__image">
      <AppImage :data="image" />
    </div>
  </div>
</template>

<script>
import AppImage from '~/components/AppImage/AppImage';
import AppButton from '~/components/AppButton/AppButton';
export default {
  name: 'AppCardRequest',
  components: { AppButton, AppImage },
  data () {
    return {
      title: ['Начните копить', 'уже сегодня и&nbsp;приобретите полезную привычку'],
      action: {
        title: 'Оформить программу',
        text: 'Оформить программу',
        href: 'https://sberbank.com/sms/promo_pds?utm_source=sbernpfsite&utm_medium=pdspage&utm_campaign=getpdscontract&utm_content=banner',
        external: true,
        theme: 'gradient'
      },
      image: {
        alt: 'Начните копить уже сегодня и приобретите полезную привычку',
        src: 'images/card-request/image-1.png',
        srcset: ['images/card-request/image-1.png', 'images/card-request/image-1@2x.png']
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
@import "AppCardRequest";
</style>
