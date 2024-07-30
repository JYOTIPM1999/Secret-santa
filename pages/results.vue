<template>
  <div class="results">
    <h1>Secret Santa Results</h1>
    <div v-for="(assignment, index) in assignment" :key="index">
      <p>{{ index }} is assigned to {{ assignment }}</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useUsersStore } from "../store/useUsers";

const assignment = ref({});
const store = useUsersStore();

const fetchAssignment = async () => {
  assignment.value = store.assignments;
};
onMounted(fetchAssignment);
console.log(assignment);
</script>

<style scoped>
.results {
  text-align: center;
}
</style>
