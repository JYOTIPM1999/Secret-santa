import { defineStore } from "pinia";

export const useUsersStore = defineStore("users", {
  state: () => ({
    users: [],
    assignments: {},
  }),
  actions: {
    async getUsers() {
      try {
      } catch (err) {
        console.error(err);
      }
    },
  },
});
