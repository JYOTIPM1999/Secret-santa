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
  const userList = [...users.value];
  let assignments = {};
  let available = [...userList];

  available.sort(() => 0.5 - Math.random());
  userList.forEach((user) => {
    let assigned;
    do {
      assigned = available.shift();
    } while (assigned === user);
    assignments[user] = assigned;
  });

  let isValid = false;

  while (!isValid) {
    // Check for reciprocal assignments
    isValid = Object.keys(assignments).every(
      (user) => assignments[assignments[user]] === user
    );

    if (!isValid) {
      // If not valid, shuffle the available list again
      available = [...userList];
      available.sort(() => 0.5 - Math.random());

      assignments = {};
      userList.forEach((user) => {
        let assigned;
        do {
          assigned = available.shift();
        } while (assigned === user);
        assignments[user] = assigned;
      });
    }
  }

  // console.log("assignments", assignments);
  await store.storeAssignments(assignments);
  router.push("/results");
};
</script>

<style scoped>
.draw {
  text-align: center;
}
</style>
