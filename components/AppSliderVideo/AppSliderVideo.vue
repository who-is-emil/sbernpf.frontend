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
          <div class="app-slider-video__action">
            <AppButton :data="action" />
          </div>

          <div class="app-slider-video__arrows">
            <div class="app-slider-video__arrow">
              <AppButtonCircle
                :data="prev"
                @click="goToPrev"
              />
            </div>
            <div class="app-slider-video__arrow">
              <AppButtonCircle
                :data="next"
                @click="goToNext"
              />
            </div>
          </div>
          <div class="app-slider-video__swiper">
            <div ref="slider" class="swiper-container">
              <div class="app-slider-video__items swiper-wrapper">
                <div
                  v-for="(item, idx) in items"
                  :key="idx"
                  ref="slide"
                  class="app-slider-video__item swiper-slide"
                >
                  <div class="app-slider-video__frame">
                    <div class="app-slider-video__images">
                      <div
                        v-for="(image, imageIdx) in items"
                        :key="`image-${idx}-${imageIdx}`"
                        class="app-slider-video__image"
                        data-image
                        :class="{'is-active': imageIdx === idx,
                                 'is-current': imageIdx === idx}"
                      >
                        <div class="app-slider-video__image-wrap" data-image-wrap>
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

          <div class="app-slider-video__pagination">
            <AppSliderPagination :data="pagination" />
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
import AppButton from '~/components/AppButton/AppButton';
import AppButtonCircle from '~/components/AppButtonCircle/AppButtonCircle';
import AppSliderPagination from '~/components/AppSliderPagination/AppSliderPagination';

export default {
  name: 'AppSliderVideo',
  components: { AppSliderPagination, AppButtonCircle, AppButton, AppImage, AppIcon },
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
      action: {
        title: 'Оставить заявку',
        text: 'Оставить заявку',
        href: 'https://npfsberbanka.ru/pds/?utm_source=sbersite&utm_medium=pdsportal&utm_campaign=getlead&utm_content=1#subscription',
        external: true,
        theme: 'gradient'
      },

      iconPlay: '32/play',
      activeIndex: 0,

      activeImagesIndex: [],
      animate: false
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
    },
    pagination () {
      return {
        items: this.items.map((_, idx) => idx),
        activeIndex: this.activeIndex
      };
    },
    prev () {
      return {
        icon: '24/prev',
        title: 'Назад',
        theme: 'grey'
      };
    },
    next () {
      return {
        icon: '24/next',
        title: 'Вперед',
        theme: 'grey'
      };
    }
  },
  mounted () {
    this.initSwiper();

    this.activeImagesIndex = this.items.map((_, idx) => idx);
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
      this.slideChange('prev');
    },
    goToNext () {
      this.slideChange('next');
    },

    slideChange (direction) {
      if (this.animate) {
        return;
      }

      const slides = this.$refs.slide;

      slides.forEach((slide, slideIdx) => {
        const images = slide.querySelectorAll('[data-image]');

        this.animation(direction, images, slideIdx);
      });
    },
    animation (direction, images, slideIdx) {
      this.animate = true;

      const prevImageIndex = this.activeImagesIndex[slideIdx];
      let currentImageIndex;
      const imagesCount = images.length;

      if (direction === 'next') {
        if (prevImageIndex === imagesCount - 1) {
          this.$set(this.activeImagesIndex, slideIdx, 0);
          currentImageIndex = 0;
        } else {
          this.$set(this.activeImagesIndex, slideIdx, prevImageIndex + 1);
          currentImageIndex = prevImageIndex + 1;
        }
      } else if (prevImageIndex === 0) {
        this.$set(this.activeImagesIndex, slideIdx, imagesCount - 1);
        currentImageIndex = imagesCount - 1;
      } else {
        this.$set(this.activeImagesIndex, slideIdx, prevImageIndex - 1);
        currentImageIndex = prevImageIndex - 1;
      }

      const timeline = this.$gsap.timeline({
        paused: true,
        onStart: () => {
          images.forEach((image, idx) => {
            if (idx === currentImageIndex) {
              image.classList.add('new-active');
              image.classList.remove('is-active');
            } else if (idx === prevImageIndex) {
              image.classList.add('is-active');
              image.classList.remove('new-active');
            } else {
              image.classList.remove('new-active');
              image.classList.remove('is-active');
            }
          });
        },
        onComplete: () => {
          this.animate = false;
        }
      });

      const duration = 1.25;
      const opacityMin = 0.5;
      const scaleMax = 1.2;
      const ease = 'power1.out';

      const imageWrapPrev = images[prevImageIndex].querySelector('[data-image-wrap]');

      if (direction === 'next') {
        timeline.fromTo(images[prevImageIndex],
          { x: 0, scale: 1 },
          { x: '-100%', scale: scaleMax, duration, ease })
          .fromTo(imageWrapPrev, { opacity: 1 },
            {
              opacity: opacityMin,
              duration,
              ease,
              onComplete: () => {
                this.$gsap.set(imageWrapPrev, { opacity: 1 });
              }
            }, 0)
          .fromTo(images[currentImageIndex],
            { x: '100%', scale: scaleMax },
            { x: 0, scale: 1, duration, ease }, 0);
      } else {
        timeline.fromTo(images[prevImageIndex],
          { x: 0, scale: 1 },
          { x: '100%', scale: scaleMax, duration, ease })
          .fromTo(imageWrapPrev, { opacity: 1 },
            {
              opacity: opacityMin,
              duration,
              ease,
              onComplete: () => {
                this.$gsap.set(imageWrapPrev, { opacity: 1 });
              }
            }, 0)
          .fromTo(images[currentImageIndex],
            { x: '-100%', scale: scaleMax },
            { x: 0, scale: 1, duration, ease }, 0);
      }

      timeline.play();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "AppSliderVideo";
</style>
