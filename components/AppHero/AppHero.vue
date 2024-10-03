<template>
  <div
    id="hero"
    class="app-hero"
    :class="{'app-hero--timer-disable' : !timer}"
  >
    <div class="app-hero__base">
      <div class="app-hero__background" />
      <div class="app-hero__content">
        <div class="app-hero__image" data-aos="fade" data-aos-delay="100">
          <AppImage :data="image" />
        </div>

        <div class="app-hero__info">
          <h1 class="app-hero__title" data-aos="fade" data-aos-delay="200">
            <span v-for="(item, idx) in title" :key="idx">
              {{ item }}
            </span>
          </h1>

          <p v-if="text" class="app-hero__text" data-aos="fade" data-aos-delay="200" v-html="text" />
        </div>
      </div>
    </div>
    <div v-if="timer" class="app-hero__timer" data-aos="fade" data-aos-delay="300">
      <AppTimer @newYear="newYear" />
    </div>
    <div class="app-hero__items" data-aos="fade" data-aos-delay="300">
      <div v-for="(item, idx) in items" :key="idx" class="app-hero__item">
        <AppCardAction :data="item" />
      </div>
    </div>
  </div>
</template>

<script>
import AppImage from '~/components/AppImage/AppImage';
import AppCardAction from '~/components/AppCardAction/AppCardAction';
import AppTimer from '~/components/AppTimer/AppTimer';

export default {
  name: 'AppHero',
  components: { AppTimer, AppCardAction, AppImage },
  data () {
    return {
      timer: false,
      title: ['Разморозьте', 'свои пенсионные', 'накопления'],
      text: 'Участвуйте в розыгрыше автомобиля и сотни классных призов',
      items: [
        {
          title: '«Разморозьте» пенсионные накопления и&nbsp;сделайте их&nbsp;частью своего капитала',
          action: {
            text: 'Рассчитать',
            title: 'Рассчитать',
            icon: '24/circle-arrow-right',
            href: '#',
            target: '#calculator'
          },
          icon: '80/up'
        },
        {
          title: 'Создайте финансовый фундамент для жизни',
          action: {
            text: 'Узнать больше',
            title: 'Узнать больше',
            icon: '24/circle-arrow-right',
            href: '#',
            target: '#how'
          },
          icon: '80/rub'
        },
        {
          title: 'Храните сбережения в&nbsp;разных «корзинах»',
          action: {
            text: 'Начать копить',
            title: 'Начать копить',
            icon: '24/circle-arrow-right',
            href: '#',
            target: '#cardProgram'
          },
          icon: '80/mark'
        }
      ],
      image: {
        src: 'images/hero/image-1.png',
        alt: 'Разморозьте свои пенсионные накопления'
      }
    };
  },
  methods: {
    newYear () {
      this.timer = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "AppHero";
</style>
