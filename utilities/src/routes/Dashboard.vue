<template lang="pug">
section(style='padding-top: 0')
  .grid.bg-indigo-700.text-primary-50.border-round-md.mb-2
    .col
      .text-2xl.font-bold Welcome!
      hr
      h3 This application is a collection of helpful AU utilities.
      p.
        Links to the utilities are found to the left in the navigation bar.
</template>
<script>
import { mapState } from 'pinia';
import { usersStore } from '../stores/';

// Prepare the main template
export default {
  name: 'DashboardIndex',
  computed: {
    ...mapState(usersStore, ['name'])
  }
};
</script>
<style lang="stylus" scoped>
.bold
  font-weight bold
</style>
