import axios from "axios";
import { defineStore } from "pinia";

export const useUsersStore = defineStore("users", () => {
  const users = ref([]);
  const assignments = ref({});

  const getUsers = async () => {
    try {
      const res = await axios.get("https://reqres.in/api/users");
      console.log(res.data.data, "reqresdata");
      users.value = res.data.data.map((user) => user.name);
    } catch (err) {
      console.error(err);
    }
  };

  const storeUsers = async (users) => {
    try {
      await Promise.all(
        users.map((user) =>
          axios.post("https://reqres.in/api/users", {
            name: user.name,
            // email: `${user.name}@webspiders.com`,
          })
        )
      );
      await getUsers();
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
