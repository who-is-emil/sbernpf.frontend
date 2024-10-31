<template>
  <div class="app-deposit">
    <div class="app-deposit__container">
      <div class="app-deposit__content">
        <h2 v-if="title" class="app-deposit__title">
          <span v-for="(item, idx) in title" :key="idx" v-html="item" />
        </h2>

        <p v-if="text" class="app-deposit__text" v-html="text" />

        <div v-if="action" class="app-deposit__action">
          <AppButton :data="action" />
        </div>
      </div>

      <div v-if="image" class="app-deposit__image">
        <AppImage :data="image" />
      </div>
    </div>
  </div>
</template>

<script>
import AppImage from '~/components/AppImage/AppImage';
import AppButton from '~/components/AppButton/AppButton';
export default {
  name: 'AppDeposit',
  components: { AppButton, AppImage },
  data () {
    return {
      title: ['Сохраняйте сбережения выгодно на&nbsp;вкладе «Забота о будущем»', 'со ставкой до 25% годовых'],
      text: 'Сделайте взнос на ПДС и откройте вклад<br> на 3, 6 или 12 месяцев — ставка не&nbsp;зависит от&nbsp;срока',
      action: {
        title: 'Подробнее о вкладе',
        text: 'Подробнее о вкладе',
        href: 'https://www.sberbank.com/ru/person/contributions/deposits/zabota_o_budushchem',
        external: true
      },
      image: {
        src: 'images/deposit/image-1.png'
      }
    };
  }
};
</script>

<style lang="scss" scoped>
@import "AppDeposit";
</style>
