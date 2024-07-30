<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-10"
  >
    <div class="bg-white shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-md">
      <h1 class="text-3xl sm:text-4xl font-bold text-blue-800 mb-8">
        Secret Santa Results 🎁
      </h1>
      <div
        v-for="(assignment, index) in assignment"
        :key="index"
        class="mb-4 p-4 border-b border-gray-200"
      >
        <p class="text-base sm:text-lg font-medium text-gray-700">
          <span class="font-bold text-blue-600">{{ index }}</span> is assigned
          to
          <span class="font-bold text-blue-600">{{ assignment }}</span>
        </p>
      </div>
    </div>
    <nuxt-link
      to="/register"
      class="bg-blue-500 text-white px-4 py-2 m-2 rounded-lg text-lg sm:text-xl font-semibold shadow-md hover:bg-blue-600 transition duration-200 ease-in-out"
    >
      Go to Registration
    </nuxt-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useUsersStore } from "../store/useUsers";

const assignment = ref({});
const store = useUsersStore();

const fetchAssignment = async () => {
  assignment.value = store.assignments;
};
onMounted(fetchAssignment);
</script>
