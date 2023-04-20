import { defineStore } from "pinia";

export const currentStudentID = defineStore("current", {
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
      this.router.push("/student");
    },
  },
});
