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
                <a
                  v-scroll-to="item.href"
                  href="#"
                  class="app-header__link"
                  :class="{'app-header__link--active' : item.active}"
                  :data-target="item.href"
                  @click="click"
                >
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
import { isDesktop } from '~/assets/js/breakpoints';
import { _disableScroll, _enableScroll } from '~/assets/js/scroll';
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
          href: '#qa'
        }
      ],
      action: {
        text: 'Оставить заявку',
        title: 'Оставить заявку',
        external: true,
        href: 'https://npfsberbanka.ru/pds/#subscription',
        size: 'small',
        theme: 'black'
      }
    };
  },
  mounted () {
    this.headerAnimation();
    // this.headerLinksToggle();
  },
  methods: {
    headerAnimation () {
      const header = this.$refs.header;
      let lastScrollTop = 0;

      document.addEventListener('scroll', _throttle(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        const direction = scrollTop > lastScrollTop ? 'down' : 'up';

        if (direction === 'up') {
          header.classList.remove('is-hidden');

          if (scrollTop > 25) {
            header.classList.add('is-fixed');
          } else {
            header.classList.remove('is-fixed');
          }
        } else if (direction === 'down' && scrollTop > 25) {
          header.classList.add('is-hidden');
        }

        lastScrollTop = scrollTop;
      }, 50));
    },
    menuStateToggle () {
      this.menuState = !this.menuState;

      if (this.menuState) {
        _disableScroll();
      } else {
        _enableScroll();
      }
    },
    headerLinksToggle () {
      const sections = document.querySelectorAll('#about, #advantages, #how, #calculator, #become, #qa');

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const href = '#' + entry.target.getAttribute('id');

          if (entry.isIntersecting) {
            this.links = this.links.map((item) => {
              if (item.href === href) {
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
          } else {
            this.links.forEach((item) => {
              if (item.href === href) {
                item.active = false;
              }
            });
          }
        });
      });

      sections.forEach((section) => {
        observer.observe(section);
      },
      {
        rootMargin: '0px 0px 50% 0px',
        threshold: 0.5
      });
    },
    click () {
      if (!isDesktop()) {
        _enableScroll();
        this.menuState = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "AppHeader";
</style>
