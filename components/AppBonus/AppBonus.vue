<template>
  <div
    id="bonus"
    class="app-bonus"
  >
    <div class="app-bonus__top">
      <h2 class="app-bonus__title" data-aos="fade" data-aos-delay="100">
        <span v-for="(item, idx) in title" :key="idx">
          <span v-html="item" />
        </span>
      </h2>
    </div>

    <div class="app-bonus__items">
      <div v-for="(item, idx) in items" :key="idx" class="app-bonus__item" data-aos="fade" data-aos-delay="100">
        <div class="app-bonus__col">
          <div v-if="item.icon" class="app-bonus__icon">
            <AppIcon :name="item.icon" />
          </div>
          <div v-else class="app-bonus__counter" />
        </div>
        <div class="app-bonus__col">
          <p class="app-bonus__text h5">
            <span v-html="item.text" />

            <template v-if="item.tooltip">
              <AppTooltip :data="item.tooltip" />
            </template>
          </p>
        </div>
        <div class="app-bonus__col">
          <p v-if="item.description" class="app-bonus__description" v-html="item.description" />
        </div>
      </div>
    </div>

    <div class="app-bonus__bottom" data-aos="fade" data-aos-delay="100">
      <p v-if="text" class="app-bonus__bottom-text">
        <span v-html="text" />
      </p>

      <div v-if="action" class="app-bonus__action">
        <AppButton :data="action" />
      </div>
    </div>
  </div>
</template>

<script>

import AppIcon from '~/components/AppIcon/AppIcon';
import AppTooltip from '~/components/AppTooltip/AppTooltip';
import AppButton from '~/components/AppButton/AppButton';
export default {
  name: 'AppBonus',
  components: { AppButton, AppTooltip, AppIcon },
  data () {
    return {
      title: ['Начните копить уже&nbsp;сегодня', 'и получите до 10&nbsp;000 бонусов СберСпасибо'],
      items: [
        {
          text: 'Заключите договор ПДС со СберНПФ в&nbsp;приложении «Сбербанк Онлайн»',
          tooltip: {
            icon: '24/info-stroke',
            iconTheme: 'black',
            text: 'Если Ваша версия СберБанк Онлайн не позволяет заключить договор, Вы можете принять участие в акции. Для этого необходимо обратиться в ближайшее отделение СберБанка. Условия отличаются, уточняйте у консультанта'
          }
        },
        {
          text: 'Сделайте взнос на сумму от 10 000 ₽'
        },
        {
          icon: '64/spasibo',
          text: 'Получите на счет до 10%, но не более&nbsp;10&nbsp;000 бонусов&nbsp;СберСпасибо',
          description: 'При соблюдении всех условий бонусы&nbsp;будут начислены с&nbsp;18.06.2024 по&nbsp;31.07.2024'
        }
      ],
      text: 'Начисление бонусов доступно только участникам программы «СберСпасибо».<br>Если вы не являетесь участником, пройдите&nbsp;регистрацию в <a href="https://sberbank.com/sms/promo_pds?utm_source=sbernpfsite&utm_medium=pdspage&utm_campaign=getpdscontract&utm_content=banner" target="_blank" rel="nofollow">Программе</a>.',
      action: {
        text: 'Участвовать',
        title: 'Участвовать',
        href: 'https://sberbank.com/sms/promo_pds?utm_source=sbernpfsite&utm_medium=pdspage&utm_campaign=getpdscontract&utm_content=banner',
        external: true,
        theme: 'gradient'
      }
    };
  }
};
</script>

<style lang="scss" scoped>
@import "AppBonus";
</style>
