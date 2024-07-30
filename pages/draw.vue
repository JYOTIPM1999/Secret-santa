<template>
  <div class="draw">
    <h1>Draw Secret Santa🎅</h1>
    <div>
      <h2 v-for="user in users" :key="user">Name - {{ user }}</h2>
    </div>
    <button @click="drawNames">Draw▶️</button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useUsersStore } from "../store/useUsers";

const router = useRouter();
const store = useUsersStore();

const users = ref([]);
const fetchUsers = async () => {
  await store.getUsers();
  users.value = store.users;
};
onMounted(fetchUsers);

const drawNames = async () => {
  const shuffledUsers = [...users.value].sort(() => 0.5 - Math.random());
  console.log(shuffledUsers);

  const assignments = {};

  for (let i = 0; i < users.value.length; i++) {
    assignments[users.value[i]] = shuffledUsers[(i + 1) % shuffledUsers.length];
  }
  console.log(assignments);
  await store.storeAssignments(assignments);
  // router.push("/results");
};
</script>

<style scoped>
.draw {
  text-align: center;
}
</style>
