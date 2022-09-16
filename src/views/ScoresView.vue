<script setup lang="ts">
import { ref, type Ref } from "vue";
import scoresTable from "../components/ScoresTable.vue";
import { getUsers, getScores } from "../functions/utils.js";

interface IScore {
  name: string;
  wins: number;
}

const scores: Ref<Array<IScore>> = ref([]);
scores.value = getScores();

</script>

<template>
  <div class="scoreboard">

    <h1 v-if="scores.length == 0" style="text-align: center; padding-top: 30px;">
      No scores yet, play a game!
    </h1>

    <div v-if="scores.length != 0">
      <scoresTable :scores="scores" />
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .scoreboard {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
