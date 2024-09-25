<template>
  <div id="calculator" class="app-calculator">
    <div class="app-calculator__container container">
      <div v-if="showResult" class="app-calculator__result">
        <AppResult :data="result" @edit="resultToggle" />
      </div>
      <div v-else class="app-calculator__content">
        <div class="app-calculator__top" data-aos="fade" data-aos-delay="100">
          <h2 class="app-calculator__title">
            <span v-for="(item, idx) in title" :key="idx">
              {{ item }}
            </span>
          </h2>
        </div>
        <div class="app-calculator__form">
          <div class="app-calculator__items">
            <div class="app-calculator__item" data-aos="fade" data-aos-delay="100">
              <div class="app-calculator__field app-calculator__field--switch">
                <AppField v-model="genderValue" :data="genderField" />
              </div>

              <div class="app-calculator__field">
                <AppField v-model="incomeValue" :data="incomeField" />
              </div>
            </div>

            <div class="app-calculator__item" data-aos="fade" data-aos-delay="100">
              <div class="app-calculator__field">
                <AppField v-model="ageValue" :data="ageField" />
              </div>
            </div>

            <div class="app-calculator__item" data-aos="fade" data-aos-delay="100">
              <div class="app-calculator__field">
                <AppField v-model="ageEndValue" :data="ageEndField" />
              </div>
            </div>

            <div class="app-calculator__item" data-aos="fade" data-aos-delay="100">
              <div class="app-calculator__field">
                <AppField v-model="sumValue" :data="sumField" />
              </div>
            </div>

            <div class="app-calculator__item" data-aos="fade" data-aos-delay="100">
              <div class="app-calculator__field">
                <AppField v-model="periodValue" :data="periodField" />
              </div>
            </div>

            <div class="app-calculator__item app-calculator__item--has-checkbox" data-aos="fade" data-aos-delay="100">
              <div class="app-calculator__field">
                <AppField v-model="sumAccountValue" :data="sumAccountField" />
              </div>

              <div class="app-calculator__field app-calculator__field--checkbox">
                <AppField v-model="OPSValue" :data="OPSField" />
              </div>
            </div>

            <div class="app-calculator__item" data-aos="fade" data-aos-delay="100">
              <div class="app-calculator__field">
                <AppField v-model="taxDeductionValue" :data="taxDeductionField" />
              </div>
            </div>
          </div>
          <div class="app-calculator__actions" data-aos="fade" data-aos-delay="100">
            <div v-for="(action, idx) in actions" :key="idx" class="app-calculator__action">
              <template v-if="action.name === 'calculate'">
                <AppButton :data="action" @click="resultToggle" />
              </template>

              <template v-if="action.name === 'request'">
                <AppButton :data="action" @click="clickAction" />
              </template>
            </div>
          </div>
        </div>
        <div v-if="text" class="app-calculator__text" data-aos="fade" data-aos-delay="100">
          <p>{{ text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _debounce from 'lodash.debounce';
import { setUTM } from '~/assets/js/setUTM';
import AppField from '~/components/FormFields/AppField/AppField';
import AppButton from '~/components/AppButton/AppButton';
import AppResult from '~/components/AppResult/AppResult';
import annuityData from '~/components/AppCalculator/annuityData';

export default {
  name: 'AppCalculator',
  components: { AppResult, AppButton, AppField },
  data () {
    return {
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
        max: 80,
        textLeft: '18 лет',
        textRight: '80 лет'
      },
      ageValue: 40,

      // Возраст окончания участия в программе
      ageEndField: {
        id: 'endAge',
        type: 'range',
        label: 'Возраст окончания участия в программе',
        min: 55,
        max: 90,
        textLeft: '55 лет',
        textRight: '90 лет'
      },
      ageEndValue: 55,

      // Сумма взноса в месяц
      sumField: {
        id: 'sum',
        type: 'text',
        label: 'Сумма взноса в месяц',
        textLeft: '500 ₽',
        onlyPositiveValue: true,
        currency: true
      },
      sumValue: '10 000 ₽',

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
      periodValue: 10,

      // Сумма со счета ОПС
      sumAccountField: {
        id: 'sumAccount',
        type: 'text',
        label: 'Сумма со счета ОПС',
        onlyPositiveValue: true,
        currency: true,
        tooltip: {
          text: 'Сумма со счета ОПС',
          iconTheme: 'grey',
          icon: '24/info-stroke'
        }
      },
      sumAccountValue: '25 000 ₽',

      // Учитывать накопления ОПС
      OPSField: {
        id: 'ops',
        name: 'ops',
        type: 'checkbox',
        text: 'Учитывать накопления ОПС'
      },
      OPSValue: true,

      // Вкладывать налоговый вычет в программу
      taxDeductionField: {
        id: 'taxCheck',
        name: 'taxCheck',
        type: 'checkbox',
        text: 'Вкладывать налоговый вычет в программу'
      },
      taxDeductionValue: false,
      taxDeductionValueTemp: false, // TODO временно. Надо будет убрать, скорее всего, в сентябре

      actions: [
        {
          name: 'calculate',
          text: 'Рассчитать',
          title: 'Рассчитать',
          theme: 'gradient'
        },
        {
          name: 'request',
          text: 'Оформить программу',
          title: 'Оформить программу',
          external: true,
          href: 'https://sberbank.com/sms/promo_pds?utm_source=sbernpfsite&utm_medium=pdspage&utm_campaign=getpdscontract&utm_content=banner'
        }
      ],

      previousAge: 40,
      currentAge: 40
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
      return Math.pow(1 + this.ROI / 100, 1 / 12) - 1;
    },

    restMonths () {
      // текущая дата
      // const currentDate = new Date();

      // сколько месяцев осталось
      return 12; // TODO надо будет убрать вместе с taxDeductionValueTemp
      // return 12 - currentDate.getMonth();
    },

    // сумма вложений до конца года **
    restSum () {
      const sumOfMonth = parseInt(this.sumValue.toString().replace(/\s/g, ''), 10);

      return sumOfMonth * this.restMonths;
    },

    // Софинансирование в год = Меньшее(36 000 || Сумма взноса в год * коэффициент софинансирования государством)
    cofinancing () {
      const calcMinValue = this.sumPerYear * this.cofinancingRatio;

      return Math.min(36000, calcMinValue);
    },

    cofinancingFirstYear () {
      const calcMinValue = this.restSum * this.cofinancingRatio;

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
      return annuityData[this.ageEndValue][this.genderValue];
    },

    // Второй экран калькулятора:

    // Личные взносы = (Сумма взноса в год * Период участия / 12)
    personalContributions () {
      return (this.sumPerYear * this.period / 12);
    },

    // Софинансирование государства = софинансирование * Меньшее(10 || Период участия). **
    stateCofinancing () {
      if (!this.taxDeductionValue) {
        const minPeriod = Math.min(10, (this.period / 12));

        if (minPeriod < 10) {
          // const factor = this.sumPerYear >= 36000 ? 1 : 0;
          // return Math.min(36000, (this.sumPerYear * this.cofinancingRatio)) * (minPeriod + factor);
          return Math.min(36000, (this.sumPerYear * this.cofinancingRatio)) * minPeriod;
        } else {
          return Math.min(36000, (this.sumPerYear * this.cofinancingRatio)) * (minPeriod - 1) +
            Math.min(36000, (this.restSum * this.cofinancingRatio));
        }
      }

      let res = 0;
      let sum = 0;
      const limit = Math.min(10, (this.period / 12));
      let currentDeduction = 0;
      let prevDeduction = currentDeduction;

      for (let i = 0; i < limit; i++) {
        if (i === 0) {
          // первый налоговый вычет равен 0
          // должен учитываться текущий месяц
          sum = Math.min(36000, this.restSum * this.cofinancingRatio);
        } else if (i === 1) {
          prevDeduction = this.firstYearDeduction;

          sum = Math.min(36000, ((this.sumPerYear + this.firstYearDeduction) * this.cofinancingRatio));
        } else {
          // вычисляем вычет[i]
          currentDeduction = Math.min(400000, (this.sumPerYear + prevDeduction)) * 0.13;
          sum = Math.min(36000, ((this.sumPerYear + currentDeduction) * this.cofinancingRatio));

          prevDeduction = currentDeduction;
        }

        res += sum;
      }

      if (limit < 10) {
        currentDeduction = Math.min(400000, (this.sumPerYear + prevDeduction)) * 0.13;
        sum = Math.min(36000, (((this.sumPerYear - this.restSum) + currentDeduction) * this.cofinancingRatio));

        res += sum;
      }

      return res;
    },

    // Перевод пенсионных накоплений
    // 0, если чекбокс “Учитывать накопления ОПС” не активен.
    // Перенос средств ОПС, если чекбокс “Учитывать накопления ОПС” активен.
    pensionTransfer () {
      if (!this.OPSValue) {
        return 0;
      }

      return parseInt(this.sumAccountValue.toString().replace(/\s/g, ''), 10);
    },

    // Налоговый вычет == Сумма за вычеты
    taxDeduction () {
      if (!this.taxDeductionValue) {
        return null;
      }

      return this.sumDeductions;
    },
    taxDeductionText () {
      if (!this.taxDeductionValue) {
        const res = ((Math.min(400000, this.sumPerYear)) * 0.13) * (this.period / 12);
        const textFormat = this.formatNumberToCurrency(res);

        return `Вы сможете вернуть 13% от суммы ваших личных взносов по договору долгосрочных сбережений на сумму ${textFormat} ₽`;
      }

      return '';
    },

    // Инвестиционный доход

    // вычет
    deduction () {
      return Math.min(400000, this.sumPerYear) * 0.13;
    },

    // **
    firstYearDeduction () {
      return Math.min(400000, this.restSum) * 0.13;
    },

    // сумма за вычет **
    sumDeduction () {
      // Если чекбокс Вкладывать налоговый вычет в программу не активен.
      if (!this.taxDeductionValue) {
        return 0;
      }

      let res = 0;
      let deduction = this.firstYearDeduction;
      const limit = this.period / 12;

      deduction = Math.min(400000, this.restSum) * 0.13;
      res += deduction;

      for (let i = 2; i <= limit; i++) {
        deduction = Math.min(400000, this.sumPerYear + deduction) * 0.13;

        res += deduction + res * this.ROI / 100;
      }

      deduction = 0;

      res += deduction + res * (Math.pow((1 + (Math.pow(1 + this.ROI / 100, 1 / 12) - 1)), 12 - this.restMonths) - 1);

      return res;
    },

    // сумма за взносы
    contributionSum () {
      // сумма взносов в месяц
      const first = parseInt(this.sumValue.toString().replace(/\s/g, ''), 10);

      const second = (Math.pow((1 + this.percent), this.period)) - 1;

      const third = (1 + this.percent) - 1;

      const fourth = (1 + this.percent);

      return (first * second / third) * fourth;
    },

    // сумма за софинансирование **
    cofinancingSum () {
      // Если чекбокс Вкладывать налоговый вычет в программу не активен.
      if (!this.taxDeductionValue) {
        let limit = Math.min(10, this.period / 12);
        let sum = 0;

        sum += (Math.min(36000, this.restSum * this.cofinancingRatio));

        for (let i = 2; i <= limit; i++) {
          sum += (Math.min(36000, (this.sumPerYear * this.cofinancingRatio)) + sum * this.ROI / 100);
        }

        limit = this.period / 12 - 10;

        if (limit > 0) {
          for (let i = 1; i <= limit; i++) {
            sum += sum * this.ROI / 100;
          }
        }

        if (limit < 0) {
          sum += Math.min(36000, ((this.sumPerYear - this.restSum) * this.cofinancingRatio)) +
            sum * (Math.pow((1 + (Math.pow(1 + this.ROI / 100, 1 / 12) - 1)), 12 - this.restMonths) - 1);
        } else {
          sum += sum * (Math.pow((1 + (Math.pow(1 + this.ROI / 100, 1 / 12) - 1)), 12 - this.restMonths) - 1);
        }

        return sum;
      }

      let limit = Math.min(10, this.period / 12);
      let sum = 0;
      let deduction;

      sum += (Math.min(36000, this.restSum * this.cofinancingRatio));

      for (let i = 2; i <= limit; i++) {
        if (i === 2) {
          deduction = this.firstYearDeduction;
        } else {
          deduction = Math.min(400000, (this.sumPerYear + deduction)) * 0.13;
        }

        sum += (Math.min(36000, (this.sumPerYear + deduction) * this.cofinancingRatio) + sum * this.ROI / 100);
      }

      limit = this.period / 12 - 10;

      if (limit > 0) {
        for (let i = 1; i <= limit; i++) {
          sum += sum * this.ROI / 100;
        }
      }

      if (limit < 0) {
        sum += Math.min(36000, ((this.sumPerYear - this.restSum + deduction) * this.cofinancingRatio)) +
          sum * (Math.pow((1 + (Math.pow(1 + this.ROI / 100, 1 / 12) - 1)), 12 - this.restMonths) - 1);
      } else {
        sum += sum * (Math.pow((1 + (Math.pow(1 + this.ROI / 100, 1 / 12) - 1)), 12 - this.restMonths) - 1);
      }

      return sum;
    },

    // сумма за ОПС
    OPSSum () {
      return this.pensionTransfer * (Math.pow(1 + this.ROI / 100, this.period / 12));
    },

    // Сумма всех вычетов **
    sumDeductions () {
      // предыдущий вычет
      let prevDeduction = 0;

      const limit = this.period / 12;
      let sum = 0;

      for (let i = 1; i <= limit; i++) {
        let currentDeduction = 0;

        if (i === 1) {
          // первый налоговый вычет равен 0
          currentDeduction = Math.min(400000, (this.restSum + 0)) * 0.13;
        } else {
          currentDeduction = Math.min(400000, (this.sumPerYear + prevDeduction)) * 0.13;
        }

        sum += currentDeduction;

        prevDeduction = currentDeduction;
      }

      // sum += Math.min(400000, (this.sumPerYear / 12) * (12 - this.restMonths) + prevDeduction) * 0.13;

      return sum;
    },

    // Инвестиционный доход
    investmentIncome () {
      const sumDeductions = this.taxDeductionValue ? this.sumDeductions : 0;

      return this.totalAmount -
        (this.personalContributions + this.pensionTransfer + this.stateCofinancing + sumDeductions);
    },

    // Итоговая сумма
    // Расчет по формуле = Личные взносы + Софинансирование государства +
    // + Перевод пенсионных накоплений + Инвестиционный доход

    totalAmount () {
      return this.sumDeduction + this.contributionSum + this.cofinancingSum + this.OPSSum;
    },

    // Виды выплат:
    // Срочная выплата = Округленное вниз значение (Итоговая сумма / Срок срочной выплаты / 12)
    urgentPayment () {
      return Math.floor((this.totalAmount / this.periodValue / 12));
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
        lifetime: this.formatNumberToCurrency(this.lifetime),
        // срок срочной выплаты
        periodValue: this.periodValue,

        ageEndValue: this.ageEndValue,

        period: this.period / 12
      };
    },

    // Дисклеймер
    text () {
      return `Не является офертой и не гарантирует доходность в будущем.
      Ожидаемая доходность в размере ${this.ROI}% годовых.
      Расчеты срочных периодических выплат осуществляются в соответствии с выбранной продолжительностью выплат.
      Расчеты пожизненных периодических выплат и единовременной выплаты осуществляются
      исходя из выбранного при расчете пола и возраста начала получения выплат.
      Расчет налогового вычета производится с учетом изменений в Налоговом кодексе.`;
    }
  },
  watch: {
    ageValue: _debounce(function (current, previous) {
      this.currentAge = current;
      this.previousAge = previous;

      this.calcAgeEndValue();
    }, 500),
    genderValue: _debounce(function () {
      this.calcAgeEndValue();
    }, 500)
  },
  updated () {
    setUTM();
  },
  methods: {
    calcAgeEndValue () {
      let min;
      let max;

      if (this.genderValue === 'm') {
        if (this.currentAge <= 45) {
          min = this.currentAge + 15;
          max = 90;
        } else if (this.currentAge > 45 && this.currentAge <= 55) {
          min = 60;
          max = 90;
        } else if (this.currentAge > 55) {
          min = this.currentAge + 4;
          max = 90;
        }
      } else if (this.genderValue === 'w') {
        if (this.currentAge <= 40) {
          min = this.currentAge + 15;
          max = 90;
        } else if (this.currentAge > 40 && this.currentAge <= 50) {
          min = 55;
          max = 90;
        } else if (this.currentAge > 50) {
          min = this.currentAge + 4;
          max = 90;
        }
      }

      if (this.currentAge > this.previousAge) {
        this.$set(this.ageEndField, 'max', max);
        this.$set(this.ageEndField, 'textRight', `${max} ${this.getAgeEnding(max)}`);

        this.$nextTick(() => {
          this.$set(this.ageEndField, 'min', min);
          this.$set(this.ageEndField, 'textLeft', `${min} ${this.getAgeEnding(min)}`);
          this.ageEndValue = min;
        });
      } else {
        this.$set(this.ageEndField, 'min', min);
        this.$set(this.ageEndField, 'textLeft', `${min} ${this.getAgeEnding(min)}`);

        this.$nextTick(() => {
          this.$set(this.ageEndField, 'max', max);
          this.$set(this.ageEndField, 'textRight', `${max} ${this.getAgeEnding(max)}`);
          this.ageEndValue = min;
        });
      }
    },
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
    },
    getAgeEnding (number) {
      number = Math.abs(number) % 100;
      let ending = 'лет';

      if (number > 10 && number < 20) {
        return ending;
      }

      const lastDigit = number % 10;

      if (lastDigit === 1) {
        ending = 'год';
      } else if ([2, 3, 4].includes(lastDigit)) {
        ending = 'года';
      }

      return ending;
    },
    clickAction () {
      const _tmr = window._tmr || (window._tmr = []);
      _tmr.push({ type: 'reachGoal', id: 2866471, goal: 'click_apply-program' });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "AppCalculator";
</style>
