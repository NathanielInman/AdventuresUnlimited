<template lang="pug">
main: .pt-5.card.flex.flex-wrap.align-items-center.justify-content-center
  .container
    h1.text-2xl Adventures Unlimited utilities
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
