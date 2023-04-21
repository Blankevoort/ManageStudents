import { defineStore } from "pinia";

export const currentStudentID = defineStore("currentStudent", {
  state: () => ({
    currentStudent: [],
  }),

  getters: {
    showCurrent(state) {
      return state.currentStudent;
    },
  },

  actions: {
    setCurrent(data) {
      this.currentStudent = data;
      this.router.push("/student");
    },
  },
});
