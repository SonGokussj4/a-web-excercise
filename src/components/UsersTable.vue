<script setup lang="ts">
interface IUser {
    id: number;
    name: string;
    email: string;
}
defineProps<{
    users: Array<IUser>;
}>();
</script>

<template>
    <table class="table table-striped">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(user, index) in users" :key="user.id">
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
            </tr>
        </tbody>
    </table>
</template>