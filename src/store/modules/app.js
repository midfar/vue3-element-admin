import { defineStore } from 'pinia';
import Cookies from 'js-cookie';

const getDefaultState = () => ({
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  device: 'desktop',
  size: Cookies.get('size') || 'medium'
});

const getters = {
};

const actions = {
  toggleSidebar() {
    this.sidebar.opened = !this.sidebar.opened;
    this.sidebar.withoutAnimation = false;
    if (this.sidebar.opened) {
      Cookies.set('sidebarStatus', 1);
    } else {
      Cookies.set('sidebarStatus', 0);
    }
  },
  closeSidebar({ withoutAnimation }) {
    Cookies.set('sidebarStatus', 0);
    this.sidebar.opened = false;
    this.sidebar.withoutAnimation = withoutAnimation;
  },
  toggleDevice(device) {
    this.device = device;
  },
  setSize(size) {
    this.size = size;
    Cookies.set('size', size);
  }
};

export default defineStore({
  id: 'app',
  state: getDefaultState,
  getters,
  actions
});
