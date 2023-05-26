<template lang="pug">
main: .pt-5.card.flex.flex-wrap.align-items-center.justify-content-center
  .container
    h1.text-2xl Help
    hr
    p.
      Hello {{name}}!
    hr
    h3.text-xl.font-light Getting Started
    p This project is merely meant to display a design proposal.
</template>
<script>
import { mapState } from 'pinia';
import { usersStore } from '../stores/';

// Prepare the main template
export default {
  name: 'HelpIndex',
  computed: {
    ...mapState(usersStore, ['name'])
  }
};
</script>
