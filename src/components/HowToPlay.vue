<script setup lang="ts">
  import { RouterLink } from "vue-router"
import WelcomeItem from "./WelcomeItem.vue";
import CommunityIcon from "./icons/IconCommunity.vue";

</script>

<template>
  <WelcomeItem>
    <template #icon>
      <CommunityIcon />
    </template>

    <template #heading>How to play</template>

    <p>Press a button to start the game. The game will get 6 random people from the internet.</p>
    <p>Then you choose a person on the left and person on the right. And you play 🤘🧻✂.</p>
    <p>Leaderboard table can be viewed in the <RouterLink to="/scores">Scores</RouterLink> page</p>

    <br />
  </WelcomeItem>

</template>
