<template lang="pug">
main
  router-view
  footer.footer
    .container
      .content.has-text-centered
        p.
          #[strong Territory Calculator] was written by 
          #[a(href='http://nathanielinman.com') Nathaniel Inman] of
          #[a(href='http://www.theoestudio.com') The OE Studio] for
          #[a(href='http://tharel.net') Adventures Unlimited].
        p.
          Copyright © {{(new Date).getFullYear()}}
          #[a(href='http://www.theoestudio.com') The OE Studio]. All Rights Reserved.
</template>
<script>
import Vuex from 'vuex';

const {mapActions,mapGetters,mapState,mapMutations} = Vuex;

// Prepare the main template
export default {
  name: 'app',
  data(){
    return {
      menuActive: 0
    };
  }
};
</script>
<style lang="stylus" scoped>
.b-tabs .tab-content
  overflow visible

section.tab-content
  background #fff
  padding 1rem
  border-right 1px solid #dbdbdb
  border-left 1px solid #dbdbdb
  border-bottom 1px solid #dbdbdb
.b-tabs .tabs
  margin-bottom 0
</style>
