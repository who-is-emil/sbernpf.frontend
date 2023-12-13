<template>
  <div class="app-features">
    <h2 class="app-features__title">
      {{ title }}
    </h2>

    <div class="app-features__blocks">
      <div
        v-for="(item, idx) in items"
        :key="idx"
        ref="block"
        class="app-features__block"
      >
        <p v-if="item.text" class="app-features__text">
          {{ item.text }}
        </p>

        <div v-if="item.action" class="app-features__action">
          <AppButton :data="item.action" />
        </div>

        <div v-if="item.image" class="app-features__image">
          <AppImage :data="item.image" />
        </div>
      </div>
    </div>

    <div class="app-features__slider">
      <div class="app-features__swiper">
        <div ref="slider" class="swiper-container">
          <div class="app-features__items swiper-wrapper">
            <div
              v-for="(item, idx) in items"
              :key="idx"
              class="app-features__item swiper-slide"
            >
              <AppCardText
                :data="item"
                @click="toggle(idx)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="app-features__pagination">
      <AppSliderPagination :data="pagination" />
    </div>
  </div>
</template>

<script>
import { Swiper } from 'swiper';
import { isDesktop } from '~/assets/js/breakpoints';
import AppCardText from '~/components/AppCardText/AppCardText';
import AppButton from '~/components/AppButton/AppButton';
import AppImage from '~/components/AppImage/AppImage';
import AppSliderPagination from '~/components/AppSliderPagination/AppSliderPagination';

export default {
  name: 'AppFeatures',
  components: { AppSliderPagination, AppImage, AppButton, AppCardText },
  data () {
    return {
      title: 'В чём преимущества',
      items: [
        {
          title: 'Гарантированная поддержка от государства',
          text: 'Государство увеличит ваши накопления в первые три года. Получайте ежегодно до 36 000 ₽. Узнайте, каким будет ваш дополнительный доход',
          image: {
            src: 'images/features/image-1.png'
          },
          active: true,
          action: {
            title: 'Рассчитать доход',
            text: 'Рассчитать доход',
            href: '#!',
            theme: 'gradient'
          }
        },
        {
          title: 'Счет застрахован в АСВ',
          text: 'Агентство по страхованию вкладов защитит ваши сбережения на сумму до 2,8 млн ₽',
          image: {
            src: 'images/features/image-2.png'
          }
        },
        {
          title: 'Поддержка в сложных ситуациях',
          text: 'Оплатите дорогостоящее лечение или получите поддержку при потере кормильца',
          image: {
            src: 'images/features/image-3.png'
          }
        },
        {
          title: 'Пенсионные накопления в ваших руках',
          text: 'Переведите пенсионные накопления в активное управление. Где находятся ваши пенсионные накопления?',
          image: {
            src: 'images/features/image-4.png'
          },
          action: {
            title: 'Узнать',
            text: 'Узнать',
            href: '#!',
            theme: 'gradient'
          }
        },
        {
          title: 'Дополнительный доход',
          text: 'Возвращайте налоговый вычет — получайте до 52 000 ₽ за каждый год',
          image: {
            src: 'images/features/image-5.png'
          }
        },
        {
          title: 'Защита капитала',
          text: 'Ваши сбережения не уйдут в минус, а доход от инвестирования будет зафиксирован',
          image: {
            src: 'images/features/image-6.png'
          }
        }
      ],
      activeIndex: 0,
      prevActiveIndex: null
    };
  },
  computed: {
    pagination () {
      return {
        items: this.items.map((_, idx) => idx),
        activeIndex: this.activeIndex,
        theme: 'black'
      };
    }
  },
  mounted () {
    this.initSwiper();

    this.animation();
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

            if (!isDesktop()) {
              this.animation(activeIndex);
            }
          }
        }
      });
    },
    toggle (idx) {
      this.items = this.items.map((item, itemIdx) => {
        if (idx === itemIdx) {
          return {
            ...item,
            active: true
          };
        }

        return {
          ...item,
          active: false
        };
      });

      this.sliderInstance.slideTo(idx, 800);

      if (isDesktop()) {
        this.activeIndex = idx;

        this.animation(idx);
      }
    },
    animation (idx = 0) {
      if (idx === this.prevActiveIndex) { return; }

      const tl = this.$gsap.timeline({ paused: true });

      const blocks = this.$refs.block;

      const activeBlock = blocks[idx];
      const restBlock = blocks.filter((item, itemIdx) => idx !== itemIdx);

      tl.to(restBlock, { opacity: 0, duration: 0.3 })
        .fromTo(activeBlock, { opacity: 0 }, {
          opacity: 1,
          duration: 0.3,
          onStart: () => {
            this.prevActiveIndex = idx;
          }
        }, '0');

      tl.play();
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'AppFeatures';
</style>
