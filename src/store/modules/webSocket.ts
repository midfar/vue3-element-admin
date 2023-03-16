import { defineStore } from 'pinia';

interface socketState {
  socketId: string;
}

export default defineStore('useWebSocket', {
  state: (): socketState => ({
    socketId: '' // 会话id
  }),
  actions: {
    setSocketID(id: string) {
      this.socketId = id;
    },
    getSocketID() {
      return this.socketId;
    }
  }
});
