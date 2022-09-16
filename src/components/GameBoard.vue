<script setup lang="ts">
import { ref } from "vue";
import { shuffle, shuffleObjects } from "../functions/utils.js";

interface IUser {
    id: number;
    name: string;
    email: string;
    picture: string;
}
const props = defineProps<{
    users: Array<IUser>;
}>();

// const users = ref(props.users);

const shuffledUsers = shuffleObjects(props.users);
const leftUsers = shuffledUsers.splice(0, shuffledUsers.length / 2);
// Add {team: left} property to leftUsers
leftUsers.forEach((user) => { user.team = "left"; });
const rightUsers = shuffledUsers;
rightUsers.forEach((user) => { user.team = "right"; });

function hadleUserClicked(user: IUser) {
    console.log(user);
}

</script>

<template>

    <!-- 3 divs with players on the left and right side, middle empty -->
    <div class="container">
        <div class="row">
            <div class="col-3" style="border: 1px solid gray; text-align: -webkit-center;">
                <div v-for="(user, index) in leftUsers" v-on:click="hadleUserClicked(user)"
                    style="padding: 5px; margin: 5px; width: 80px; height: 80px; background-color: red;">
                    {{ user.name }} ({{ user.team == "left" ? "👈" : "👉" }})
                </div>
            </div>
            <div class="col-6" style="border: 1px solid gray; align-self: center; text-align: -webkit-center;">
                <div style="padding: 5px; margin: 5px; width: 80px; height: 80px; background-color: green;"></div>
            </div>
            <div class="col-3" style="border: 1px solid gray; text-align: -webkit-center;">
                <div v-for="(user, index) in rightUsers" class="text-white"
                    style="padding: 5px; margin: 5px; width: 80px; height: 80px; background-color: blue;">
                    {{ user.name }} ({{ user.team == "left" ? "👈" : "👉" }})
                </div>
            </div>
        </div>
    </div>

</template>
