<script setup lang="ts">
import { ref, type Ref } from "vue";
import scoresTable from "../components/ScoresTable.vue";

// const users = ref([]);

</script>

<template>
  <div class="scoreboard">
    <h1>This is a scoreboard page</h1>

    <!-- <button class="btn btn-primary" @click="getUsers">
      Get Users
    </button> -->

    <!-- <div v-if="users.length != 0">
      <scoresTable :scores="scores" />
    </div> -->
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
