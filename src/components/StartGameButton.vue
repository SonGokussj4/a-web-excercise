<script setup lang="ts">
import { ref, type Ref } from "vue";
import { getUsers } from "../functions/utils.js";
import gameBoard from "./GameBoard.vue";

interface IUser {
  id: number;
  name: string;
  email: string;
  picture: string;
}

const users: Ref<IUser[]> = ref([]);

async function startGame() {
  console.log("[ INFO ] Getting users and starting game");
  users.value = await getUsers();
}
</script>

<template>
  <!-- align div to the center -->
  <div class="d-flex justify-content-center">
    <button class="btn btn-success" @click="startGame">
      Start Game
    </button>
  </div>

  <div v-if="users.length != 0">
    <gameBoard :users="users" />
  </div>


</template>
