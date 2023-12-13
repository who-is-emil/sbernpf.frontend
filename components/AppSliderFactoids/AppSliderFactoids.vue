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
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      sliderInstance: null,
      activeIndex: 0
    };
  },
  computed: {
    title () {
      return this.data.title || '';
    },
    text () {
      return this.data.text || '';
    },
    items () {
      return this.data.items || [];
    },
    pagination () {
      return {
        items: this.items.map((_, idx) => idx),
        activeIndex: this.activeIndex,
        theme: 'white'
      };
    },
    caption () {
      return this.data.caption || '';
    },
    action () {
      return this.data.action;
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
