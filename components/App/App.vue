<template>
  <div class="app">
    <AppCategories />
    <AppCalculator />
  </div>
</template>

<script>
import AppCalculator from '~/components/AppCalculator/AppCalculator';
import AppCategories from '~/components/AppCategories/AppCategories';

export default {
  name: 'App',
  components: { AppCategories, AppCalculator }
};
</script>
