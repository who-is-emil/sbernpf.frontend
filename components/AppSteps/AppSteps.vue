<template>
  <div id="become" class="app-steps">
    <div class="app-steps__content">
      <h2 class="app-steps__title">
        <span v-for="(item, idx) in title" :key="idx">
          {{ item }}
        </span>
      </h2>

      <div class="app-steps__items">
        <div v-for="(item, idx) in items" :key="idx" class="app-steps__item">
          <span class="app-steps__counter" />
          <p class="app-steps__text">
            <span v-html="item.text" />

            <template v-if="item.tooltip">
              <AppTooltip :data="item.tooltip" />
            </template>
          </p>
        </div>
      </div>

      <div class="app-steps__action">
        <p class="app-steps__caption">
          {{ caption }}
        </p>

        <AppButton :data="action" />
      </div>
    </div>
  </div>
</template>

<script>
import AppButton from '~/components/AppButton/AppButton';
import AppTooltip from '~/components/AppTooltip/AppTooltip';

export default {
  name: 'AppSteps',
  components: { AppTooltip, AppButton },
  data () {
    return {
      title: ['Как стать участником', 'и получать от программы', 'максимум'],
      caption: 'Где находятся ваши накопления?',
      action: {
        text: 'Узнать',
        title: 'Узнать',
        href: '#!',
        theme: 'white',
        external: true
      },
      items: [
        {
          text: 'Заключите договор<br>со&nbsp;СберНПФ в 2024 году'
        },
        {
          text: 'Сделайте взнос на&nbsp;сумму от&nbsp;3&nbsp;000 ₽. Делайте взносы регулярно'
        },
        {
          text: 'По желанию переведите пенсионные накопления в&nbsp;программу',
          tooltip: {
            text: 'По желанию переведите пенсионные накопления в&nbsp;программу',
            icon: '24/info-stroke',
            iconTheme: 'black'
          }
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
@import "AppSteps";
</style>
