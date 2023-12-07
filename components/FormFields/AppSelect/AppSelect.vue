<template>
  <div class="app-select">
    <v-select
      :id="id"
      :searchable="searchable"
      :clearable="clearable"
      :options="options"
      :value="value"
      :aria-label="label"
      @input="input"
    >
      <template #open-indicator="{ attributes }">
        <span v-bind="attributes">
          <AppIcon name="24/arrow" />
        </span>
      </template>

      <template #spinner>
        <div class="vs__spinner" />
      </template>
    </v-select>
  </div>
</template>

<script>
import AppIcon from '~/components/AppIcon/AppIcon';
export default {
  name: 'AppSelect',
  components: { AppIcon },
  props: {
    data: {
      type: Object,
      required: true
    },
    value: {
      type: Object,
      default: () => {
      }
    }
  },
  computed: {
    id () {
      return this.data.id;
    },
    searchable () {
      return this.data.searchable || false;
    },
    clearable () {
      return this.data.clearable || false;
    },
    options () {
      return this.data.options || [];
    },
    label () {
      return this.data.label || '';
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
@import "AppSelect";
</style>
