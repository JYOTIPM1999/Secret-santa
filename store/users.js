import { defineStore } from "pinia";

export const useUsersStore = defineStore("users", {
  state: () => ({
    usesr: [],
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
