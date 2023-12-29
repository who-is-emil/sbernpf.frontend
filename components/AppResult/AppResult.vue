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
          в&nbsp;программе
        </p>

        <p v-if="taxDeductionText" class="app-result__total-description">
          {{ taxDeductionText }}
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

        <div v-if="taxDeduction" class="app-result__item">
          <p class="app-result__item-text">
            Налоговый вычет
          </p>
          <p class="app-result__item-value h4">
            {{ taxDeduction }}
          </p>
        </div>
      </div>
    </div>

    <div class="app-result__cards">
      <p class="app-result__cards-title h4">
        Вы сможете выбрать один из видов выплат в {{ ageEndValue }}
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
            Ежемесячный размер выплат, получаемый Вами в течение {{ periodValue }} лет
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
            {{ cardOnceText }}
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
            Ежемесячный размер выплат, получаемый Вами в течение всей жизни после назначения выплаты
          </p>
        </div>
      </div>
    </div>

    <div class="app-result__bottom">
      <div class="app-result__actions">
        <div v-for="(item, idx) in actions" :key="idx" class="app-result__action">
          <template v-if="item.name === 'request'">
            <AppButton :data="item" />
          </template>

          <template v-if="item.name === 'edit'">
            <AppButton :data="item" @click="edit" />
          </template>
        </div>
      </div>

      <div class="app-result__text">
        {{ text }}
      </div>

      <!--      <div class="app-result__caption">-->
      <!--        *Вы будете перенаправлены на сайт СберНПФ-->
      <!--      </div>-->
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
      title: 'Результат расчета',
      ROI: 7,
      actions: [
        {
          name: 'request',
          text: 'Оставить заявку*',
          title: 'Оставить заявку*',
          theme: 'gradient',
          external: true,
          href: 'https://npfsberbanka.ru/pds/?utm_source=sbersite&utm_medium=pdsportal&utm_campaign=getlead&utm_content=1#subscription'
        },
        {
          name: 'edit',
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
    // Ваши личные взносы
    personalContributions () {
      return this.data.personalContributions;
    },
    // Перевод пенсионных накоплений (ОПС)
    pensionTransfer () {
      return this.data.pensionTransfer;
    },
    // Софинансирование от государства
    stateCofinancing () {
      return this.data.stateCofinancing;
    },
    // Инвестиционный доход
    investmentIncome () {
      return this.data.investmentIncome;
    },
    // Налоговый вычет
    taxDeduction () {
      return this.data.taxDeduction;
    },
    taxDeductionText () {
      return this.data.taxDeductionText;
    },
    // Срочная
    urgentPayment () {
      return this.data.urgentPayment;
    },
    // Единовременная
    oneTime () {
      return this.data.oneTime;
    },
    // Пожизненная
    lifetime () {
      return this.data.lifetime;
    },
    periodValue () {
      return this.data.periodValue;
    },
    ageEndValue () {
      return `${this.data.ageEndValue} ${this.getAgeEnding(this.data.ageEndValue)}`;
    },
    text () {
      return `Не является офертой и не гарантирует доходность в будущем.
      Ожидаемая доходность в размере ${this.ROI}% годовых.
      Расчеты срочных периодических выплат осуществляются в соответствии с выбранной продолжительностью выплат.
      Расчеты пожизненных периодических выплат и единовременной выплаты осуществляется осуществляются
      исходя из выбранного при расчете пола и возраста начала получения выплат.
      Расчет налогового вычета произведен с учетом  изменений в Налоговом кодексе, которые вступят в силу в 2024 году`;
    },
    cardOnceText () {
      if (this.data.period >= 15) {
        return 'Доступно через 15 лет с даты заключения договора';
      }

      return 'Если размер пожизненной выплаты меньше 10% прожиточного минимума пенсионера, то участник может получить единовременную выплату';
    }
  },
  methods: {
    edit () {
      this.$emit('edit');
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
    }
  }
};
</script>

<style lang="scss" scoped>
@import "AppResult";
</style>
