import axios from "axios";
import { defineStore } from "pinia";

export const useUsersStore = defineStore("users", () => {
  const users = ref([]);
  const assignments = ref({});

  const getUsers = async () => {
    try {
      const res = await axios.get("https://reqres.in/api/users");
      users.value = res.data.data.map(
        (user) => user.first_name + " " + user.last_name
      ); // Adjusted to use name as per your requirement
    } catch (err) {
      console.error(err);
    }
  };

  const storeUsers = async (newUsers) => {
    try {
      // Post each users to reqres.in
      const newUsersRes = await Promise.all(
        newUsers.map((user) =>
          axios.post("https://reqres.in/api/users", {
            name: user.name,
            email: "abc@gmail.com",
          })
        )
      );
      // Extract the names from the response and add to users.value
      const addUsers = newUsersRes.map((res) => res.data.name);
      users.value = [...users.value, ...addUsers];
    } catch (error) {
      console.error(error);
    }
  };
  const storeAssignments = async (assignmentsList) => {
    try {
      await axios.post("https://reqres.in/api/users", {
        assignment: assignmentsList,
      });

      assignments.value = assignmentsList;
      console.log(assignments);
    } catch (error) {
      console.error(error);
    }
  };
  return {
    users,
    assignments,
    getUsers,
    storeUsers,
    storeAssignments,
  };
});
