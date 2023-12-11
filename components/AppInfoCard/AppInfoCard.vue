<template>
  <div class="app-info-card">
    <div class="app-info-card__background" />

    <div class="app-info-card__content">
      <h2 class="app-info-card__title">
        <span v-for="(item, idx) in title" :key="idx">
          {{ item }}
        </span>
      </h2>

      <div class="app-info-card__actions">
        <div v-for="(item, idx) in actions" :key="idx" class="app-info-card__action">
          <AppButton :data="item" />
        </div>
      </div>

      <div class="app-info-card__image">
        <AppImage :data="image" />
      </div>
    </div>
  </div>
</template>

<script>
import AppButton from '~/components/AppButton/AppButton';
import AppImage from '~/components/AppImage/AppImage';
export default {
  name: 'AppInfoCard',
  components: { AppImage, AppButton },
  data () {
    return {
      title: ['Вы знаете, где находятся ваши', 'пенсионные накопления?'],
      actions: [
        {
          title: 'Узнать в Сбербанк Онлайн',
          text: 'Узнать в Сбербанк Онлайн',
          href: '#!',
          theme: 'gradient'
        },
        {
          title: 'Запросить на Госуслугах',
          text: 'Запросить на Госуслугах',
          href: '#!'
        }
      ],
      image: {
        src: 'images/card-info/image-1.png',
        srcset: ['images/card-info/image-1.png', 'images/card-info/image-1@2x.png']
      }
    };
  }
};
</script>

<style lang="scss" scoped>
@import "AppInfoCard";
</style>
