<template>
  <div class="app">
    <AppHeader />
    <AppCategories />
    <AppCalculator />
  </div>
</template>

<script>
import AppCalculator from '~/components/AppCalculator/AppCalculator';
import AppCategories from '~/components/AppCategories/AppCategories';
import AppHeader from '~/components/AppHeader/AppHeader';

export default {
  name: 'App',
  components: { AppHeader, AppCategories, AppCalculator }
};
</script>
