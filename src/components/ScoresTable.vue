<script setup lang="ts">
import { ref } from "vue";

interface IScore {
    name: string;
    playerId: number
    wins: number;
    avatar: string;
}
const props = defineProps<{
    scores: Array<IScore>;
}>();

const allScores = ref(props.scores);

// Destructure PROXY object into a real boy
let userScores = JSON.parse(JSON.stringify(allScores.value));

// Dismiss 'pair' objects ([2-3]: {...}) from the not-array object (they are missing playerId prop)
userScores = Object.values(userScores).filter((x: IScore) => x.playerId !== undefined);

//  Sort by wins
userScores.sort((a: IScore, b: IScore) => b.wins - a.wins);

// TODO: Propagate this function to the parent component. It's not dismissing the table.
const handleResetScores = () => {
    localStorage.removeItem("scores");
    userScores.value = [];
}

const users = JSON.parse(localStorage.getItem("users"));
userScores.forEach((score: IScore) => {
    const user = users.data.find((x: any) => x.id === score.playerId);
    score.avatar = user.picture;
});

</script>

<template>

    <h5 style="text-align: center; padding-top: 10px;">A list of the best players</h5>

    <table class="table table-striped">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Avatar</th>
                <th scope="col">Name</th>
                <th scope="col">Wins</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(score, index) in userScores" :key="index">
                <th scope="row">{{ index + 1 }}</th>
                <td><img class="avatar" :src="score.avatar" alt="Avatar" /></td>
                <td>{{ score.name }}</td>
                <td>{{ score.wins }}</td>
            </tr>
        </tbody>
    </table>

    <button style="float: right" class="btn btn-danger" @click="handleResetScores">Reset Scores</button>

</template>

<style>
.avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
}
</style>