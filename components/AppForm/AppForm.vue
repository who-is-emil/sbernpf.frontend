<template>
  <div class="app-form">
    <div class="app-form__content">
      <div class="mb-40">
        Официальный доход

        <client-only>
          <v-select
            v-model="incomeValue"
            :searchable="false"
            :clearable="false"
            :options="incomeArray"
          />
        </client-only>
      </div>

      <div class="mb-40">
        Сумма взносов в месяц

        <input v-model="sumPerMonth" type="text">
      </div>

      <div class="mb-40">
        Перенос средств ОПС

        <input v-model="transfer" type="text">

        <div>
          <label for="checkbox1" style="display: block;">
            <input id="checkbox1" v-model="checkOPS" type="checkbox">
            <span>Учитывать накопления ОПС</span>
          </label>
        </div>
      </div>

      <div class="mb-40">
        <input id="radio1" v-model="gender" type="radio" name="gender" value="m">
        <label for="radio1">М</label>

        <input id="radio2" v-model="gender" type="radio" name="gender" value="w">
        <label for="radio2">Ж</label>
      </div>

      <div class="mb-40">
        Ваш возраст

        <client-only>
          <vue-slider ref="slider" v-model="age" />
        </client-only>
      </div>

      <div class="mb-40">
        Возраст начала получения выплат

        <client-only>
          <vue-slider ref="slider" v-model="startAge" />
        </client-only>
      </div>

      <div class="mb-40">
        Срок срочной выплаты

        <client-only>
          <vue-slider ref="slider" v-model="deadline" />
        </client-only>
      </div>

      <div class="app-form__result">
        <div class="mb-40">
          Сумма взноса в год:

          {{ sumPerYear }}
        </div>

        <div class="mb-40">
          Период участия:

          {{ period }}
        </div>

        <div class="mb-40">
          Софинансирование в год:

          {{ cofinancing }}
        </div>

        <div class="mb-40">
          Личные взносы:

          {{ personalContributions }}
        </div>

        <div class="mb-40">
          Софинансирование государства:

          {{ stateCofinancing }}
        </div>

        <div class="mb-40">
          Перевод пенсионных накоплений:

          {{ pensionTransfer }}
        </div>

        <div class="mb-40">
          Инвестиционный доход:

          {{ investmentIncome }}
        </div>

        <div class="mb-40">
          Налоговые вычеты:

          {{ taxDeductions }}
        </div>

        <div class="mb-40">
          Итоговая сумма:

          {{ totalAmount }}
        </div>

        <hr>
        <div class="mb-40">
          Срочная выплата:

          {{ urgentPayment }}
        </div>

        <div class="mb-40">
          Единовременная:

          {{ oneTime }}
        </div>
        <div class="mb-40">
          Пожизненная:

          {{ lifetime }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppForm',
  data () {
    return {
      // Процент доходности
      percent: 8,
      // официальный доход
      incomeArray: [
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
      ],
      incomeValue: {
        label: 'до 80 000 ₽',
        value: 'val_1'
      },
      // сумма взноса в месяц
      sumPerMonth: 100000,
      // Перенос средств ОПС
      transfer: 10000,
      // Учитывать накопления ОПС
      checkOPS: true,
      // Пол
      gender: 'm',
      // Возраст
      age: 35,
      // Возраст начала получения выплат
      startAge: 60,
      // Срок срочной выплаты
      deadline: 5
    };
  },
  computed: {
    // Сумма взноса в год = (Сумма взносов в месяц * 12)
    sumPerYear () {
      return this.sumPerMonth * 12;
    },
    // Период участия = (Возраст начала получения выплат - Ваш возраст)
    period () {
      return this.startAge - this.age;
    },
    // коэффициент софинансирования
    cofinancingRatio () {
      if (this.incomeValue.value === 'val_1') {
        return 1; // до 80 000 = 1,
      } else if (this.incomeValue.value === 'val_2') {
        return 0.5; // от 80 000 до 150 000 = 0.5
      }

      return 0.25; // более 150 000 = 0.25
    },
    // Софинансирование в год = Меньшее(36 000 ; “Сумма взноса в год” * коэффициент софинансирования государством)
    cofinancing () {
      const maxPerYear = 36000;
      const calcMinValue = this.sumPerYear * this.cofinancingRatio;

      return Math.min(maxPerYear, calcMinValue);
    },
    // Личные взносы = (Сумма взноса в год * Период участия)
    personalContributions () {
      return this.sumPerYear * this.period;
    },
    periodMinCalc () {
      return Math.min(this.period, 3);
    },
    periodAboveZeroCalc () {
      return this.period - 4 < 0 ? 0 : this.period - 4;
    },
    // Софинансирование государства
    // = Меньшее(36 000 || Сумма взноса в год * коэффициент софинансирования государством) * Меньшее(3 || Период участия).
    stateCofinancing () {
      return this.cofinancing * this.periodMinCalc;
    },
    // Перевод пенсионных накоплений
    // 0, если чекбокс “Учитывать накопление ОПС” не активен.
    // Перенос средств ОПС, если чекбокс “Учитывать накопление ОПС” активен.
    pensionTransfer () {
      if (!this.checkOPS) {
        return 0;
      }

      return this.transfer;
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

      return (first * second * third) + (fourth * fifth * sixth + seventh * eighth);
    },
    // Налоговые вычеты
    taxDeductions () {
      return (Math.min(400000, this.sumPerYear) * 0.13) * this.period;
    },
    // Итоговая сумма
    totalAmount () {
      return this.personalContributions + this.stateCofinancing + this.pensionTransfer + this.investmentIncome;
    },

    // Виды выплат:
    // Срочная выплата
    urgentPayment () {
      return Math.round((this.totalAmount / this.period * 12));
    },
    // Единовременная
    oneTime () {
      // TODO доработать Доступно через 15 лет с даты заключения договора
      return this.totalAmount;
    },
    // Пожизненная
    lifetime () {
      return 'Пока не работает';
    }
  }
};
</script>

<style scoped>
.app-form {
  width: 400px;
  margin-left: auto;
  margin-right: auto;
}

.app-form__result {
  margin-top: 80px;
  padding: 40px 24px;
  border: 1px solid;
}

.mb-40 {
  margin-bottom: 40px;
}
</style>
