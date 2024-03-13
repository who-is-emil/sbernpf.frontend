<template>
  <div class="app-slider-video">
    <div class="app-slider-video__container container">
      <div class="app-slider__content">
        <div class="app-slider-video__top" data-aos="fade" data-aos-delay="100">
          <h2 class="app-slider-video__title">
            <span v-for="(item, idx) in title" :key="idx">
              {{ item }}
            </span>
          </h2>

          <p class="app-slider-video__text" v-html="text" />
        </div>

        <div class="app-slider-video__base" data-aos="fade" data-aos-delay="200">
          <div class="app-slider-video__action">
            <AppButton :data="action" @click="clickAction" />
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
                  v-for="(_, idx) in items"
                  :key="idx"
                  ref="slide"
                  class="app-slider-video__item swiper-slide"
                >
                  <div class="app-slider-video__frame">
                    <div class="app-slider-video__images">
                      <div
                        v-for="(item, itemIdx) in items"
                        :key="`image-${idx}-${itemIdx}`"
                        class="app-slider-video__image"
                        data-image
                        :class="{'is-active': itemIdx === idx,
                                 'is-current': itemIdx === idx}"
                      >
                        <button type="button" class="app-slider-video__image-wrap" data-image-wrap @click="showModal(itemIdx)">
                          <AppImage :data="item.image" />
                        </button>
                      </div>
                    </div>

                    <div class="app-slider-video__play">
                      <AppIcon name="32/play" />
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

    <modal
      name="video-modal"
      @closed="closedModal"
      @opened="openModal"
      @before-close="beforeCloseModal"
    >
      <div class="modal-content">
        <div class="modal-frame">
          <vue-plyr ref="plyr">
            <video
              controls
              crossorigin
              playsinline
              :data-poster="`${currentModalVideo.poster}`"
            >
              <source
                :src="`${currentModalVideo.video}`"
              />
            </video>
          </vue-plyr>
        </div>

        <button type="button" class="modal-close" @click="$modal.hide('video-modal')">
          <AppIcon name="24/close" />
        </button>
      </div>
    </modal>
  </div>
</template>

<script>
import { Swiper } from 'swiper';
import { _disableScroll, _enableScroll } from '~/assets/js/scroll';
import { setVh } from '~/assets/js/vhDefinition';
import { isMob } from '~/assets/js/breakpoints';
import AppButton from '~/components/AppButton/AppButton';
import AppButtonCircle from '~/components/AppButtonCircle/AppButtonCircle';
import AppSliderPagination from '~/components/AppSliderPagination/AppSliderPagination';
import AppImage from '~/components/AppImage/AppImage';
import AppIcon from '~/components/AppIcon/AppIcon';

export default {
  name: 'AppSliderVideo',
  components: { AppIcon, AppImage, AppSliderPagination, AppButtonCircle, AppButton },
  data () {
    return {
      title: ['Что такое программа ', 'долгосрочных сбережений?'],
      text: 'Посмотрите серию коротких роликов. Мы собрали в них всё самое важное о программе',
      currentModalVideoIdx: 0,

      items: [
        {
          title: 'Зачем нужен ПДС',
          image: {
            alt: 'Зачем нужен ПДС',
            src: 'images/slider-video/image-5.jpg'
          },
          video: 'https://sber.cdnvideo.ru/common/video/25b2c55d4af6239f.mp4',
          poster: '1470.jpg',
          active: true
        },
        {
          title: 'Сколько доплачивает государство',
          image: {
            alt: 'Сколько доплачивает государство',
            src: 'images/slider-video/image-4.jpg'
          },
          video: 'https://sber.cdnvideo.ru/common/video/d2da3b23cb585e4b.mp4',
          poster: '1469.jpg',
          active: false
        },
        {
          title: 'Налоговый вычет',
          image: {
            alt: 'Налоговый вычет',
            src: 'images/slider-video/image-3.jpg'
          },
          video: 'https://sber.cdnvideo.ru/common/video/7f232fae7fe42721.mp4',
          poster: '1468.jpg',
          active: false
        },
        {
          title: 'Что такое накопительная пенсия',
          image: {
            alt: 'Что такое накопительная пенсия',
            src: 'images/slider-video/image-2.jpg'
          },
          video: 'https://sber.cdnvideo.ru/common/video/595e3ed3e70f9809.mp4',
          poster: '1471.jpg',
          active: false
        },
        {
          title: 'Когда я получу сбережения',
          image: {
            alt: 'Когда я получу сбережения',
            src: 'images/slider-video/image-1.jpg'
          },
          video: 'https://sber.cdnvideo.ru/common/video/6aa5a00ff4341217.mp4',
          poster: '1467.jpg',
          active: false
        }
      ],
      action: {
        title: 'Оформить программу',
        text: 'Оформить программу',
        href: 'https://www.sberbank.com/sms/calculationpensionall?utm_source=sbernpfsite&utm_medium=pdspage&utm_campaign=getpdscontract&utm_content=banner',
        external: true,
        theme: 'gradient'
      },

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
    },
    currentModalVideo () {
      return this.items[this.currentModalVideoIdx];
    }
  },
  mounted () {
    this.initSwiper();

    this.activeImagesIndex = this.items.map((_, idx) => idx);

    setVh();
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
    },
    showModal (idx) {
      _disableScroll();

      this.currentModalVideoIdx = idx;

      this.$modal.show('video-modal');
    },
    openModal () {
      const player = this.$refs.plyr.player;
      player.play();

      player.on('enterfullscreen', () => {
        const modalWrap = document.querySelector('.vm--modal');
        if (modalWrap) {
          modalWrap.classList.add('has-fullscreen');
        };

        setVh();
      });

      window.addEventListener('orientationchange', () => {
        if (isMob) {
          player.fullscreen.exit();
        }
      });

      player.on('exitfullscreen', () => {
        const modalWrap = document.querySelector('.vm--modal');
        if (modalWrap) {
          modalWrap.classList.remove('has-fullscreen');
        };
      });
    },
    beforeCloseModal () {
      const player = this.$refs.plyr.player;
      player.destroy();
    },
    closedModal () {
      _enableScroll();

      window.dispatchEvent(new CustomEvent('st:refresh'));
    },
    clickAction () {
      const _tmr = window._tmr || (window._tmr = []);
      _tmr.push({ type: 'reachGoal', id: 2866471, goal: 'click_apply-program' });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "AppSliderVideo";
</style>
