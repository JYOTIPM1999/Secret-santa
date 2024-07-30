<template>
  <div class="registration">
    <h1>Register Users</h1>
    <form @submit.prevent="submitForm">
      <div v-for="(user, index) in users" :key="index">
        <input
          v-model="user.name"
          placeholder="Users Name"
          @blur="uniqueNames"
        />
        <button type="button" @click="removeUser(index)">Remove</button>
      </div>
      <button type="button" @click="addUser">Add User</button>
      <button type="submit">Submit</button>
      <p v-if="error">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUsersStore } from "../store/useUsers";

const router = useRouter();
const store = useUsersStore();
console.log(store);

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
</script>

<style scoped>
.registration {
  text-align: center;
  margin-top: 50px;
}
</style>
