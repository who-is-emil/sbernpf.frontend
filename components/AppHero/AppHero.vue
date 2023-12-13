<template>
  <div class="app-hero">
    <div class="app-hero__base">
      <div class="app-hero__background" />
      <div class="app-hero__content">
        <div class="app-hero__image">
          <AppImage :data="image" />
        </div>

        <div class="app-hero__info">
          <h1 class="app-hero__title">
            <span v-for="(item, idx) in title" :key="idx">
              {{ item }}
            </span>
          </h1>

          <p v-if="text" class="app-hero__text">
            {{ text }}
          </p>
        </div>
      </div>
    </div>
    <div class="app-hero__items">
      <div v-for="(item, idx) in items" :key="idx" class="app-hero__item">
        <AppCardAction :data="item" />
      </div>
    </div>
  </div>
</template>

<script>
import AppImage from '~/components/AppImage/AppImage';
import AppCardAction from '~/components/AppCardAction/AppCardAction';
export default {
  name: 'AppHero',
  components: { AppCardAction, AppImage },
  data () {
    return {
      title: ['Программа', 'долгосрочных', 'сбережений'],
      text: 'Копите на любые цели и получайте поддержку от государства',
      items: [
        {
          title: 'Создайте финансовый фундамент для жизни',
          action: {
            text: 'Узнать больше',
            title: 'Узнать больше',
            icon: '24/circle-arrow-right'
          },
          icon: '80/rub'
        },
        {
          title: 'Храните сбережения в&nbsp;разных «корзинах»',
          action: {
            text: 'Начать копить',
            title: 'Начать копить',
            icon: '24/circle-arrow-right'
          },
          icon: '80/mark'
        },
        {
          title: 'Управляйте пенсионными накоплениями',
          action: {
            text: 'Рассчитать',
            title: 'Рассчитать',
            icon: '24/circle-arrow-right'
          },
          icon: '80/up'
        }
      ],
      image: {
        src: 'images/hero/image-1.png',
        srcset: ['images/hero/image-1.png', 'images/hero/image-1@2x.png']
      }
    };
  }
};
</script>

<style lang="scss" scoped>
@import "AppHero";
</style>
