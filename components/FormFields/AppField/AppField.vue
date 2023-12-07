<template>
  <div class="app-field">
    <label v-if="label" :for="id" class="app-field__label">
      {{ label }}
    </label>

    <template v-if="type === 'switch'">
      <AppSwitch :data="data" :value="value" @input="input" />
    </template>

    <template v-if="type === 'text'">
      <AppInput :data="data" :value="value" @input="input" />
    </template>

    <template v-if="type === 'select'">
      <AppSelect :data="data" :value="value" @input="input" />
    </template>

    <template v-if="type === 'range'">
      <AppRange :data="data" :value="value" @input="input" />
    </template>

    <div v-if="textLeft || textRight" class="app-field__bottom">
      <span v-if="textLeft" class="app-field__text app-field__text--left">
        {{ textLeft }}
      </span>
      <span v-if="textRight" class="app-field__text app-field__text--right">
        {{ textRight }}
      </span>
    </div>
  </div>
</template>

<script>
import AppSwitch from '~/components/FormFields/AppSwitch/AppSwitch';
import AppInput from '~/components/FormFields/AppInput/AppInput';
import AppSelect from '~/components/FormFields/AppSelect/AppSelect';
import AppRange from '~/components/FormFields/AppRange/AppRange';

export default {
  name: 'AppField',
  components: { AppRange, AppSelect, AppInput, AppSwitch },
  props: {
    data: {
      type: Object,
      required: true
    },
    value: {
      type: [String, Number, Object],
      default: null
    }
  },
  computed: {
    type () {
      return this.data.type;
    },
    label () {
      return this.data.label || '';
    },
    id () {
      return this.data.id;
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
      this.$emit('input', e);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "AppField";
</style>
