import axios from "axios";
import { defineStore } from "pinia";

export const useUsersStore = defineStore("users", () => {
  const users = ref([]);
  const assignments = ref({});

  const getUsers = async () => {
    try {
      const res = await axios.get("https://reqres.in/api/users");
      users.value = res.data.data.map((user) => user.name);
    } catch (err) {
      console.error(err);
    }
  };

  const storeUsers = async (users) => {
    console.log(users[0], "users");
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

      assignments = assignmentsList;
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
