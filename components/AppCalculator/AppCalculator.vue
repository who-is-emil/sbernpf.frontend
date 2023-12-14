<template>
  <div id="calculator" class="app-calculator">
    <div class="app-calculator__container container">
      <div v-if="showResult" class="app-calculator__result">
        <AppResult :data="result" @edit="resultToggle" />
      </div>
      <div v-else class="app-calculator__content">
        <div class="app-calculator__top">
          <h2 class="app-calculator__title">
            <span v-for="(item, idx) in title" :key="idx">
              {{ item }}
            </span>
          </h2>
        </div>
        <div class="app-calculator__form">
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
                <AppField v-model.lazy="sumValue" v-money="money" :data="sumField" />
              </div>
            </div>

            <div class="app-calculator__item">
              <div class="app-calculator__field">
                <AppField v-model="periodValue" :data="periodField" />
              </div>
            </div>

            <div class="app-calculator__item app-calculator__item--has-checkbox">
              <div class="app-calculator__field">
                <AppField v-model.lazy="sumAccountValue" v-money="money" :data="sumAccountField" />
              </div>

              <div class="app-calculator__field app-calculator__field--checkbox">
                <AppField v-model="OPSValue" :data="OPSField" />
              </div>
            </div>
          </div>
          <div class="app-calculator__actions">
            <div v-for="(action, idx) in actions" :key="idx" class="app-calculator__action">
              <template v-if="action.name === 'calculate'">
                <AppButton :data="action" @click="resultToggle" />
              </template>

              <template v-if="action.name === 'request'">
                <AppButton :data="action" />
              </template>
            </div>
          </div>
        </div>
        <div v-if="text" class="app-calculator__text">
          <p>{{ text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _debounce from 'lodash.debounce';
import { VMoney } from 'v-money';
import AppField from '~/components/FormFields/AppField/AppField';
import AppButton from '~/components/AppButton/AppButton';
import AppResult from '~/components/AppResult/AppResult';
import annuityData from '~/components/AppCalculator/annuityData';

export default {
  name: 'AppCalculator',
  components: { AppResult, AppButton, AppField },
  directives: { money: VMoney },
  data () {
    return {
      money: {
        decimal: '.',
        thousands: ' ',
        suffix: ' ₽',
        precision: 0
      },

      showResult: false,
      // Процент доходности
      percent: 7,

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
        suffix: '₽',
        currency: true,
        tooltip: {
          text: 'Сумма со счета ОПС Сумма со счета ОПС Сумма со счета ОПС',
          iconTheme: 'grey',
          icon: '24/info-stroke'
        }
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
          theme: 'gradient'
        },
        {
          name: 'request',
          text: 'Оставить заявку',
          title: 'Оставить заявку',
          href: '#!'
        }
      ],
      text: 'Не является офертой и не гарантирует доходность в будущем. ' +
        'Ожидаемая доходность в размере %процент доходности указанный в административной панели% % годовых. ' +
        'Расчеты срочных периодических выплат осуществляются в соответствии с выбранной продолжительностью выплат – %значение поля “Срок срочной выплаты”%лет. ' +
        'Расчеты пожизненных периодических выплат и единовременной выплаты осуществляется осуществляются исходя из выбранного при расчете пола и возраста начала получения выплат.'
    };
  },
  computed: {
    // Промежуточные значения:
    // Сумма взноса в год = Сумма взносов в месяц * 12

    calcPercent () {
      return this.percent / 100;
    },

    sumPerYear () {
      const formattedValue = parseInt(this.sumValue.toString().replace(/\s/g, ''), 10);
      return formattedValue * 12;
    },

    // Период участия = Возраст начала получения выплат - Ваш возраст
    period () {
      return this.ageEndValue - this.ageValue;
    },

    // Софинансирование в год = Меньшее(36 000 ; Сумма взноса в год * коэффициент софинансирования государством)
    cofinancing () {
      const maxPerYear = 36000;
      const calcMinValue = this.sumPerYear * this.cofinancingRatio;

      return Math.min(maxPerYear, calcMinValue);
    },

    // Значение аннуитета для пожилых лиц = значение в таблице аннуитета, определяется по пересечению значений поля Пол и Возраст начала получения выплат
    cofinancingRatio () {
      if (this.incomeValue.value === 'val_1') {
        return 1; // до 80 000 = 1,
      } else if (this.incomeValue.value === 'val_2') {
        return 0.5; // от 80 000 до 150 000 = 0.5
      }

      return 0.25; // более 150 000 = 0.25
    },

    // Второй экран калькулятора:

    // Личные взносы = (Сумма взноса в год * Период участия)
    personalContributions () {
      return this.sumPerYear * this.period;
    },
    periodMinCalc () {
      return Math.min(3, this.period);
    },
    periodAboveZeroCalc () {
      return this.period - 4 < 0 ? 0 : this.period - 4;
    },
    // Софинансирование государства =
    // = Меньшее(36 000 || Сумма взноса в год * коэффициент софинансирования государством) * Меньшее(3 || Период участия).
    stateCofinancing () {
      return this.cofinancing * this.periodMinCalc;
    },
    // Перевод пенсионных накоплений
    // 0, если чекбокс “Учитывать накопление ОПС” не активен.
    // Перенос средств ОПС, если чекбокс “Учитывать накопление ОПС” активен.
    pensionTransfer () {
      if (!this.OPSValue) {
        return 0;
      }

      return parseInt(this.sumAccountValue.toString().replace(/\s/g, ''), 10);
    },
    // Инвестиционный доход
    investmentIncome () {
      const first = this.sumPerYear;
      const second = ((Math.pow((1 + this.calcPercent), this.period) - 1) / ((1 + this.calcPercent) - 1));
      const third = (1 + this.calcPercent);
      const fourth = this.cofinancing;
      const fifth = ((Math.pow((1 + this.calcPercent), this.periodMinCalc) - 1) / (((1 + this.calcPercent) - 1) * (1 + this.calcPercent)));
      const sixth = (Math.pow((1 + this.calcPercent), this.periodAboveZeroCalc));
      const seventh = this.pensionTransfer;
      const eighth = (Math.pow((1 + this.calcPercent), this.period));

      return (first * second * third) + (fourth * fifth * sixth + seventh * eighth);
    },
    // Налоговые вычеты
    //  (Меньшее( 400 000 ; “Сумма взноса в год”) * 0,13) * (“Период участия”)
    taxDeductions () {
      return (Math.min(400000, this.sumPerYear) * 0.13) * this.period;
    },
    // Итоговая сумма
    // Личные взносы + Софинансирование государства + Перевод пенсионных накоплений + Инвестиционный доход
    totalAmount () {
      return this.personalContributions + this.stateCofinancing + this.pensionTransfer + this.investmentIncome;
    },
    // Виды выплат:
    // Срочная выплата = Округленное вниз значение (“Итоговая сумма” / ( “Период участия”*12)
    urgentPayment () {
      return Math.floor((this.totalAmount / this.period * 12));
    },
    // Единовременная = Итоговая сумма
    oneTime () {
      return this.totalAmount;
    },
    annuityValue () {
      return annuityData[this.ageValue][this.genderValue];
    },
    // “Пожизненная”.
    // Округленное вниз значение (Итоговая сумма / Значение аннуитета по таблице аннуитета для пожилых лиц)
    lifetime () {
      return Math.floor(this.totalAmount / this.annuityValue);
    },
    result () {
      return {
        // Итоговая сумма накоплений в программе
        totalAmount: this.formatNumberToCurrency(this.totalAmount),
        // Ваши личные взносы
        personalContributions: this.formatNumberToCurrency(this.personalContributions),
        // Перевод пенсионных накоплений (ОПС)
        pensionTransfer: this.formatNumberToCurrency(this.pensionTransfer),
        // Софинансирование от государства
        stateCofinancing: this.formatNumberToCurrency(this.stateCofinancing),
        // Инвестиционный доход
        investmentIncome: this.formatNumberToCurrency(this.investmentIncome),
        // Срочная
        urgentPayment: this.formatNumberToCurrency(this.urgentPayment),
        // Единовременная
        oneTime: this.formatNumberToCurrency(this.oneTime),
        // Пожизненная
        lifetime: this.formatNumberToCurrency(this.lifetime)
      };
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
  },
  methods: {
    resultToggle () {
      this.showResult = !this.showResult;
    },
    formatNumberToCurrency (number, locale = 'ru-RU', currency = 'RUB') {
      const formatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        useGrouping: true,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });

      return formatter.format(number);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "AppCalculator";
</style>
