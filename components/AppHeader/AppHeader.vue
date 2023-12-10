<template>
  <header
    ref="header"
    class="app-header"
    :class="{'app-header--menu-opened': menuState}"
    role="banner"
  >
    <div class="app-header__container container">
      <div class="app-header__content">
        <div class="app-header__logo">
          <AppIcon name="logos/logo" />
        </div>

        <div class="app-header__menu">
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
        </div>

        <button type="button" class="app-header__burger" aria-label="Открыть меню" @click="menuStateToggle">
          <span />
          <span />
        </button>
      </div>
    </div>

    <div class="app-header__overlay" @click="menuStateToggle" />
  </header>
</template>

<script>
import _throttle from 'lodash.throttle';
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
  mounted () {
    document.addEventListener('scroll', _throttle(() => {
      const y = window.pageYOffset || document.documentElement.scrollTop || 0;

      if (y > 0) {
        this.$refs.header.classList.add('fixed');
      } else {
        this.$refs.header.classList.remove('fixed');
      }
    }, 100));
  },
  methods: {
    menuStateToggle () {
      this.menuState = !this.menuState;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "AppHeader";
</style>
