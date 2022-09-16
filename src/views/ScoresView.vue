<script setup lang="ts">
import { ref, type Ref } from "vue";
import usersTable from "../components/UsersTable.vue";
import { getUsers } from "../functions/utils.js";

// const users = ref([]);

</script>

<template>
  <div class="scoreboard">
    <h1>This is a scoreboard page</h1>

    <!-- <button class="btn btn-primary" @click="getUsers">
      Get Users
    </button> -->

    <!-- <div v-if="users.length != 0">
      <usersTable :users="users" />
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
