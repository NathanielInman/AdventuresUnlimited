<template lang="pug">
main: .pt-5.card.flex.flex-wrap.align-items-center.justify-content-center
  .container
    h1.text-2xl Help
    hr
    p.
      These are small calculators for Adventures Unlimited. Pick one from the
      navigation bar on the left; hover it to see the labels.
    hr
    h3.text-xl.font-light Items
    p.
      Search every item the area files define, filter by type, slot, area and level, and
      sort by a score you weight yourself. Click an item to see its stats. Share URL copies
      a link straight to that item.
    h3.text-xl.font-light Damage
    p The damage strings for monks and everyone else, in order.
    h3.text-xl.font-light Homes
    p.
      Price out a house or manor in diamonds and gold. Every option lands in the URL, so
      Share URL hands someone your exact build.
    h3.text-xl.font-light Territories
    p.
      Paste the output of #[code territory clan] and get back the areas nobody has conquered yet.
    hr
    p.
      The guides and reference pages live on the
      #[a(href='../') Adventures Unlimited docs site].
      Found a wrong number? #[a(href='https://github.com/NathanielInman/AdventuresUnlimited/issues') Open an issue].
</template>
<script>
// Prepare the main template
export default {
  name: 'HelpIndex'
};
</script>
