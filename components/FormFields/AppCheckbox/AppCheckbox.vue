<template>
  <label class="app-checkbox">
    <input
      :id="id"
      :checked="value"
      :name="name"
      type="checkbox"
      class="app-checkbox__input"
      @change="change"
    >
    <span class="app-checkbox__box" />
    <span v-if="text" class="app-checkbox__text">{{ text }}</span>
  </label>
</template>

<script>
export default {
  name: 'AppCheckbox',
  props: {
    data: {
      type: Object,
      required: true
    },
    value: {
      type: Boolean
    }
  },
  computed: {
    id () {
      return this.data.id;
    },
    name () {
      return this.data.name;
    },
    text () {
      return this.data.text;
    }
  },
  methods: {
    change () {
      this.$emit('input', !this.value);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "AppCheckbox";
</style>
