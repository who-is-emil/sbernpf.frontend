<template>
  <div id="promo" class="app-promo" data-aos="fade" data-aos-delay="100">
    <div class="app-promo__content">
      <h2 v-if="title" class="app-promo__title">
        <span v-for="(item, idx) in title" :key="idx" v-html="item" />
      </h2>

      <p v-if="text" class="app-promo__text" v-html="text" />

      <div class="app-promo__actions">
        <div v-for="(action, idx) in actions" :key="idx" class="app-promo__action">
          <AppButton :data="action" />
        </div>
      </div>
    </div>

    <div v-if="image" class="app-promo__image">
      <AppImage :data="image" />
    </div>
  </div>
</template>

<script>
import AppButton from '~/components/AppButton/AppButton';
import AppImage from '~/components/AppImage/AppImage';

export default {
  name: 'AppPromo',
  components: { AppImage, AppButton },
  data () {
    return {
      title: ['Участвуйте в&nbsp;розыгрыше', 'автомобиля и&nbsp;ценных призов!'],
      text: 'Станьте участником программы. Переведите свои пенсионные накопления в&nbsp;программу и получите шанс&nbsp;выиграть ценные призы.',
      actions: [
        {
          title: 'Оформить программу',
          text: 'Оформить программу',
          href: 'https://sberbank.com/sms/promo_pds?utm_source=sbernpfsite&utm_medium=pdspage&utm_campaign=getpdscontract&utm_content=banner',
          theme: 'gradient',
          external: true
        },
        {
          title: 'Подробнее о розыгрыше',
          text: 'Подробнее о розыгрыше',
          href: 'https://npfsberbanka.ru/auto2024/',
          external: true
        }
      ],
      image: {
        alt: '',
        src: 'images/promo/image-2.png'
      }
    };
  }
};
</script>

<style lang="scss" scoped>
@import "AppPromo";
</style>
