<template lang="pug">
main
  section.section
    .container
      h1.title Help
      hr
      p.
        Hello {{name}}!
      hr
      h3.subtitle Getting Started
      p In order to get started merely run
      pre npm install
      p That will install all of the dependencies, in order to start the project:
      pre npm start
</template>
<script>
import Vuex from 'vuex';

const {mapActions,mapGetters,mapMutations,mapState} = Vuex;

// Prepare the main template
export default {
  name: 'HelpIndex',
  computed: {
    ...mapState('user',['name'])
  }
};
</script>
