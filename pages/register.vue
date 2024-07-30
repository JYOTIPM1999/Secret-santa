<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 py-10">
    <div class="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
      <h1 class="text-3xl font-bold text-blue-800 mb-6">Register Users</h1>
      <form @submit.prevent="submitForm" class="space-y-6">
        <div
          v-for="(user, index) in users"
          :key="index"
          class="flex items-center space-x-4"
        >
          <input
            v-model="user.name"
            placeholder="User's Name"
            @blur="uniqueNames"
            class="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            @click="removeUser(index)"
            class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Remove
          </button>
        </div>
        <div class="flex space-x-4">
          <button
            type="button"
            @click="addUser"
            class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Add User
          </button>
          <button
            type="submit"
            class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Submit
          </button>
        </div>
        <p v-if="error" class="text-red-500 text-center mt-4">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUsersStore } from "../store/useUsers";

const router = useRouter();
const store = useUsersStore();

const users = ref([{ name: "" }]);

const error = ref("");

const addUser = () => {
  users.value.push({ name: "" });
};

const removeUser = (index) => {
  users.value.splice(index, 1);
};

const uniqueNames = () => {
  const names = users.value.map((u) => u.name);
  const uniqueNames = [...new Set(names)];

  if (names.length !== uniqueNames.length) {
    error.value = "Names must be unique";
    return false;
  }
  error.value = "";
  return true;
};

const submitForm = async () => {
  // Check for empty user names
  const empty = users.value.some((user) => user.name.trim() === "");

  if (empty) {
    error.value = "All fields must be filled";
    return;
  }
  // Check for unique names
  if (!uniqueNames()) {
    return;
  }
  try {
    await store.storeUsers(users.value);
    router.push("/draw");
  } catch (err) {
    console.error(err);
  }
};
</script>
