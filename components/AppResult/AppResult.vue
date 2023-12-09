<template>
  <div class="app-result">
    <h2 class="app-result__title">
      {{ title }}
    </h2>

    <div class="app-result__base">
      <div class="app-result__total">
        <p class="app-result__value app-result__value--big">
          {{ totalAmount }}
        </p>

        <p class="app-result__total-text">
          Итоговая сумма накоплений
          в программе
        </p>

        <p class="app-result__total-description">
          Вы сможете вернуть 13% от суммы ваших личных взносов по договору долгосрочных сбережений на сумму 325 000
          ₽
        </p>
      </div>

      <div class="app-result__items">
        <p class="app-result__items-title h4">
          Из чего состоит итоговая сумма?
        </p>

        <div class="app-result__item">
          <p class="app-result__item-text">
            Ваши личные взносы
          </p>
          <p class="app-result__item-value h4">
            {{ personalContributions }}
          </p>
        </div>
        <div class="app-result__item">
          <p class="app-result__item-text">
            Перевод пенсионных накоплений (ОПС)
          </p>
          <p class="app-result__item-value h4">
            {{ pensionTransfer }}
          </p>
        </div>
        <div class="app-result__item">
          <p class="app-result__item-text">
            Софинансирование от государства
          </p>
          <p class="app-result__item-value h4">
            {{ stateCofinancing }}
          </p>
        </div>
        <div class="app-result__item">
          <p class="app-result__item-text">
            Инвестиционный доход
          </p>
          <p class="app-result__item-value h4">
            {{ investmentIncome }}
          </p>
        </div>
      </div>
    </div>

    <div class="app-result__cards">
      <p class="app-result__cards-title h4">
        Вы сможете выбрать один из видов выплаты
      </p>

      <div class="app-result__cards-list">
        <div class="app-result__card">
          <p class="app-result__card-label">
            Срочная
          </p>

          <p class="app-result__value">
            {{ urgentPayment }}
          </p>

          <p class="app-result__card-text">
            Срок срочной выплаты — 10 лет
          </p>
        </div>
        <div class="app-result__card">
          <p class="app-result__card-label">
            Единовременная
          </p>

          <p class="app-result__value">
            {{ oneTime }}
          </p>

          <p class="app-result__card-text">
            Доступно через 15 лет с даты
            заключения договора
          </p>
        </div>
        <div class="app-result__card">
          <p class="app-result__card-label">
            Пожизненная
          </p>

          <p class="app-result__value">
            {{ lifetime }}
          </p>

          <p class="app-result__card-text">
            Расчёт предварительный. Точная
            сумма будет рассчитана в момент
            оформления выплаты
          </p>
        </div>
      </div>
    </div>

    <div class="app-result__bottom">
      <div class="app-result__actions">
        <div v-for="(item, idx) in actions" :key="idx" class="app-result__action">
          <AppButton :data="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppButton from '~/components/AppButton/AppButton';

export default {
  name: 'AppResult',
  components: { AppButton },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      title: 'Результаты расчета',
      actions: [
        {
          name: 'calculate',
          text: 'Оставить заявку*',
          title: 'Оставить заявку*',
          theme: 'green'
        },
        {
          name: 'submit',
          text: 'Изменить параметры расчета',
          title: 'Изменить параметры расчета'
        }
      ]
    };
  },
  computed: {
    // Итоговая сумма накоплений в программе
    totalAmount () {
      return this.data.totalAmount;
    },
    personalContributions () {
      return this.data.personalContributions;
    },
    pensionTransfer () {
      return this.data.pensionTransfer;
    },
    stateCofinancing () {
      return this.data.stateCofinancing;
    },
    investmentIncome () {
      return this.data.investmentIncome;
    },
    urgentPayment () {
      return this.data.urgentPayment;
    },
    oneTime () {
      return this.data.oneTime;
    },
    lifetime () {
      return this.data.lifetime;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "AppResult";
</style>