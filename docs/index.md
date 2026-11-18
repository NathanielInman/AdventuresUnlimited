---
layout: home
title: Adventures Unlimited
# The home page draws its own sections (docs/.vitepress/theme/home/), so the
# markdown below skips the usual page styles and the components style it
markdownStyles: false
---

<script setup>
import HomeHero from './.vitepress/theme/home/HomeHero.vue'
import HomeEntries from './.vitepress/theme/home/HomeEntries.vue'
import HomeGettingIn from './.vitepress/theme/home/HomeGettingIn.vue'
import HomeSpeedwalk from './.vitepress/theme/home/HomeSpeedwalk.vue'
import HomeStats from './.vitepress/theme/home/HomeStats.vue'
import HomeNote from './.vitepress/theme/home/HomeNote.vue'
</script>

<HomeHero />

<HomeEntries />

<HomeGettingIn>

## Getting in

Connect with any MUD client to `tharel.net` port `5005`. The [TinTin++ guide](./guides/tintin/index.md) has ready-made prompts and loops if you play in that client.

Directions on these pages are speedwalks from Market Square in Naerlan: `4e9n` means 4 east then 9 north.

<HomeSpeedwalk />

</HomeGettingIn>

<HomeStats />

<HomeNote>

## Found something wrong?

This is a fan project. It isn't affiliated with the game's staff, and anything here can drift from the live game. If a number doesn't match what you see in game, [open an issue](https://github.com/NathanielInman/AdventuresUnlimited/issues/new/choose) with what you saw, or use the edit link at the bottom of any page.

</HomeNote>
