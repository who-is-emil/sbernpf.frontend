<template>
  <div class="app-calculator">
    <div class="app-calculator__container container">
      <div class="app-calculator__content">
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
                <AppField v-model="periodValue" :data="periodField" />
              </div>
            </div>

            <div class="app-calculator__item app-calculator__item--has-checkbox">
              <div class="app-calculator__field">
                <AppField v-model="sumAccountValue" :data="sumAccountField" />
              </div>

              <div class="app-calculator__field app-calculator__field--checkbox">
                <AppField v-model="OPSValue" :data="OPSField" />
              </div>
            </div>
          </div>

          <div class="app-calculator__actions">
            <div v-for="(action, idx) in actions" :key="idx" class="app-calculator__action">
              <AppButton :data="action" />
            </div>
          </div>
        </form>
        <div v-if="text" class="app-calculator__text">
          <p>{{ text }}</p>
        </div>
      </div>

      <pre>
        {{ ageEndField }}
      </pre>

      <div v-if="false" class="app-calculator__result">
        <AppResult :data="result" />
      </div>
    </div>
  </div>
</template>

<script>
import _debounce from 'lodash.debounce';
import AppField from '~/components/FormFields/AppField/AppField';
import AppButton from '~/components/AppButton/AppButton';
import AppResult from '~/components/AppResult/AppResult';

export default {
  name: 'AppCalculator',
  components: { AppResult, AppButton, AppField },
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
      ageEndValue: 55,

      // Сумма взноса в месяц
      sumField: {
        id: 'sum',
        type: 'text',
        label: 'Сумма взноса в месяц',
        suffix: '₽',
        textLeft: '500 ₽'
      },
      sumValue: 10000,

      // Срок ежемесячных выплат
      periodField: {
        id: 'period',
        type: 'range',
        label: 'Срок ежемесячных выплат',
        min: 5,
        max: 30,
        textLeft: '5 лет',
        textRight: '30 лет'
      },
      periodValue: 15,

      // Сумма со счета ОПС
      sumAccountField: {
        id: 'sumAccount',
        type: 'text',
        label: 'Сумма со счета ОПС',
        suffix: '₽'
      },
      sumAccountValue: 10000,

      // Учитывать накопление ОПС
      OPSField: {
        id: 'ops',
        name: 'ops',
        type: 'checkbox',
        text: 'Учитывать накопление ОПС'
      },
      OPSValue: true,

      actions: [
        {
          name: 'calculate',
          text: 'Рассчитать',
          title: 'Рассчитать',
          theme: 'green'
        },
        {
          name: 'submit',
          text: 'Оставить заявку',
          title: 'Оставить заявку'
        }
      ],
      text: 'Не является офертой и не гарантирует доходность в будущем. ' +
        'Ожидаемая доходность в размере %процент доходности указанный в административной панели% % годовых. ' +
        'Расчеты срочных периодических выплат осуществляются в соответствии с выбранной продолжительностью выплат – %значение поля “Срок срочной выплаты”%лет. ' +
        'Расчеты пожизненных периодических выплат и единовременной выплаты осуществляется осуществляются исходя из выбранного при расчете пола и возраста начала получения выплат.'
    };
  },
  computed: {
    result () {
      return {};
    }
  },
  watch: {
    ageValue: _debounce(function (current, previous) {
      let min;
      let max;
      let disabled;

      // Если значение в поле “Ваш возраст” меньше или равно 45,
      // то нижнее значение будет равно “Ваш возраст+15”.
      if (current <= 45) {
        min = current + 15;
        max = 100;
        disabled = false;
        //  Если значение в поле “Ваш возраст” от 45 до 59,
        //  то значение равно 60.
      } else if (current > 45 && current <= 59) {
        min = 60;
        max = 100;
        disabled = false;
        // сли значение в поле “Ваш возраст” более 59,
        // то нижнее значение будет равно “Ваш возраст+1”
      } else if (current > 59 && current < 100) {
        min = current + 1;
        max = 100;
        disabled = false;
        // если возраст равен 100
      } else {
        min = 101;
        max = 101;
        disabled = true;
      }

      this.$set(this.ageEndField, 'disabled', disabled);

      if (current > previous) {
        this.$set(this.ageEndField, 'max', max);

        this.$nextTick(() => {
          this.$set(this.ageEndField, 'min', min);
          this.ageEndValue = min;
        });
      } else {
        this.$set(this.ageEndField, 'min', min);

        this.$nextTick(() => {
          this.$set(this.ageEndField, 'max', max);
          this.ageEndValue = min;
        });
      }
    }, 500)
  }
};
</script>

<style lang="scss" scoped>
@import "AppCalculator";
</style>
