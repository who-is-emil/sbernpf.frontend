<template>
  <div class="app-calculator">
    <div class="app-calculator__container container">
      <div class="app-calculator__top">
        <h2 class="app-calculator__title">
          <span v-for="(item, idx) in title" :key="idx">
            {{ item }}
          </span>
        </h2>
      </div>

      <form class="app-calculator__form">
        <div class="app-calculator__items">
          <div class="app-calculator__item">
            <div class="app-calculator__field app-calculator__field--switch">
              <AppField v-model="genderValue" :data="genderField" />
            </div>

            <div class="app-calculator__field">
              <AppField v-model="incomeValue" :data="incomeField" />
            </div>
          </div>

          <div class="app-calculator__item">
            <div class="app-calculator__field">
              <AppField v-model="ageValue" :data="ageField" />
            </div>
          </div>

          <div class="app-calculator__item">
            <div class="app-calculator__field">
              <AppField v-model="ageEndValue" :data="ageEndField" />
            </div>
          </div>

          <div class="app-calculator__item">
            <div class="app-calculator__field">
              <AppField v-model="sumValue" :data="sumField" />
            </div>
          </div>

          <div class="app-calculator__item">
            <div class="app-calculator__field">
              <AppField v-model="ageValue" :data="ageField" />
            </div>
          </div>

          <div class="app-calculator__item">
            <div class="app-calculator__field">
              <AppField v-model="ageValue" :data="ageField" />
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import AppField from '~/components/FormFields/AppField/AppField';

export default {
  name: 'AppCalculator',
  components: { AppField },
  data () {
    return {
      title: ['Рассчитайте', 'ваш будущий доход'],

      // Ваш пол
      genderField: {
        id: 'gender',
        type: 'switch',
        name: 'gender',
        label: 'Ваш пол',
        values: [
          {
            text: 'М',
            value: 'm',
            label: 'Мужской'
          },
          {
            text: 'Ж',
            value: 'w',
            label: 'Женский'
          }
        ]
      },
      genderValue: 'm',

      // Ежемесячный доход
      incomeField: {
        id: 'income',
        type: 'select',
        name: 'income',
        label: 'Ежемесячный доход',
        options: [
          {
            label: 'до 80 000 ₽',
            value: 'val_1'
          },
          {
            label: 'от 80 000 ₽ до 150 000 ₽',
            value: 'val_2'
          },
          {
            label: 'более 150 000 ₽',
            value: 'val_3'
          }
        ]
      },
      incomeValue: {
        label: 'до 80 000 ₽',
        value: 'val_1'
      },

      // Текущий возраст
      ageField: {
        id: 'age',
        type: 'range',
        label: 'Текущий возраст',
        min: 18,
        max: 100,
        textLeft: '18 лет',
        textRight: '100 лет'
      },
      ageValue: 35,

      // Возраст окончания участия в программе
      ageEndField: {
        id: 'endAge',
        type: 'range',
        label: 'Возраст окончания участия в программе',
        min: 50,
        max: 100,
        textLeft: '50 лет',
        textRight: '100 лет'
      },
      ageEndValue: 60,

      // Сумма взноса в месяц
      sumField: {
        id: 'sum',
        type: 'text',
        label: 'Сумма взноса в месяц',
        value: 10000,
        suffix: '₽',
        textLeft: '500 ₽'
      },
      sumValue: 10000,

      actions: [
        {
          name: 'calculate',
          text: 'Рассчитать',
          title: 'Рассчитать'
        },
        {
          name: 'submit',
          text: 'Оставить заявку',
          title: 'Оставить заявку',
          theme: 'white'
        }
      ],
      text: 'Не является офертой и не гарантирует доходность в будущем. ' +
        'Ожидаемая доходность в размере %процент доходности указанный в административной панели% % годовых. ' +
        'Расчеты срочных периодических выплат осуществляются в соответствии с выбранной продолжительностью выплат – %значение поля “Срок срочной выплаты”%лет. ' +
        'Расчеты пожизненных периодических выплат и единовременной выплаты осуществляется осуществляются исходя из выбранного при расчете пола и возраста начала получения выплат.'
    };
  }
};
</script>

<style lang="scss" scoped>
@import "AppCalculator";
</style>
