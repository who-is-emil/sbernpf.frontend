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
        <client-only>
          <AppSwitch v-model="switchValue" :data="fieldSwitch" />
        </client-only>

        <AppInput v-model="sum" :data="sumField" />
        <AppSelect v-model="incomeValue" :data="incomeField" />
      </form>
    </div>
  </div>
</template>

<script>
import AppSwitch from '~/components/FormFields/AppSwitch/AppSwitch';
import AppInput from '~/components/FormFields/AppInput/AppInput';
import AppSelect from '~/components/FormFields/AppSelect/AppSelect';
export default {
  name: 'AppCalculator',
  components: { AppSelect, AppInput, AppSwitch },
  data () {
    return {
      title: ['Рассчитайте', 'ваш будущий доход'],
      fields: [
        {
          name: 'switch',
          type: 'switch',
          label: 'Ваш пол',
          values: [
            {
              text: 'М',
              value: 'm',
              active: true
            },
            {
              text: 'Ж',
              value: 'w'
            }
          ]
        },
        {
          type: 'select',
          label: 'Ежемесячный доход',
          items: [
            {
              label: 'до 80 000 ₽',
              value: 'val_1',
              selected: true
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
        {
          type: 'range',
          label: 'Текущий возраст',
          from: 18,
          to: 100,
          value: 35,
          fromText: '18 лет',
          toText: '100 лет'
        },
        {
          type: 'range',
          label: 'Возраст окончания участия в программе',
          from: 50,
          to: 100,
          value: 60,
          fromText: '50 лет',
          toText: '100 лет'
        },
        {
          type: 'text',
          label: 'Сумма взноса в месяц',
          value: 10000,
          suffix: '₽',
          text: '500 ₽',
          placeholder: ''
        },
        {
          type: 'range',
          label: 'Срок ежемесячных выплат',
          from: 5,
          to: 30,
          value: 10,
          fromText: '5 лет',
          toText: '30 лет'
        },
        {
          type: 'text',
          label: 'Сумма со счета ОПС',
          value: 10000,
          suffix: '₽',
          placeholder: ''
        },
        {
          type: 'checkbox',
          text: 'Учитывать накопление ОПС',
          checked: true
        }
      ],

      // Ваш пол
      fieldSwitch: {
        name: 'switch',
        type: 'switch',
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
      switchValue: 'm',

      sumField: {
        type: 'text',
        label: 'Сумма взноса в месяц',
        value: 10000,
        suffix: '₽',
        text: '500 ₽',
        placeholder: ''
      },
      sum: 10000,

      incomeField: {
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
