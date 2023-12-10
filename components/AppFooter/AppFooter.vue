<template>
  <footer class="app-footer" role="contentinfo">
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
          <p v-html="text" />
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import AppIcon from '~/components/AppIcon/AppIcon';

export default {
  name: 'AppFooter',
  components: { AppIcon },
  data () {
    return {
      title: ['Вопросы', 'ответы'],
      action: {
        title: 'Оставить заявку',
        text: 'Оставить заявку',
        href: '#!'
      },
      items: [
        {
          title: 'Что такое программа долгосрочных сбережений?',
          content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque nostrum odit sunt! Blanditiis consequuntur impedit ipsum magnam natus nemo optio quisquam soluta veritatis voluptatem. Doloremque eveniet magnam mollitia quae repudiandae!'
        },
        {
          title: 'Когда стартует программа долгосрочных сбережений?',
          content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque nostrum odit sunt! Blanditiis consequuntur impedit ipsum magnam natus nemo optio quisquam soluta veritatis voluptatem. Doloremque eveniet magnam mollitia quae repudiandae!'
        },
        {
          title: 'Кто может участвовать в программе?',
          content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque nostrum odit sunt! Blanditiis consequuntur impedit ipsum magnam natus nemo optio quisquam soluta veritatis voluptatem. Doloremque eveniet magnam mollitia quae repudiandae!'
        },
        {
          title: 'Как формируются долгосрочные сбережения?',
          content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque nostrum odit sunt! Blanditiis consequuntur impedit ipsum magnam natus nemo optio quisquam soluta veritatis voluptatem. Doloremque eveniet magnam mollitia quae repudiandae!'
        },
        {
          title: 'Почему выгодно вступить в программу?',
          content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque nostrum odit sunt! Blanditiis consequuntur impedit ipsum magnam natus nemo optio quisquam soluta veritatis voluptatem. Doloremque eveniet magnam mollitia quae repudiandae!'
        }
      ],
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
      text: '© 2009–2023 Акционерное общество «Негосударственный Пенсионный Фонд Сбербанка»Лицензия №41/2 от 16.06.2009 г. выдана Федеральной службой по финансовым&nbsp;рынкам.\n' +
        '<br>ИНН/ КПП 7725352740/772501001, ОГРН 1147799009160'
    };
  }
};
</script>

<style lang="scss" scoped>
@import "AppFooter";
</style>
