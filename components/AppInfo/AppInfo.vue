<template>
  <div class="app-info">
    <div class="app-info__container container">
      <div class="app-info__base">
        <h2 class="app-info__title">
          <span v-for="(item, idx) in title" :key="idx">
            {{ item }}
          </span>
        </h2>

        <div class="app-info__col">
          <div class="app-info__items app-info__items--first">
            <div v-for="(item, idx) in firstItem" :key="idx" class="app-info__item">
              <h3 v-if="item.title" class="app-info__item-title">
                {{ item.title }}
              </h3>
              <p v-if="item.text" class="app-info__item-text">
                {{ item.text }}
              </p>
            </div>
          </div>

          <template v-if="restItems">
            <collapse-transition>
              <div v-show="restItemsShow" class="app-info__items">
                <div v-for="(item, idx) in restItems" :key="idx" class="app-info__item app-info__item--rest">
                  <h3 v-if="item.title" class="app-info__item-title">
                    {{ item.title }}
                  </h3>
                  <p v-if="item.text" class="app-info__item-text">
                    {{ item.text }}
                  </p>
                </div>
              </div>
            </collapse-transition>

            <div class="app-info__toggle" :class="{'app-info__toggle--show' : restItemsShow}">
              <AppButtonText :data="toggleAction" @click="toggle" />
            </div>
          </template>
        </div>
      </div>

      <div class="app-info__rows">
        <div
          v-for="(item, idx) in rows"
          :key="idx"
          class="app-info__row"
        >
          <div class="app-info__cell">
            <h4 v-if="item.title" class="app-info__row-title" v-html="item.title" />
          </div>
          <div class="app-info__cell">
            <p v-if="item.text" class="app-info__row-text">
              <span v-html="item.text" />

              <template v-if="item.tooltip">
                <AppTooltip :data="item.tooltip" />
              </template>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CollapseTransition } from '@ivanv/vue-collapse-transition';
import AppButtonText from '~/components/AppButtonText/AppButtonText';
import AppTooltip from '~/components/AppTooltip/AppTooltip';

export default {
  name: 'AppInfo',
  components: { AppTooltip, AppButtonText, CollapseTransition },
  data () {
    return {
      title: ['Позаботьтесь', 'о будущей пенсии'],
      items: [
        {
          title: 'C 2002 по 2013 год в России действовала смешанная пенсионная система',
          text: 'Пенсия россиян формировалась из двух частей — страховой и накопительной. Одна часть средств шла на выплаты действующим пенсионерам, а другая — копилась на индивидуальных счетах россиян.'
        },
        {
          title: 'С 2014 года пенсионная система изменилась',
          text: 'Сегодня все страховые взносы работодателей идут на выплаты нынешним пенсионерам. Тем не менее, сформированные пенсионные накопления никуда не делись: они лежат на индивидуальных счетах под управлением выбранного пенсионного фонда — государственного или не государственного. Их можно перевести в программу долгосрочных сбережений и сделать частью своего капитала.'
        }
      ],
      rows: [
        {
          title: 'Если пенсионные накопления находятся в&nbsp;СберНПФ',
          text: 'Переведите пенсионные накопления в&nbsp;программу до 1 декабря 2024 года',
          tooltip: {
            text: 'Ваши средства поступят на счёт до 31 марта 2025 года.',
            icon: '24/info-stroke',
            iconTheme: 'black'
          }
        },
        {
          title: 'Если пенсионные накопления — в&nbsp;другом фонде',
          text: 'Сначала переведите пенсионные накопления в СберНПФ не позднее 15 ноября 2024г. Это позволит уже в 2024 году подать заявление на перевод накоплений в программу',
          tooltip: {
            text: 'Как только средства окажутся в СберНПФ, сможете перевести их в программу.',
            icon: '24/info-stroke',
            iconTheme: 'black'
          }
        }
      ],
      restItemsShow: false,
      showMoreText: 'Показать ещё',
      hideText: 'Свернуть'
    };
  },
  computed: {
    firstItem () {
      return this.items.slice(0, 1);
    },
    restItems () {
      if (this.items.length <= 1) {
        return false;
      }

      return this.items.slice(1, this.items.length);
    },
    toggleText () {
      return this.restItemsShow ? this.hideText : this.showMoreText;
    },
    toggleAction () {
      return {
        text: this.toggleText,
        title: this.toggleText,
        icon: '24/circle-arrow-down'
      };
    }
  },
  methods: {
    toggle () {
      this.restItemsShow = !this.restItemsShow;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "AppInfo";
</style>
