<template>
  <div class="app-field">
    <template v-if="type === 'switch'">
      <AppSwitch :data="data" @input="input" />
    </template>
  </div>
</template>

<script>
import AppSwitch from '~/components/FormFields/AppSwitch/AppSwitch';

export default {
  name: 'AppField',
  components: { AppSwitch },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    type () {
      return this.data.type;
    }
  },
  methods: {
    input (e) {
      this.$emit('input', e);
    }
  }
};
</script>
