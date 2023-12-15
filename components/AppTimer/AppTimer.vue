<template>
  <div class="app-timer">
    <div class="app-timer__line" :style="`width: ${percent}%`">
      <div class="app-timer__text">
        {{ text }}
      </div>
      <div class="app-time__time" v-html="time" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppTimer',
  data () {
    return {
      time: '',
      text: 'До старта программы',
      percent: 0
    };
  },
  created () {
    this.timerInit();

    setInterval(this.timerInit, 5000);
  },
  methods: {
    timerInit () {
      const start = new Date('2023-10-01T00:00:00');

      // Создаем дату 1 января 2024 года
      const newYear = new Date('2024-01-01T00:00:00');

      // Получаем текущую дату и время
      const now = new Date();

      // Вычисляем разницу в миллисекундах
      const diff = newYear - now;

      // Вычисляем общее количество миллисекунд между начальной и конечной датами
      const totalMillis = newYear - start;

      // Вычисляем количество прошедших миллисекунд
      const elapsedMillis = now - start;

      // Вычисляем процент пройденного времени
      this.percent = Math.round((elapsedMillis / totalMillis) * 100);

      // Преобразуем миллисекунды в дни, часы и минуты
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      // Функция для выбора правильного окончания слова
      function getEnding (number, options) {
        const lastDigit = number % 10;
        const lastTwoDigits = number % 100;
        if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
          return options[3];
        }
        switch (lastDigit) {
          case 1:
            return options[0];
          case 2:
          case 3:
          case 4:
            return options[1];
          default:
            return options[2];
        }
      }

      const dd = `${days} ${getEnding(days, ['<span>день</span>', '<span>дня</span>', '<span>дней</span>'])}`;
      const hh = `${hours} ${getEnding(hours, ['<span>час</span>', '<span>часа</span>', '<span>часов</span>'])}`;
      const mm = `${minutes} ${getEnding(minutes, ['<span>минута</span>', '<span>минуты</span>', '<span>минут</span>'])}`;

      this.time = `${dd} ${hh} ${mm}`;

      // Проверяем, наступила ли дата 1 января 2024 года
      if (now >= newYear) {
        this.$emit('newYear');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "AppTimer";
</style>
