<script setup lang="ts">
import { ref } from "vue";
import { shuffle, shuffleObjects } from "../functions/utils.js";

interface IUser {
    id: number;
    name: string;
    email: string;
    picture: string;
    team: "left" | "right";
}
const props = defineProps<{
    users: Array<IUser>;
}>();

const selectedLeftUser = ref<IUser | null>(null);
const selectedRightUser = ref<IUser | null>(null);

const shuffledUsers = shuffleObjects(props.users);
const leftUsers = shuffledUsers.splice(0, shuffledUsers.length / 2);
const rightUsers = shuffledUsers;

// Add 'team' property to users
leftUsers.forEach((user) => { user.team = "left"; });
rightUsers.forEach((user) => { user.team = "right"; });

function hadleUserClicked(e: Event, user: IUser) {
    const target = e.target as Element;  // Typescript purpose, else there is an TS error

    if (user.team == "left") {
        // Get all .player-left and remove "active" class
        const leftPlayers = document.querySelectorAll("img.player-left")
        leftPlayers.forEach((player) => { player.classList.remove("active") })
        // TODO: Make it so that user can be "unselected"
        // TODO: Don't remove hand from selected player
        // target.classList.contains("active") ? selectedLeftUser.value = null : selectedLeftUser.value = user
        selectedLeftUser.value = user

    } else {
        // The same for right part
        const rightPlayers = document.querySelectorAll("img.player-right")
        rightPlayers.forEach((player) => { player.classList.remove("active") })
        // TODO: Make it so that user can be "unselected"
        // TODO: Don't remove hand from selected player
        // target.classList.contains("active") ? selectedRightUser.value = null : selectedRightUser.value = user
        selectedRightUser.value = user
    }

    // Because everything on left or right site is now inactive, activate the tearget
    target.classList.toggle("active");

    if (selectedLeftUser.value && selectedRightUser.value) {
        console.log("Both players selected");
        const playButton = document.querySelector(".play-button");
        playButton?.classList.add("active");
    } else {
        const playButton = document.querySelector(".play-button");
        playButton?.classList.remove("active");
    }
}

function hadleUserHovered(e: Event, user: IUser) {
    const target = e.target as Element;  // Typescript purpose, else there is an TS error

    console.log("[ DEBUG ] hovering over user:", user)
    const scores = JSON.parse(localStorage.getItem("scores"));
    if (!scores) {
        return
    }

    // Get IDs of users which are disabled (non-playlable) for this user
    // const disabledUsersIds = scores[user.id]?.disabledUsers.filter((player: IUser) => user.team == 'left' ? player.team == 'right': player.team == 'left')
    const disabledUsersIds = scores[user.id]?.disabledUsers
    console.log("[ DEBUG ] disabledUsersIds", disabledUsersIds)

    if (disabledUsersIds) {
        disabledUsersIds.forEach((id: number) => {
            const oposingTeam = user.team == 'left' ? 'right' : 'left'
            const disabledUser = document.querySelector(`img.player-${oposingTeam}[data-id="${id}"]`);
            console.log("[ DEBUG ] disabledUser", disabledUser)
            // disabledUser?.classList.add("disabled");
            disabledUser?.classList.toggle("disabled")
        })
    }


}

function hadlePlayClicked(e: Event) {

    if (!selectedLeftUser.value || !selectedRightUser.value) {
        alert("Please select both players");
        return
    }

    const leftPlayer = selectedLeftUser.value;
    const rightPlayer = selectedRightUser.value;

    // Assert that "score" exists in LC
    if (localStorage.getItem("scores") == null) {
        localStorage.setItem("scores", JSON.stringify({}));
    }
    const scores = JSON.parse(localStorage.getItem("scores"));
    const pair = [leftPlayer.id, rightPlayer.id].sort().join("-")

    // Ready the LocalStorage for player pairs not there yet
    if (!scores[pair]) {
        scores[pair] = {
            leftPlayer: {
                id: leftPlayer.id,
                name: leftPlayer.name,
                score: 0,
                win: false
            },
            rightPlayer: {
                id: rightPlayer.id,
                name: rightPlayer.name,
                score: 0,
                win: false
            },
            canPlayAgain: true
        }
    }

    const options = {
        rock: {
            icon: "👊",
            beats: "scissors",
            losesTo: "paper"
        },
        paper: {
            icon: "🖐",
            beats: "rock",
            losesTo: "scissors"
        },
        scissors: {
            icon: "✌",
            beats: "paper",
            losesTo: "rock"
        }
    }

    // Get keys from options -> ["rock", "paper", "scissors"], nadomize them and return the first
    const leftPlayerChoice = shuffle(Object.keys(options))[0];
    const rightPlayerChoice = shuffle(Object.keys(options))[0];
    console.log("[ DEBUG ] leftPlayerChoice", leftPlayerChoice)
    console.log("[ DEBUG ] rightPlayerChoice", rightPlayerChoice)

    // Update the DOM
    const leftPlayerHand = document.querySelector("#left-player-hand");
    const rightPlayerHand = document.querySelector("#right-player-hand");
    if (leftPlayerHand != undefined) { leftPlayerHand.innerHTML = options[leftPlayerChoice].icon; }
    if (rightPlayerHand != undefined) { rightPlayerHand.innerHTML = options[rightPlayerChoice].icon; }

    // Access the randomized object property "beats" and check if it's true ==> win
    const leftPlayerWins = options[leftPlayerChoice].beats == rightPlayerChoice
    const rightPlayerWins = options[rightPlayerChoice].beats == leftPlayerChoice
    console.log("[ DEBUG ] leftPlayerWins", leftPlayerWins)
    console.log("[ DEBUG ] rightPlayerWins", rightPlayerWins)

    if (!scores[leftPlayer.id]) {
        scores[leftPlayer.id] = {
            playerId: leftPlayer.id,
            name: leftPlayer.name,
            wins: 0,
            disabledUsers: []
        }
    }
    if (!scores[rightPlayer.id]) {
        scores[rightPlayer.id] = {
            playerId: rightPlayer.id,
            name: rightPlayer.name,
            wins: 0,
            disabledUsers: []
        }
    }

    if (scores[pair].canPlayAgain == false) {
        alert("This pair has already played 3 times. Please select another pair.")
        return
    }

    if (leftPlayerWins) {
        scores[pair].leftPlayer.score = scores[pair].leftPlayer.score + 1

        if (scores[pair].leftPlayer.score == 3) {
            scores[pair].leftPlayer.win = true
            scores[pair].canPlayAgain = false

            scores[leftPlayer.id].wins = scores[leftPlayer.id].wins + 1
            scores[rightPlayer.id].disabledUsers.push(leftPlayer.id)
            scores[leftPlayer.id].disabledUsers.push(rightPlayer.id)
            localStorage.setItem("scores", JSON.stringify(scores));
            alert(`Player ${leftPlayer.name} has won the game!`)
            return
        }
    } else if (rightPlayerWins) {
        scores[pair].rightPlayer.score = scores[pair].rightPlayer.score + 1
        if (scores[pair].rightPlayer.score == 3) {
            scores[pair].rightPlayer.win = true
            scores[pair].canPlayAgain = false

            scores[rightPlayer.id].wins = scores[rightPlayer.id].wins + 1
            scores[rightPlayer.id].disabledUsers.push(leftPlayer.id)
            scores[leftPlayer.id].disabledUsers.push(rightPlayer.id)
            localStorage.setItem("scores", JSON.stringify(scores));
            alert(`Player ${rightPlayer.name} has won the game!`)
            return
        }
    }
    localStorage.setItem("scores", JSON.stringify(scores));
}
</script>

