<template>
  <div class="app-card-program">
    <div class="app-card-program__background" />
    <div class="app-card-program__content">
      <h2 class="app-card-program__title">
        <span v-for="(item, idx) in title" :key="idx">
          {{ item }}
        </span>
      </h2>
      <div class="app-card-program__action">
        <AppButton :data="action" />
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
@import "AppCardProgram";
</style>
