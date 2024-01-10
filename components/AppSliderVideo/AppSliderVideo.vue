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
                        <div class="app-slider-video__image-wrap" data-image-wrap @click="showModal(itemIdx)">
                          <AppImage :data="item.image" />
                        </div>
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
    >
      <div class="modal-content">
        <div class="modal-frame">
          <iframe
            :src="`https://player.cdn.sber.cloud/aloha/players/basic_player_sbercloud1.html?account=kunuqupo80&amp;source=//sber-hls.cdnvideo.ru/sber-vod/_definst_/mp4:common/video/${currentModalVideo.video}/playlist.m3u8&amp;poster=https://sber.cdnvideo.ru/common/video/pds${currentModalVideo.poster}`"
            loading="eager"
            sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-top-navigation"
            allow="payment 'none'; fullscreen 'none'; geolocation 'none'; camera 'none'; microphone 'none'"
            importance="high"
            referrerpolicy="no-referrer-when-downgrade"
            frameborder="no"
            scrolling="no"
            :title="currentModalVideo.title"
          />
        </div>

        <button @click="$modal.hide('video-modal')">
          Close it
        </button>
      </div>
    </modal>
  </div>
</template>

<script>
import { Swiper } from 'swiper';
import { _disableScroll, _enableScroll } from '~/assets/js/scroll';
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
            src: 'images/slider-video/image-5.jpg'
          },
          video: '25b2c55d4af6239f.mp4',
          poster: '1470.jpg',
          active: true
        },
        {
          title: 'Сколько доплачивает государство',
          image: {
            src: 'images/slider-video/image-4.jpg'
          },
          video: 'd2da3b23cb585e4b.mp4',
          poster: '1469.jpg',
          active: false
        },
        {
          title: 'Налоговый вычет',
          image: {
            src: 'images/slider-video/image-3.jpg'
          },
          video: '7f232fae7fe42721.mp4',
          poster: '1468.jpg',
          active: false
        },
        {
          title: 'Что такое накопительная пенсия',
          image: {
            src: 'images/slider-video/image-2.jpg'
          },
          video: '595e3ed3e70f9809.mp4',
          poster: '1471.jpg',
          active: false
        },
        {
          title: 'Когда я получу сбережения',
          image: {
            src: 'images/slider-video/image-1.jpg'
          },
          video: '6aa5a00ff4341217.mp4',
          poster: '1467.jpg',
          active: false
        }
      ],
      action: {
        title: 'Оставить заявку',
        text: 'Оставить заявку',
        href: 'https://npfsberbanka.ru/pds/?utm_source=sbersite&utm_medium=pdsportal&utm_campaign=getlead&utm_content=1#subscription',
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
    closedModal () {
      _enableScroll();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "AppSliderVideo";
</style>
