<template>
  <div class="app-card-layout">
    <div class="app-card-layout__container container">
      <div class="app-card-layout__top">
        <h2 class="app-card-layout__title">
          <span v-for="(item, idx) in title" :key="idx">
            {{ item }}
          </span>
        </h2>
        <p class="app-card-layout__text">
          {{ text }}
        </p>
      </div>

      <div class="app-card-layout__swiper">
        <div ref="slider" class="swiper-container">
          <div class="app-card-layout__items swiper-wrapper">
            <div
              v-for="(item, idx) in itemsComputed"
              :key="idx"
              class="app-card-layout__item swiper-slide"
            >
              <AppCardFeature ref="card" :data="item" />
            </div>
          </div>

          <div class="app-card-layout__pagination">
            <AppSliderPagination :data="pagination" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _throttle from 'lodash.throttle';
import { Swiper } from 'swiper';
import { isDesktop } from '~/assets/js/breakpoints';
import AppCardFeature from '~/components/AppCardFeature/AppCardFeature';
import AppSliderPagination from '~/components/AppSliderPagination/AppSliderPagination';

export default {
  name: 'AppCardLayout',
  components: { AppSliderPagination, AppCardFeature },
  data () {
    return {
      title: ['Получайте выплаты', 'как вам удобно'],
      text: 'Вы можете воспользоваться только одним из вариантов',
      items: [
        {
          title: 'Единовременная выплата',
          icon: '80/rub',
          text: 'Получить её можно через 15 лет после того, как вступили в программу. Или в 55 лет у женщин и 60 — у мужчин'
        },
        {
          title: 'Регулярные выплаты',
          icon: '80/bag',
          text: 'Получить их тоже можно через 15 лет после того, как вступили в программу. Продолжительность выплат определяете вы сами от пяти лет и более, в том числе и пожизненная выплата'
        },
        {
          title: 'Дополнительные выплаты на пенсии',
          icon: '80/up',
          text: 'Получить их можно после 55 лет у женщин и 60 — у мужчин. Продолжительность выплат определяете вы сами — от пяти лет и более, в том числе и пожизненная выплата'
        },
        {
          title: 'Единовременная выплата',
          icon: '80/plus',
          text: 'При потере кормильца или на оплату лечения критического заболевания'
        }
      ],
      activeIndex: 0,
      sliderInstance: null,

      hoveredIndex: null
    };
  },
  computed: {
    pagination () {
      return {
        items: this.items.map((_, idx) => idx),
        activeIndex: this.activeIndex
      };
    },
    itemsComputed () {
      if (this.hoveredIndex === null) {
        return this.items;
      }

      if (!isDesktop()) {
        return this.items;
      }

      return this.items.map((item, idx) => {
        if (this.hoveredIndex === idx) {
          return {
            ...item,
            active: true
          };
        } else {
          return {
            ...item,
            inactive: true
          };
        }
      });
    }
  },
  mounted () {
    this.initSwiper();

    const cards = this.$refs.card?.map((item) => {
      return item.$el;
    });

    if (cards && cards.length) {
      cards.forEach((item, idx) => {
        item.addEventListener('mouseenter', _throttle(() => {
          this.hoveredIndex = idx;
        }, 50));

        item.addEventListener('mouseleave', _throttle(() => {
          this.hoveredIndex = null;
        }, 50));
      });
    }
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
    }
  }
};
</script>

<style lang="scss" scoped>
@import "AppCardLayout";
</style>
