<template>
  <div class="app-input">
    <input
      :id="id"
      ref="inputRef"
      :type="type"
      :class="['app-input__input', focusClass]"
      :placeholder="placeholder"
      :value="value"
      @keydown="checkInput"
      @focusin="focusIn"
      @focusout="focusOut"
      @input="input"
      @copy.prevent="copyPastePrevent"
      @paste.prevent="copyPastePrevent"
    >
  </div>
</template>

<script>

export default {
  name: 'AppInput',
  props: {
    data: {
      type: Object,
      required: true
    },
    value: {
      type: [String, Number],
      default: ''
    }
  },
  data () {
    return {
      focusClass: ''
    };
  },
  computed: {
    id () {
      return this.data.id;
    },
    placeholder () {
      return this.data.placeholder || '';
    },
    type () {
      return this.data.type || 'text';
    },
    onlyPositiveValue () {
      return this.data.onlyPositiveValue || false;
    },
    minValue () {
      return this.data.minValue || false;
    }
  },
  methods: {
    copyPastePrevent (e) {
      if (this.onlyPositiveValue) {
        e.preventDefault();
      }
    },
    checkInput (e) {
      if (this.onlyPositiveValue) {
        // Проверяем, является ли нажатая клавиша минусом
        if (e.key === '-') {
          // Если да, предотвращаем действие по умолчанию
          e.preventDefault();
        }
      }
    },
    input (e) {
      this.$emit('input', e.target.value);
    },
    focusIn () {
      this.focusClass = 'focusin';
    },
    focusOut () {
      this.focusClass = '';
    }
  }
};
</script>

<style lang="scss" scoped>
@import "AppInput";
</style>
