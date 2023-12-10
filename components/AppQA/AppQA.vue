<template>
  <div class="app-qa">
    <div class="app-qa__container container">
      <div class="app-qa__side">
        <h2 v-if="title" class="app-qa__title">
          <span v-for="(item, idx) in title" :key="idx">
            {{ item }}
          </span>
        </h2>

        <div v-if="action" class="app-qa__action">
          <AppButton :data="action" />
        </div>
      </div>
      <div class="app-qa__base">
        <div class="app-qa__items">
          <div v-for="(item, idx) in items" :key="idx" class="app-qa__item">
            <AppAccordion :data="item" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppButton from '~/components/AppButton/AppButton';
export default {
  name: 'AppQA',
  components: { AppButton },
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
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
@import "AppQA";
</style>
