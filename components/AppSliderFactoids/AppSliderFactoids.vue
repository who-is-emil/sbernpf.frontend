<template>
  <div class="app-slider-factoids">
    <div class="app-slider-factoids__container container">
      <div class="app-slider-factoids__content">
        <div class="app-slider-factoids__top">
          <h2 v-if="title" class="app-slider-factoids__title" data-aos="fade" data-aos-delay="100">
            <span v-for="(item, idx) in title" :key="idx">
              {{ item }}
            </span>
          </h2>

          <p v-if="text" class="app-slider-factoids__text" data-aos="fade" data-aos-delay="100" v-html="text" />
        </div>

        <div class="app-slider-factoids__base" data-aos="fade" data-aos-delay="200">
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

        <div class="app-slider-factoids__pagination" data-aos="fade" data-aos-delay="200">
          <AppSliderPagination :data="pagination" />
        </div>

        <div class="app-slider-factoids__bottom" data-aos="fade" data-aos-delay="200">
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

          <div v-if="action" class="app-slider-factoids__action" data-aos="fade" data-aos-delay="200">
            <AppButton :data="action" />
          </div>
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
      text: 'Расскажем на примере как&nbsp;утроить сбережения с&nbsp;помощью господдержки',
      action: {
        text: 'Оформить программу',
        title: 'Оформить программу',
        theme: 'gradient',
        external: true,
        href: 'https://sberbank.com/sms/promo_pds?utm_source=sbernpfsite&utm_medium=pdspage&utm_campaign=getpdscontract&utm_content=banner'
      },
      items: [
        {
          title: 'Ваши взносы',
          value: '3 000 ₽',
          text: 'в месяц',
          description: '12 ежемесячных взносов в году на 10 лет',
          icon: '24/plus'
        },
        {
          title: 'Софинансирование от&nbsp;государства',
          value: '360 000 ₽',
          text: 'за 10 лет',
          description: 'Первые 10 лет государство софинансирует до 36 000 ₽ в&nbsp;год',
          icon: '24/plus'
        },
        {
          title: 'Инвестиционный доход',
          value: '313 319 ₽',
          text: 'за 10 лет',
          description: 'СберНПФ инвестирует ваши сбережения и&nbsp;начислит доход на счёт',
          icon: '24/plus'
        },
        {
          title: 'Налоговый вычет при&nbsp;вложении в&nbsp;программу',
          value: '52 989 ₽',
          text: 'за 10 лет',
          description: 'Размер вычета зависит от&nbsp;взносов',
          icon: '24/equals',
          tooltip: {
            icon: '24/info-stroke',
            iconTheme: 'white',
            text: 'При вложении Налогового вычета как взнос вы&nbsp;получите повышенный налоговый вычет в&nbsp;следующем году, а также заработаете дополнительный инвестиционный доход. Максимально получить можно 52&nbsp;000&nbsp;₽ в&nbsp;год, если внести 400&nbsp;000&nbsp;₽ или больше.'
          }
        },
        {
          title: 'Ваш финансовый результат',
          value: '1 086 308 ₽',
          text: 'за 10 лет',
          description: 'Ваш общий доход составит&nbsp;более 200%',
          tooltip: {
            icon: '24/info-stroke',
            iconTheme: 'white',
            text: 'Расчет произведен, как будто клиент начал вкладывать взносы с&nbsp;начала года. Обращаем внимание, что государство будет рассчитывать софинансирование от&nbsp;суммы личных взносов, произведенных за&nbsp;«календарный год» от&nbsp;1 января до&nbsp;31 декабря. Обращайте на это внимание.'
          }
        }
      ],
      caption: 'при расчете принимается среднегодовая доходность 7% при инвестировании активов. Является прогнозом.',

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
  beforeDestroy () {
    this.sliderInstance.destroy();
    this.sliderInstance = null;
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
