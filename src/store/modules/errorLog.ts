import { defineStore } from 'pinia';

interface IErrorLogState {
  logs: unknown[];
}

export default defineStore({
  id: 'errorLog',
  state: ():IErrorLogState => ({
    logs: []
  }),
  getters: {},
  actions: {
    addErrorLog(log) {
      this.logs.push(log);
    },
    clearErrorLog() {
      this.logs.splice(0);
    }
  }
});
