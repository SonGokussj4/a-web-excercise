<script setup lang="ts">
import { ref } from "vue";

interface IScore {
    name: string;
    wins: number;
}
const props = defineProps<{
    scores: Array<IScore>;
}>();

const userScores = ref(props.scores);

// TODO: Propagate this function to the parent component

const handleResetScores = () => {
    localStorage.removeItem("scores");
    userScores.value = [];
}

// propagate userScores to the parent component


</script>

<template>

    <h5 style="text-align: center;">A list of the best players</h5>

    <table class="table table-striped">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Wins</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(score, index) in userScores" :key="index">
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ score.name }}</td>
                <td>{{ score.wins }}</td>
            </tr>
        </tbody>
    </table>

    <button style="float: right" class="btn btn-danger" @click="handleResetScores">Reset Scores</button>

</template>