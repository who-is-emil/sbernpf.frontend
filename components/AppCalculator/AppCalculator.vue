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
        {{ result }}
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
      // Процент доходности
      percent: 8,

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
    // Промежуточные значения:
    // Сумма взноса в год = Сумма взносов в месяц * 12
    sumPerYear () {
      return this.sumValue * 12;
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

      return this.sumAccountValue;
    },
    // Инвестиционный доход
    investmentIncome () {
      const first = this.sumPerYear;
      const second = ((Math.pow((1 + this.percent), this.period) - 1) / ((1 + this.percent) - 1));
      const third = (1 + this.percent);
      const fourth = this.cofinancing;
      const fifth = ((Math.pow((1 + this.percent), this.periodMinCalc) - 1) / (((1 + this.percent) - 1) * (1 + this.percent)));
      const sixth = (Math.pow((1 + this.percent), this.periodAboveZeroCalc));
      const seventh = this.pensionTransfer;
      const eighth = (Math.pow((1 + this.percent), this.period));

      console.log('this.period: ', this.period);
      console.log('this.percent: ', this.percent);
      const test = ((Math.pow((1 + this.percent), this.period)) - 1) / ((1 + this.percent) - 1);
      console.log('test: ', test);

      console.log(first);
      console.log(second);
      console.log(third);
      console.log(fourth);
      console.log(fifth);
      console.log(sixth);
      console.log(seventh);
      console.log(eighth);

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
    // “Пожизненная”.
    // Округленное вниз значение (“Итоговая сумма”/”Значение аннуитета по таблице аннуитета для пожилых лиц”)
    lifetime () {
      // TODO не работает
      return Math.floor(this.totalAmount / 300);
    },

    result () {
      return {
        // Итоговая сумма накоплений в программе
        totalAmount: this.totalAmount,
        // Ваши личные взносы
        personalContributions: this.personalContributions,
        // Перевод пенсионных накоплений (ОПС)
        pensionTransfer: this.pensionTransfer,
        // Софинансирование от государства
        stateCofinancing: this.stateCofinancing,
        // Инвестиционный доход
        investmentIncome: this.investmentIncome,
        // Срочная
        urgentPayment: this.urgentPayment,
        // Единовременная
        oneTime: this.oneTime,
        // Пожизненная
        lifetime: this.lifetime
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
  }
};
</script>

<style lang="scss" scoped>
@import "AppCalculator";
</style>
