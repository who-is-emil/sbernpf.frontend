<template>
  <div class="app-program-card">
    <div class="app-program-card__background" />
    <div class="app-program-card__content">
      <h2 class="app-program-card__title">
        <span v-for="(item, idx) in title" :key="idx">
          {{ item }}
        </span>
      </h2>
      <div class="app-program-card__action">
        <AppButton :data="action" />
      </div>
      <p v-if="caption" class="app-program-card__caption">
        {{ caption }}
      </p>
    </div>
    <div class="app-program-card__image">
      <AppImage :data="image" />
    </div>
  </div>
</template>

<script>
import AppButton from '~/components/AppButton/AppButton';
import AppImage from '~/components/AppImage/AppImage';
export default {
  name: 'AppProgramCard',
  components: { AppImage, AppButton },
  data () {
    return {
      title: ['Узнайте первым', 'о старте программы'],
      action: {
        title: 'Сообщить о запуске *',
        text: 'Сообщить о запуске *',
        href: '#!'
      },
      caption: '*Вы будете перенаправлены на сайт СберНПФ',
      image: {
        src: 'images/card-program/image-1.png',
        srcset: ['images/card-program/image-1.png', 'images/card-program/image-1@2x.png']
      }
    };
  }
};
</script>

<style lang="scss" scoped>
@import "AppProgramCard";
</style>
