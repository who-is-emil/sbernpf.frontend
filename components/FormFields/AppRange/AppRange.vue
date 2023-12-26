<template>
  <div class="app-range">
    <div class="app-range__wrap">
      <input
        :id="id"
        ref="input"
        :value="value"
        :min="min"
        :max="max"
        :disabled="disabled"
        type="number"
        class="app-range__input"
        @focusin="focusIn"
        @focusout="focusOut"
        @change="input"
      >
    </div>

    <div class="app-range__slider">
      <client-only>
        <vue-slider
          ref="slider"
          :value="value"
          :min="min"
          :max="max"
          :height="3"
          :dot-size="20"
          :disabled="disabled"
          @change="change"
        >
          <template #tooltip>
            <div class="vue-slider-tootltip" />
          </template>
        </vue-slider>
      </client-only>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppRange',
  props: {
    data: {
      type: Object,
      required: true
    },
    value: {
      type: [Number, String],
      default: 0
    }
  },
  computed: {
    id () {
      return this.data.id;
    },
    min () {
      return this.data.min || 0;
    },
    max () {
      return this.data.max || 100;
    },
    disabled () {
      return this.data.disabled;
    },
    textLeft () {
      return this.data.textLeft || '';
    },
    textRight () {
      return this.data.textRight || '';
    }
  },
  methods: {
    input (e) {
      if (this.disabled) {
        return;
      }

      const value = this.valueCheck(e.target.value);

      this.$refs.slider.setValue(value);
      this.$refs.input.value = value;
    },
    change (e) {
      if (this.disabled) {
        return;
      }

      this.$emit('input', +e);
    },
    valueCheck (value) {
      if (!value) {
        return this.min;
      }

      const toIntValue = parseInt(value, 10);

      if (!toIntValue) {
        return this.min;
      }

      if (this.min > value) {
        return this.min;
      } else if (this.max < value) {
        return this.max;
      }

      return toIntValue;
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
@import "AppRange";
</style>
