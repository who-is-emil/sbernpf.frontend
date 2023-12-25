<template>
  <div id="calculator" class="app-calculator">
    <!--    <pre>-->
    <!--      Итоговая сумма накоплений в программе: {{ result.totalAmount }}-->
    <!--      Ваши личные взносы: {{ result.personalContributions }}-->
    <!--      Перевод пенсионных накоплений (ОПС): {{ result.pensionTransfer }}-->
    <!--      Софинансирование от государства: {{ result.stateCofinancing }}-->
    <!--      Инвестиционный доход: {{ result.investmentIncome }}-->
    <!--      Налоговый вычет: {{ result.taxDeduction }}-->
    <!--      Налоговый вычет (текст): {{ result.taxDeductionText }}-->
    <!--      Срочная: {{ result.urgentPayment }}-->
    <!--      Единовременная: {{ result.oneTime }}-->
    <!--      Пожизненная: {{ result.lifetime }}-->
    <!--    </pre>-->
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

            <div class="app-calculator__item">
              <div class="app-calculator__field">
                <AppField v-model="taxDeductionValue" :data="taxDeductionField" />
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
      ROI: 7,

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
      ageValue: 56,

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
        textLeft: '500 ₽'
      },
      sumValue: 2500,

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
      periodValue: 5,

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
      sumAccountValue: 109309,

      // Учитывать накопление ОПС
      OPSField: {
        id: 'ops',
        name: 'ops',
        type: 'checkbox',
        text: 'Учитывать накопление ОПС'
      },
      OPSValue: true,

      // Вкладывать налоговый вычет в программу
      taxDeductionField: {
        id: 'taxCheck',
        name: 'taxCheck',
        type: 'checkbox',
        text: 'Вкладывать налоговый вычет в программу'
      },
      taxDeductionValue: true,

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
          external: true,
          href: 'https://npfsberbanka.ru/pds/?utm_source=sbersite&utm_medium=pdsportal&utm_campaign=getlead&utm_content=1#subscription'
        }
      ]
    };
  },
  computed: {
    // Промежуточные значения:

    // Период участия = (Возраст начала получения выплат - Ваш возраст) * 12
    period () {
      return (this.ageEndValue - this.ageValue) * 12;
    },

    // Процент - процент доходности(ROI) / 12 / 100
    percent () {
      return this.ROI / 12 / 100;
    },

    // Софинансирование в год = Меньшее(36 000 || Сумма взноса в год * коэффициент софинансирования государством)
    cofinancing () {
      const calcMinValue = this.sumPerYear * this.cofinancingRatio;

      return Math.min(36000, calcMinValue);
    },

    // Сумма взноса в год = Сумма взносов в месяц * 12
    sumPerYear () {
      const formattedValue = parseInt(this.sumValue.toString().replace(/\s/g, ''), 10);
      return formattedValue * 12;
    },

    // Коэффициент софинансирования государством
    cofinancingRatio () {
      if (this.incomeValue.value === 'val_1') {
        return 1; // до 80 000 = 1,
      } else if (this.incomeValue.value === 'val_2') {
        return 0.5; // от 80 000 до 150 000 = 0.5
      }

      return 0.25; // более 150 000 = 0.25
    },

    // Значение аннуитета для пожилых лиц
    annuityValue () {
      return annuityData[this.ageValue][this.genderValue];
    },

    // Второй экран калькулятора:

    // Личные взносы = (Сумма взноса в год * Период участия) (/ 12?)
    personalContributions () {
      return (this.sumPerYear * this.period) / 12;
    },

    // Софинансирование государства = софинансирование * Меньшее(3 || Период участия).
    stateCofinancing () {
      return this.cofinancing * Math.min(3, this.period);
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

    // Налоговый вычет == Сумма за вычет
    taxDeduction () {
      if (!this.taxDeductionValue) {
        return null;
      }

      return this.sumDeduction;
    },
    taxDeductionText () {
      if (!this.taxDeductionValue) {
        const res = ((Math.min(400000, this.sumPerYear)) * 0.13) * (this.period / 12);
        const textFomat = this.formatNumberToCurrency(res);
        return `Вы сможете вернуть 13% от суммы ваших личных взносов по договору долгосрочных сбережений на сумму ${textFomat} ₽`;
      }

      return '';
    },

    // Инвестиционный доход

    // вычет
    deduction () {
      return Math.min(400000, this.sumPerYear) * 0.13;
    },

    // сумма за вычет
    sumDeduction () {
      // Если чекбокс Вкладывать налоговый вычет в программу не активен.
      if (!this.taxDeductionValue) {
        return 0;
      }

      // вычет
      const first = this.deduction;
      // процент доходности / 100
      const second = this.ROI / 100;

      let third;

      if ((this.period / 12) < 2) {
        third = 0;
      } else if ((this.period / 12) === 2) {
        third = (Math.min(400000, (this.sumPerYear + this.deduction)) * 0.13) * (this.percent / 100);
      } else {
        const limit = this.period / 12;

        let res = 0;

        // предыдущий вычет
        let prevDeduction = this.deduction;

        for (let i = 2; i <= limit; i++) {
          const currentDeduction = Math.min(400000, (this.sumPerYear + prevDeduction)) * 0.13;

          res += (Math.min(400000, (this.sumPerYear + prevDeduction)) * 0.13) * (this.percent / 100);

          prevDeduction = currentDeduction;
        }

        third = res;
      }

      return first * second + third;
    },

    // сумма за взносы
    contributionSum () {
      // сумма взносов в месяц
      const first = parseInt(this.sumValue.toString().replace(/\s/g, ''), 10);

      const second = ((Math.pow((1 + this.percent), this.period)) - 1) / ((1 + this.percent) - 1);

      const third = (1 + this.percent);

      return first * second * third;
    },

    // сумма за софинансирование
    cofinancingSum () {
      // Если чекбокс Вкладывать налоговый вычет в программу не активен.
      if (!this.taxDeductionValue) {
        // софинансирование в год
        const first = this.cofinancing;

        const second = (Math.pow((1 + this.percent), Math.min(3, this.period / 12)) - 1) /
          ((1 - this.percent) - 1) * (1 + this.percent);

        const third = Math.pow((1 + this.percent), Math.max(0, this.period / 12 - 4));

        return first * second * third;
      }

      // софинансирование в год
      const first = this.cofinancing;

      const second = ((1 + this.ROI) - 1) / (((1 + this.ROI) - 1) * (1 + this.ROI));

      let third = 0;
      // предыдущий вычет
      let prevDeduction = this.deduction;

      for (let i = 2; i <= 3; i++) {
        const currentDeduction = Math.min(400000, (this.sumPerYear + prevDeduction)) * 0.13;

        third += (Math.min(36000, ((this.sumPerYear + currentDeduction) * this.cofinancingRatio))) *
          ((1 + this.ROI) - 1) / (((1 + this.ROI) - 1) * (1 + this.ROI));

        prevDeduction = currentDeduction;
      }

      const fourth = Math.pow((1 + this.ROI / 100), Math.max(0, this.period / 12 - 3));

      return first * second + third * fourth;
    },

    // сумма за ОПС
    OPSSum () {
      return this.pensionTransfer * (1 + Math.pow(this.percent, this.period / 12));
    },

    // Сумма всех вычетов
    sumDeductions () {
      // предыдущий вычет
      let prevDeduction = this.deduction;

      const limit = this.period / 12;
      let sum = 0;

      for (let i = 1; i <= limit; i++) {
        const currentDeduction = Math.min(400000, (this.sumPerYear + prevDeduction)) * 0.13;

        sum += (Math.min(400000, (this.sumPerYear + prevDeduction)) * 0.13) * (this.percent / 100);

        prevDeduction = currentDeduction;
      }

      return sum;
    },

    // Инвестиционный доход
    investmentIncome () {
      return this.sumDeduction + this.contributionSum + this.cofinancingSum + this.OPSSum;
    },

    // Итоговая сумма
    // Расчет по формуле = Личные взносы + Софинансирование государства +
    // + Перевод пенсионных накоплений + Инвестиционный доход

    totalAmount () {
      return this.personalContributions + this.stateCofinancing + this.pensionTransfer + this.investmentIncome + this.sumDeductions;
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
        // Налоговый вычет
        taxDeduction: this.taxDeductionValue ? this.formatNumberToCurrency(this.taxDeduction) : null,
        taxDeductionText: !this.taxDeductionValue ? this.taxDeductionText : '',
        // Срочная
        urgentPayment: this.formatNumberToCurrency(this.urgentPayment),
        // Единовременная
        oneTime: this.formatNumberToCurrency(this.oneTime),
        // Пожизненная
        lifetime: this.formatNumberToCurrency(this.lifetime)
      };
    },

    // Дисклеймер
    text () {
      return `Не является офертой и не гарантирует доходность в будущем.
      Ожидаемая доходность в размере ${this.ROI}% годовых.
      Расчеты срочных периодических выплат осуществляются в соответствии с выбранной продолжительностью выплат.
      Расчеты пожизненных периодических выплат и единовременной выплаты осуществляется осуществляются
      исходя из выбранного при расчете пола и возраста начала получения выплат.`;
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
        this.$set(this.ageEndField, 'textRight', `${max} лет`);

        this.$nextTick(() => {
          this.$set(this.ageEndField, 'min', min);
          this.$set(this.ageEndField, 'textLeft', `${min} лет`);
          this.ageEndValue = min;
        });
      } else {
        this.$set(this.ageEndField, 'min', min);
        this.$set(this.ageEndField, 'textLeft', `${min} лет`);

        this.$nextTick(() => {
          this.$set(this.ageEndField, 'max', max);
          this.$set(this.ageEndField, 'textRight', `${max} лет`);
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
