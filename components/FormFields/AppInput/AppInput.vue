<template>
  <div class="app-input">
    <input
      :id="id"
      type="text"
      :class="['app-input__input', focusClass]"
      :placeholder="placeholder"
      :value="value"
      @focusin="focusIn"
      @focusout="focusOut"
      @input="input"
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
    }
  },
  methods: {
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
