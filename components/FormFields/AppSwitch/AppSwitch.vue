<template>
  <div class="app-switch">
    <div v-for="(item, index) in items" :key="index" class="app-switch__button">
      <input
        :id="item.id"
        v-model="selectedOption"
        :value="item.value"
        :name="name"
        type="radio"
        class="app-switch__input"
        @change="input"
      >
      <label
        :for="item.id"
        class="app-switch__label"
        :aria-label="item.label"
      >
        {{ item.text }}
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppSwitch',
  props: {
    data: {
      type: Object,
      required: true
    },
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      selectedOption: this.value
    };
  },
  computed: {
    id () {
      return this.data.id;
    },
    name () {
      return this.data.name;
    },
    items () {
      return (this.data.values || []).map((item, idx) => {
        return {
          ...item,
          id: idx === 0 ? this.id : `${this.id}-${idx}`
        };
      });
    }
  },
  methods: {
    input () {
      this.$emit('input', this.selectedOption);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "AppSwitch";
</style>
