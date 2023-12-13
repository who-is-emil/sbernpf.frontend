<template>
  <div class="app-program">
    <div class="app-program__background">
      <span />
      <span />
      <span />
    </div>
    <div class="app-program__container container">
      <div class="app-program__slider">
        <AppSliderFactoid :data="slider" />
      </div>

      <div class="app-program__features">
        <AppFeatures :data="features" />
      </div>
    </div>
  </div>
</template>

<script>

import AppSliderFactoid from '~/components/AppSliderFactoids/AppSliderFactoids';
import AppFeatures from '~/components/AppFeatures/AppFeatures';
export default {
  name: 'AppProgram',
  components: { AppFeatures, AppSliderFactoid },
  data () {
    return {
      slider: {
        title: ['Из чего состоит', 'программа'],
        text: 'Расскажем на примере как&nbsp;удвоить сбережения с&nbsp;помощью господдержки',
        action: {
          text: 'Оставить заявку',
          title: 'Оставить заявку',
          theme: 'gradient',
          href: '#!'
        },
        items: [
          {
            title: 'Ваши взносы',
            value: '36 000 ₽',
            text: 'ежегодно',
            description: 'По желанию можно делать ежемесячные взносы в&nbsp;размере 3 000 ₽',
            icon: '24/plus'
          },
          {
            title: 'Софинансирование от государства',
            value: '108 000 ₽',
            text: 'за 3 года',
            description: 'Первые 3 года государство софинансирует до 36 000 ₽ в год',
            icon: '24/plus'
          },
          {
            title: 'Инвестиционный доход',
            value: '66 025 ₽',
            text: 'за 5 лет',
            description: 'СберНПФ инвестирует ваши накопления и начислит доход на счёт',
            icon: '24/plus'
          },
          {
            title: 'Возврат налога',
            value: '23 400 ₽',
            text: 'за 5 лет',
            description: 'Размер вычета зависит от взносов',
            icon: '24/equals'
          },
          {
            title: 'Итоговая сумма накоплений',
            value: '377 425 ₽',
            text: 'за 5 лет',
            description: 'Ваш общий доход составит более 100%'
          }
        ],
        caption: 'при расчете принимается среднегодовая доходность 7% при инвестировании активов. Является прогнозом, не гарантирована'
      },
      features: {
        title: 'В чём преимущества',
        text: 'Государство увеличит ваши накопления в первые три года. Получайте ежегодно до 36 000 ₽. Узнайте, каким будет ваш дополнительный доход',
        action: {
          title: 'Рассчитать доход',
          text: 'Рассчитать доход',
          href: '#!'
        },
        items: [
          {
            text: 'Гарантированная поддержка от государства'
          },
          {
            text: 'Счет застрахован в АСВ'
          },
          {
            text: 'Поддержка в сложных ситуациях'
          },
          {
            text: 'Пенсионные накопления в ваших руках'
          },
          {
            text: 'Дополнительный доход'
          },
          {
            text: 'Защита капитала'
          }
        ]
      }
    };
  }
};
</script>

<style lang="scss" scoped>
@import "AppProgram";
</style>
