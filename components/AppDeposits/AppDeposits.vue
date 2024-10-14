<template>
  <div class="app-deposits">
    <div class="app-deposits__background">
      <AppImage :data="image" />
    </div>
    <div class="app-deposits__content">
      <div class="app-deposits__container container">
        <div class="app-deposits__top">
          <h2 v-if="title" class="app-deposits__title">
            <span v-for="(item, idx) in title" :key="idx" v-html="item" />
          </h2>

          <p v-if="text" class="app-deposits__text" v-html="text" />
        </div>

        <div class="app-deposits__items">
          <div v-for="(item, idx) in items" :key="idx" class="app-deposits__item">
            <AppCardDeposit :data="item" />
          </div>
        </div>

        <div v-if="action" class="app-deposits__action">
          <AppButton :data="action" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppCardDeposit from '~/components/AppCardDeposit/AppCardDeposit';
import AppButton from '~/components/AppButton/AppButton';
import AppImage from '~/components/AppImage/AppImage';

export default {
  name: 'AppDeposits',
  components: { AppImage, AppButton, AppCardDeposit },
  data () {
    return {
      title: ['Для вас — вклад', 'со ставкой до 25%'],
      text: 'Предложение действует до&nbsp;31 января 2025 года в&nbsp;любом отделении Сбера',
      items: [
        {
          title: 'Внесите<br> от 50 000 ₽',
          icon: '80/up',
          text: 'Сумма взносов на ПДС начиная с&nbsp;15.10&nbsp;должна быть не&nbsp;меньше, чем&nbsp;на&nbsp;вкладе'
        },
        {
          title: 'Откройте вклад на 3,<br> 6, 9 или 12 месяцев',
          icon: '80/bag',
          text: 'Выбирайте любой срок — ставка&nbsp;одинаковая вне зависимости&nbsp;от&nbsp;срока'
        },
        {
          title: 'Зарабатывайте без&nbsp;ограничений',
          icon: '80/rub',
          text: 'Вкладов может<br>быть несколько'
        }
      ],
      action: {
        href: '#!',
        text: 'Выбрать отделение',
        title: 'Выбрать отделение',
        theme: 'gradient'
      },
      image: {
        alt: '',
        src: 'images/gradient/gradient-3.jpg'
      }
    };
  }
};
</script>

<style lang="scss" scoped>
@import "AppDeposits";
</style>
