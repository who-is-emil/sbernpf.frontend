<template>
  <header class="app-header" role="banner">
    <div class="app-header__container container">
      <div class="app-header__content">
        <div class="app-header__logo">
          <AppIcon name="logos/logo" />
        </div>

        <nav class="app-header__nav" role="navigation">
          <ul class="app-header__list" role="list">
            <li v-for="(item, idx) in links" :key="idx" class="app-header__item">
              <a :href="item.href" class="app-header__link">
                {{ item.text }}
              </a>
            </li>
          </ul>
        </nav>

        <div class="app-header__action">
          <AppButton :data="action" />
        </div>

        <button type="button" class="app-header__burger" aria-label="Открыть меню" @click="menuStateToggle">
          <span />
          <span />
        </button>
      </div>
    </div>
  </header>
</template>

<script>
import AppIcon from '~/components/AppIcon/AppIcon';
import AppButton from '~/components/AppButton/AppButton';

export default {
  name: 'AppHeader',
  components: { AppButton, AppIcon },
  data () {
    return {
      menuState: false,
      links: [
        {
          text: 'О программе',
          href: '#about'
        },
        {
          text: 'Преимущества',
          href: '#advantages'
        },
        {
          text: 'Как работает программа',
          href: '#how'
        },
        {
          text: 'Калькулятор',
          href: '#calculator'
        },
        {
          text: 'Стать участником',
          href: '#become'
        },
        {
          text: 'Вопросы ответы',
          href: '#qaa'
        }
      ],
      action: {
        text: 'Оставить заявку',
        title: 'Оставить заявку',
        href: '#!',
        size: 'small',
        theme: 'black'
      }
    };
  },
  methods: {
    menuStateToggle () {
      this.menuState = !this.menuState;

      const body = document.querySelector('body');

      if (body) {
        if (this.menuState) {
          body.classList.add('menu-opened');
        } else {
          body.classList.remove('menu-opened');
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "AppHeader";
</style>
