<template>
  <div ref="slider" class="app-slider-circle">
    <div class="app-slider-circle__content">
      <div class="app-slider-circle__container container">
        <div class="app-slider-circle__top">
          <h2 v-if="title" class="app-slider-circle__title" data-aos="fade" data-aos-delay="100">
            <span v-for="(item, idx) in title" :key="idx">
              {{ item }}
            </span>
          </h2>

          <p v-if="text" class="app-slider-circle__text" data-aos="fade" data-aos-delay="100" v-html="text" />
        </div>

        <div class="app-slider-circle__bottom" data-aos="fade" data-aos-delay="200">
          <p v-if="caption" class="app-slider-circle__caption">
            {{ caption }}
          </p>

          <div v-if="action" class="app-slider-circle__action">
            <AppButton :data="action" @click="clickAction" />
          </div>
        </div>
      </div>

      <div data-aos="fade" data-aos-delay="200">
        <div ref="circle" class="app-slider-circle__circle">
          <div v-for="(item, idx) in items" :key="idx" class="app-slider-circle__item">
            <AppCardFactoid :data="item" />

            <div v-if="item.icon" class="app-slider-circle__icon">
              <AppIcon :name="item.icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppCardFactoid from '~/components/AppCardFactoid/AppCardFactoid';
import AppButton from '~/components/AppButton/AppButton';
import AppIcon from '~/components/AppIcon/AppIcon';

export default {
  name: 'AppSliderCircle',
  components: { AppIcon, AppButton, AppCardFactoid },
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
          value: '3000 ₽',
          text: 'в месяц',
          description: '12 ежемесячных взносов в&nbsp;году на 10 лет',
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

      timeline: null,
      controller: null
    };
  },
  computed: {
    prev () {
      return {
        icon: '24/prev',
        title: 'Назад'
      };
    },
    next () {
      return {
        icon: '24/next',
        title: 'Вперед'
      };
    }
  },
  mounted () {
    this.animation();
    this.initController();

    window.addEventListener('st:refresh', () => {
      this.controller.kill();
      this.controller = null;
      this.initController();
    });
  },
  beforeDestroy () {
    this.controller.kill();
    this.timeline.kill();

    this.controller = null;
    this.timeline = null;
  },
  methods: {
    animation () {
      const trigger = this.$refs.slider;
      const circle = this.$refs.circle;

      this.timeline = this.$gsap.timeline({
        scrollTrigger: {
          scroller: 'body',
          trigger,
          scrub: true,
          start: '0%',
          end: '+=175%',
          preventOverlaps: true,
          invalidateOnRefresh: true,
          toggleActions: 'play none none reverse'
        }
      });

      this.timeline.fromTo(circle, { rotate: '0deg' }, { rotate: '-21deg', ease: 'none' });
    },
    initController () {
      const trigger = document.querySelector('.app-program');

      this.controller = this.$scrollTrigger.create({
        scroller: 'body',
        trigger,
        start: '50px top',
        end: '+=175%',
        pin: true,
        preventOverlaps: true,
        invalidateOnRefresh: true,
        invalidateOnResize: true
      });
    },
    clickAction () {
      const _tmr = window._tmr || (window._tmr = []);
      _tmr.push({ type: 'reachGoal', id: 2866471, goal: 'click_apply-program' });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "AppSliderCircle";
</style>
