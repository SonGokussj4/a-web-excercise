<script setup lang="ts">
import { ref, type Ref } from "vue";
import usersTable from "../components/UsersTable.vue";

interface IUser {
  id: number;
  name: string;
  email: string;
}

const users: Ref<IUser[]> = ref([]);

const getUsers = () => {

  if (localStorage.getItem("users")) {
    const lastUpdated = new Date(JSON.parse(localStorage.getItem("users")).lastUpdated);
    const diff = new Date().getTime() - lastUpdated.getTime();
    const seconds = Math.round(diff / 1000);
    if (seconds < import.meta.env.VITE_MAX_USERS_CACHE_AGE_SECONDS) {
      console.log(`Using cached users (less than ${seconds} seconds old)`);
      users.value = JSON.parse(localStorage.getItem("users")).data;
      return;
    }
  }

  console.log("Fetching users from API");
  fetch(import.meta.env.VITE_USERS_URL, {
    headers: { 'Content-type': 'application/json' },
  }).then(res => res.json()).then((response) => {
    users.value = response;

    // Save to LocalStorage for now (no cookies (too much data), no database)
    localStorage.setItem("users", JSON.stringify({
      "lastUpdated": new Date().toString(),
      "data": response
    }));
    // localStorage.setItem("usersLastUpdated", new Date().toString());

  }).catch((error) => {
    console.log('Error fetching users: \n', error);
  });
}



</script>

<template>
  <div class="scoreboard">
    <h1>This is a scoreboard page</h1>

    <button class="btn btn-primary" @click="getUsers">
      Get Users
    </button>

    <div v-if="users.length != 0">
      <usersTable :users="users" />

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
