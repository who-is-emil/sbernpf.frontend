<template>
  <div class="app-slider-video">
    <div class="app-slider-video__container container">
      <div class="app-slider__content">
        <div class="app-slider-video__top">
          <h2 class="app-slider-video__title">
            <span v-for="(item, idx) in title" :key="idx">
              {{ item }}
            </span>
          </h2>

          <p class="app-slider-video__text" v-html="text" />
        </div>

        <div class="app-slider-video__base" data-aos="fade" data-aos-delay="200">
          <div class="app-slider-video__swiper">
            <div ref="slider" class="swiper-container">
              <div class="app-slider-video__items swiper-wrapper">
                <div
                  v-for="(item, idx) in items"
                  :key="idx"
                  class="app-slider-video__item swiper-slide"
                >
                  <div class="app-slider-video__frame">
                    <div class="app-slider-video__images">
                      <div
                        v-for="(image, imageIdx) in items"
                        :key="`image-${idx}-${imageIdx}`"
                        class="app-slider-video__image-wrap"
                      >
                        <div v-if="imageIdx === idx" class="app-slider-video__image app-slider-video__image--first">
                          <AppImage :data="image.image" />
                        </div>

                        <div v-else class="app-slider-video__image app-slider-video__image--rest">
                          <AppImage :data="image.image" />
                        </div>
                      </div>
                    </div>
                    <div class="app-slider-video__play">
                      <AppIcon :name="iconPlay" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper } from 'swiper';
import AppIcon from '~/components/AppIcon/AppIcon';
import AppImage from '~/components/AppImage/AppImage';

export default {
  name: 'AppSliderVideo',
  components: { AppImage, AppIcon },
  data () {
    return {
      title: ['Что такое программа ', 'долгосрочных сбережений?'],
      text: 'Посмотрите серию коротких роликов. Мы собрали в них всё самое важное о программе',
      items: [
        {
          image: {
            src: 'images/slider-video/image-1.jpg'
          }
        },
        {
          image: {
            src: 'images/slider-video/image-2.jpg'
          }
        },
        {
          image: {
            src: 'images/slider-video/image-3.jpg'
          }
        }
      ],

      iconPlay: '32/play',
      activeIndex: 0
    };
  },
  computed: {
    itemsComputed () {
      return this.items.map((item, idx) => {
        return {
          image: item.image,
          images: this.items.filter((item, filterIdx) => filterIdx !== idx)
        };
      });
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
@import "AppSliderVideo";
</style>
