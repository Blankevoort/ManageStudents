import { defineStore } from "pinia";

export const removeClass = defineStore("remove", {
  state: () => ({
    remove: [],
  }),

  getters: {
    showCurrentRemove(state) {
      return state.remove;
    },
  },

  actions: {
    setCurrentRemove(data) {
      this.remove = data;
    },
  },
});
