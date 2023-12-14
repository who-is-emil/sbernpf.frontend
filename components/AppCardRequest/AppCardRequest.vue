<template>
  <div class="app-card-request">
    <div class="app-card-request__background" />
    <div class="app-card-request__content">
      <h2 class="app-card-request__title">
        <span v-for="(item, idx) in title" :key="idx" v-html="item" />
      </h2>

      <div class="app-card-request__action">
        <AppButton :data="action" />
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
        title: 'Оставить заявку',
        text: 'Оставить заявку',
        href: 'https://npfsberbanka.ru/pds/#subscription',
        external: true,
        theme: 'gradient'
      },
      image: {
        src: 'images/card-request/image-1.png',
        srcset: ['images/card-request/image-1.png', 'images/card-request/image-1@2x.png']
      }
    };
  }
};
</script>

<style lang="scss" scoped>
@import "AppCardRequest";
</style>
