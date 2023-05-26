<template lang="pug">
.header
  .header-left
    i.fa.fa-bar-chart(style='color:#6af;font-size:1.5rem')
    span.vertical-left Design Proposal
  .header-right
    .tagline
      | hello
      .pl-1.username {{ name }}
      .pr-2 !
    .a.icon(href='/')
      i.fa.fa-sign-out
.content-wrapper
  .main-container
    router-view
  nav(v-on:mouseover='expanded = true',
    v-on:mouseleave='expanded = false',
    :class='{ expanded }')
    .menu-wrapper: .menu
      router-link(to='/')
        .animation-wrapper
          i.fa.fa-home
          label Home
      router-link(to='/help')
        .animation-wrapper
          i.fa.fa-question
          label Help
.footer
  p.
    #[strong AdventuresUnlimited Colorizor] was written by
    #[.pl-2]
    #[a(href='http://nathanielinman.com') Nathaniel Inman] of
    #[a(href='http://www.theoestudio.com') The OE Studio].
  p.
    Copyright © {{(new Date).getFullYear()}}
    #[a(href='http://www.theoestudio.com') The OE Studio]. All Rights Reserved.
</template>
<script>
import { mapState } from 'pinia';
import { usersStore } from './stores/';

// Prepare the main template
export default {
  name: 'app',
  data: () => ({ expanded: false }),
  computed: {
    ...mapState(usersStore, ['name'])
  }
};
</script>
<style lang="stylus" scoped>
.header
  display flex
  align-items center
  justify-content space-between
  background #273549
  height 60px
  padding 0 18px
.content-wrapper
  display flex
  flex-direction row
  height calc(100% - 60px)
  .main-container
    background #f9fafb
    position absolute
    padding 1rem
    left 60px
    right 0
    top 60px
    bottom 0
    overflow auto
nav
  background #273549
  max-width 300px
  padding-top 20px
  z-index 0
  border-top 1px solid #e0e7ef
  .menu-wrapper, .menu
    display flex
    flex-direction column
    flex-grow 1
    cursor pointer
    a
      color #dfe4e8
      display flex
      justify-content center
      min-height 40px
      padding 15px 20px
      text-decoration none
      transition all 0.1s
      .animation-wrapper
        display flex
        flex-grow 1
        min-width 20px
        transition max-width 0.1s
    i
      display flex
      align-items center
      color inherit
      pointer-events none
      text-align center
      transition all 0.3s
      width 20px
    &.router-link-active i
      color #3fb1f2
      & + label
        color #3fb1f2
  label
    color inherit
    display flex
    justify-content space-between
    margin 0
    opacity 0
    pointer-events none
    transform translateX(30px)
    transition all 0.1s
    width 0px
  &.expanded
    max-width 300px
    transition 0.1s
    label
      margin 0 15px
      opacity 1
      transform translateX(0)
      width 100%
.header-left
  display flex
  align-items center
  span
    color white
.header-right
  display flex
  .tagline
    color white
    display flex
  .username
    color #a9d5ef
    margin-left 0.25rem
  .icon
    width 2rem
    color white
    text-decoration none
    &:hover
      color #3fb1f2
      cursor pointer
.footer
  position absolute
  left 0
  right 0
  bottom 0
  flex-direction column
  background #273549
  padding 1rem
  display flex
  justify-content center
  text-align center
  color #c6c6c6
</style>