<template>

    <!-- 3 divs with players on the left and right side, middle empty -->
    <div class="container">
        <div class="row">

            <div class="col-3" style="text-align: -webkit-center;">
                <h3 v-if="selectedLeftUser" class="left-selected-player">
                    Left Player:<br />
                    <spam style="font-size: 0.9em">{{ selectedLeftUser.name }}</spam><br />
                    <spam id="left-player-hand" style="font-size: 1.5em"></spam>
                </h3>

                <div v-for="(user, index) in leftUsers" v-on:click="e => hadleUserClicked(e, user)"
                    v-on:mouseenter="e => hadleUserHovered(e, user)" v-on:mouseleave="e => hadleUserHovered(e, user)"
                    class="player player-left">
                    <!-- {{ user.name }} ("👈") -->
                    <img :src="user.picture" :data-id="user.id" class="player player-left" alt="Avatar" />
                    <h6><span class="badge">{{user.name}}</span></h6>
                </div>
            </div>

            <div class="col-6" style="align-self: center; text-align: -webkit-center;">
                <div v-on:click="e => hadlePlayClicked(e)" ref="playButton" class="play-button">
                    <span style="font-size: 2em;">Play</span>
                </div>
            </div>

            <div class="col-3" style="text-align: -webkit-center;">
                <h3 v-if="selectedRightUser" class="right-selected-player">
                    Right Player:<br />
                    <spam style="font-size: 0.9em">{{ selectedRightUser.name }}</spam><br />
                    <spam id="right-player-hand" style="font-size: 1.5em"></spam>
                </h3>

                <div v-for="(user, index) in rightUsers" v-on:click="e => hadleUserClicked(e, user)"
                    v-on:mouseenter="e => hadleUserHovered(e, user)" v-on:mouseleave="e => hadleUserHovered(e, user)"
                    class="player player-right">
                    <!-- {{ user.name }} ("👉") -->
                    <img :src="user.picture" :data-id="user.id" class="player player-right" alt="Avatar" />
                    <h6><span class="badge">{{user.name}}</span></h6>
                </div>
            </div>

        </div>
    </div>

</template>

<style scoped>
.player {
    /*border: 1px solid rgb(216, 214, 214);*/
    border-radius: 50%;
    cursor: pointer;
    margin-top: 10px;
    width: 100px;
    height: 100px;
}

img.player {
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
}

div.player span {
    border: 1px solid #155802bd;
    bottom: 20px;
    z-index: 999;
}

div.player-left span {
    background: rgb(139, 2, 37);
}
div.player-right span {
    background: rgb(0, 60, 128);
}


img.player:hover {
    box-shadow: 10 10 10px 0 rgba(34, 29, 29, 0.925);
}

img.player.active {
    /*background-color: green !important;*/
    box-shadow: 0 0 6px 8px rgba(11, 207, 21, 0.877);
}

img.player.disabled {
    box-shadow: 0 0 8px 8px rgba(151, 3, 3, 0.9);
    filter: sepia(20%);
    -webkit-filter: sepia(20%);

}

.left-selected-player {
    position: absolute;
    top: -70px;
    width: 130px;
    font-size: 1.2em;
}

.right-selected-player {
    position: absolute;
    top: -70px;
    width: 130px;
    font-size: 1.2em;
}

.play-button {
    padding: 5px;
    margin: 5px;
    width: 120px;
    height: 60px;
    background-color: rgb(208, 209, 209);
    border: 1px solid rgb(156, 156, 156);
    border-radius: 12px;
    cursor: pointer;
    color: rgb(208, 209, 209);
}

.play-button:hover {
    /*background-color: rgb(216, 216, 216);*/
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
    cursor: not-allowed;
}

.play-button.active {
    background-color: green;
    color: white;
    cursor: pointer;
}

.play-button.active:hover {
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
    background-color: rgb(2, 180, 2);
}
</style>