<template>
  <div
    class="draw min-h-screen flex flex-col items-center justify-center bg-gray-100"
  >
    <h1 class="text-5xl font-extrabold text-blue-700 mb-6">
      Draw Secret Santa🎅
    </h1>
    <div class="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
      <h2
        v-for="user in users"
        :key="user"
        class="text-xl font-medium text-gray-800 mb-2"
      >
        <span class="font-bold text-blue-900">Name - </span>
        <span class="font-bold text-blue-500">{{ user }} </span>
      </h2>
      <button
        @click="drawNames"
        class="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg text-lg hover:bg-blue-700 transition duration-300"
      >
        Draw▶️
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useUsersStore } from "../store/useUsers";

const router = useRouter();
const store = useUsersStore();

const users = ref([]);
const fetchUsers = async () => {
  users.value = store.users;
};
onMounted(fetchUsers);
console.log(users);

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

  await store.storeAssignments(assignments);
  console.log(assignments);
  router.push("/results");
};
</script>
