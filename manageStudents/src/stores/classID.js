import { defineStore } from "pinia";

export const currentClassID = defineStore("current", {
  state: () => ({
    current: [],
  }),

  getters: {
    showCurrent(state) {
      return state.current;
    },
  },

  actions: {
    setCurrent(data) {
      this.current = data;
      this.router.push("/class");
    },
  },
});
