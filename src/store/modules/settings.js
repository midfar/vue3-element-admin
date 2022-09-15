import { defineStore } from 'pinia';
import defaultSettings from '@/settings';

const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings;

const getDefaultState = () => ({
  theme: '#1890ff',
  showSettings: showSettings,
  tagsView: tagsView,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo
});

const getters = {};

const actions = {
  changeSetting({ key, value }) {
    // eslint-disable-next-line no-prototype-builtins
    if (this.hasOwnProperty(key)) {
      this[key] = value;
    }
  }
};

export default defineStore({
  id: 'settings',
  state: getDefaultState,
  getters,
  actions
});
