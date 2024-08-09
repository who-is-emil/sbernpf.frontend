<template>
  <div class="app-categories">
    <div class="app-categories__container container">
      <h2 class="app-categories__title" data-aos="fade" data-aos-delay="100">
        <span v-for="(item, idx) in title" :key="idx">
          {{ item }}
        </span>
      </h2>
      <div class="app-categories__swiper" data-aos="fade" data-aos-delay="200">
        <div ref="slider" class="swiper-container">
          <div class="app-categories__items swiper-wrapper">
            <div
              v-for="(item, idx) in items"
              :key="idx"
              class="app-categories__item swiper-slide"
            >
              <AppCardCategory :data="item" />
            </div>
          </div>

          <div class="app-categories__pagination">
            <AppSliderPagination :data="pagination" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper } from 'swiper';
import AppCardCategory from '~/components/AppCardCategory/AppCardCategory';
import AppSliderPagination from '~/components/AppSliderPagination/AppSliderPagination';

export default {
  name: 'AppCategories',
  components: { AppSliderPagination, AppCardCategory },
  data () {
    return {
      title: ['Кому', 'это подходит'],
      items: [
        {
          image: {
            alt: 'молодым людям',
            src: 'images/card-category/image-1.png',
            srcset: ['images/card-category/image-1.png', 'images/card-category/image-1@2x.png']
          },
          label: 'молодым людям',
          title: '18—30 лет',
          text: 'Научиться копить на большие мечты'
        },
        {
          image: {
            alt: 'взрослым',
            src: 'images/card-category/image-2.png',
            srcset: ['images/card-category/image-2.png', 'images/card-category/image-2@2x.png']
          },
          label: 'взрослым',
          title: '30—55 лет',
          text: '«Разморозить» и&nbsp;забрать пенсионные накопления '
        },
        {
          image: {
            alt: 'старшему поколению',
            src: 'images/card-category/image-3.png',
            srcset: ['images/card-category/image-3.png', 'images/card-category/image-3@2x.png']
          },
          label: 'старшему поколению',
          title: 'от 55 лет',
          text: 'Перевести накопительную пенсию и&nbsp;увеличить  выплаты'
        }
      ],
      sliderInstance: null,
      activeIndex: 0
    };
  },
  computed: {
    pagination () {
      return {
        items: this.items.map((_, idx) => idx),
        activeIndex: this.activeIndex
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
    }
  }
};
</script>

<style lang="scss" scoped>
@import "AppCategories";
</style>
