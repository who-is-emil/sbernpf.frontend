<template>
  <div class="app-slider-factoids">
    <div class="app-slider-factoids__content">
      <div class="app-slider-factoids__top">
        <h2 v-if="title" class="app-slider-factoids__title">
          <span v-for="(item, idx) in title" :key="idx">
            {{ item }}
          </span>
        </h2>

        <p v-if="text" class="app-slider-factoids__text" v-html="text" />
      </div>

      <div class="app-slider-factoids__base">
        <div class="app-slider-factoids__swiper">
          <div ref="slider" class="swiper-container">
            <div class="app-slider-factoids__items swiper-wrapper">
              <div
                v-for="(item, idx) in items"
                :key="idx"
                class="app-slider-factoids__item swiper-slide"
              >
                <AppCardFactoid :data="item" />

                <div v-if="item.icon" class="app-slider-factoids__icon">
                  <AppIcon :name="item.icon" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="app-slider-factoids__pagination">
        <AppSliderPagination :data="pagination" />
      </div>

      <div class="app-slider-factoids__bottom">
        <p v-if="caption" class="app-slider-factoids__caption">
          {{ caption }}
        </p>

        <div class="app-slider-factoids__arrows">
          <div class="app-slider-factoids__arrow">
            <AppButtonCircle :data="prev" @click="goToPrev" />
          </div>
          <div class="app-slider-factoids__arrow">
            <AppButtonCircle :data="next" @click="goToNext" />
          </div>
        </div>

        <div v-if="action" class="app-slider-factoids__action">
          <AppButton :data="action" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper } from 'swiper';
import AppSliderPagination from '~/components/AppSliderPagination/AppSliderPagination';
import AppCardFactoid from '~/components/AppCardFactoid/AppCardFactoid';
import AppButtonCircle from '~/components/AppButtonCircle/AppButtonCircle';
import AppButton from '~/components/AppButton/AppButton';
import AppIcon from '~/components/AppIcon/AppIcon';

export default {
  name: 'AppSliderFactoid',
  components: { AppIcon, AppButton, AppButtonCircle, AppCardFactoid, AppSliderPagination },
  data () {
    return {
      title: ['Из чего состоит', 'программа'],
      text: 'Расскажем на примере как&nbsp;удвоить сбережения с&nbsp;помощью господдержки',
      action: {
        text: 'Оставить заявку',
        title: 'Оставить заявку',
        theme: 'gradient',
        external: true,
        href: 'https://npfsberbanka.ru/pds/#subscription'
      },
      items: [
        {
          title: 'Ваши взносы',
          value: '3 000 ₽',
          text: 'в месяц',
          description: '12 ежемесячных взносов в году на 5 лет',
          icon: '24/plus'
        },
        {
          title: 'Софинансирование от&nbsp;государства',
          value: '108 000 ₽',
          text: 'за 3 года',
          description: 'Первые 3 года государство софинансирует до 36 000 ₽ в&nbsp;год',
          icon: '24/plus'
        },
        {
          title: 'Инвестиционный доход',
          value: '63 101 ₽',
          text: 'за 5 лет',
          description: 'СберНПФ инвестирует ваши накопления и&nbsp;начислит доход на счёт',
          icon: '24/plus'
        },
        {
          title: 'Возврат налога',
          value: '26 093 ₽',
          text: 'за 5 лет',
          description: 'Размер вычета зависит от&nbsp;взносов',
          icon: '24/equals',
          tooltip: {
            icon: '24/info-stroke',
            iconTheme: 'white',
            text: 'При вложении Налогового вычета как взнос вы получите повышенный налоговый вычет в следующем году, а также заработаете дополнительный инвестиционный доход Максимально получить можно 52&nbsp;000 ₽ в год, если внести 400&nbsp;000 ₽ или больше.'
          }
        },
        {
          title: 'Ваш финансовый результат',
          value: '377 193 ₽',
          text: 'за 5 лет',
          description: 'Ваш общий доход составит&nbsp;более 100%'
        }
      ],
      caption: 'при расчете принимается среднегодовая доходность 7% при инвестировании активов. Является прогнозом, не гарантирована',
      sliderInstance: null,
      activeIndex: 0
    };
  },
  computed: {
    pagination () {
      return {
        items: this.items.map((_, idx) => idx),
        activeIndex: this.activeIndex,
        theme: 'white'
      };
    },
    prev () {
      return {
        icon: '24/prev',
        title: 'Назад',
        disabled: this.activeIndex === 0
      };
    },
    next () {
      return {
        icon: '24/next',
        title: 'Вперед',
        disabled: this.activeIndex === this.items.length - 1
      };
    }
  },
  mounted () {
    this.initSwiper();
  },
  methods: {
    initSwiper () {
      const swiperEl = this.$refs.slider;

      this.sliderInstance = new Swiper(swiperEl, {
        slidesPerView: 1,
        speed: 800,
        a11y: false,
        loop: false,
        on: {
          slideChange: ({ activeIndex }) => {
            this.activeIndex = activeIndex;
          }
        }
      });
    },
    goToPrev () {
      this.sliderInstance.slidePrev();
    },
    goToNext () {
      this.sliderInstance.slideNext();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "AppSliderFactoids";
</style>
