<template>
  <footer id="qa" class="app-footer" role="contentinfo">
    <div class="app-footer__content">
      <div class="app-footer__qa">
        <AppQA />
      </div>
      <div class="app-footer__container container">
        <div class="app-footer__top">
          <div class="app-footer__logos">
            <div class="app-footer__logo">
              <AppIcon name="logos/logo-sber" />
            </div>
            <div class="app-footer__logo">
              <AppIcon name="logos/logo-npf" />
            </div>
          </div>

          <div class="app-footer__contacts">
            <div v-for="(item, idx) in contacts" :key="idx" class="app-footer__contact">
              <a :href="item.href" class="app-footer__link">
                {{ item.text }}
              </a>

              <p v-if="item.description" class="app-footer__description">
                {{ item.description }}
              </p>
            </div>
          </div>
        </div>

        <div class="app-footer__bottom">
          <div class="app-footer__policy">
            <a :href="policy.href" class="app-footer__policy-link">
              {{ policy.text }}
            </a>
          </div>

          <div class="app-footer__text">
            <p class="app-footer__text-left" v-html="textLeft" />
            <p class="app-footer__text-right" v-html="textRight" />
          </div>
        </div>
      </div>
    </div>

    <div class="app-footer__background">
      <AppImage :data="gradient" />
    </div>

    <div class="app-footer__scroll-to-top">
      <AppScrollToTop />
    </div>
  </footer>
</template>

<script>
import AppIcon from '~/components/AppIcon/AppIcon';
import AppQA from '~/components/AppQA/AppQA';
import AppScrollToTop from '~/components/AppScrollToTop/AppScrollToTop';
import AppImage from '~/components/AppImage/AppImage';

export default {
  name: 'AppFooter',
  components: { AppImage, AppScrollToTop, AppQA, AppIcon },
  data () {
    return {
      gradient: {
        src: 'images/gradient/gradient-2.jpg'
      },
      contacts: [
        {
          text: '+7 (495) 500-55-50',
          href: 'tel:+74955005550',
          description: 'Телефон для звонков из любой точки мира'
        },
        {
          text: '900',
          href: 'tel:900',
          description: 'Бесплатно с мобильного на территории РФ'
        }
      ],
      policy: {
        text: 'Политика обработки персональных данных',
        href: '#!'
      },
      textLeft: '© 2009–2023 Акционерное общество «Негосударственный Пенсионный Фонд Сбербанка»Лицензия №41/2 от 16.06.2009 г. выдана Федеральной службой по финансовым рынкам ИНН/ КПП 7725352740/772501001, ОГРН 1147799009160',
      textRight: 'Реклама. Рекламодатель АО «НПФ Сбербанка», erid . Услуги предоставляет АО «НПФ Сбербанка» (115162, г. Москва, ул. Шаболовка, д. 31Г. ИНН 7725352740, ОГРН 1147799009160. Лицензия № 41/2 от 16.06.2009 выдана Федеральной службой по финансовым рынкам). Подробнее об условиях: <a href="https://npfsberbanka.ru/" target="_blank">https://npfsberbanka.ru/</a>.'
    };
  }
};
</script>

<style lang="scss" scoped>
@import "AppFooter";
</style>
