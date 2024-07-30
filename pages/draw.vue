<template>
  <div>{{ user }}</div>
</template>

<script setup>
import { useUsersStore } from "../store/useUsers";
const store = useUsersStore();
const user = store.users;
</script>
