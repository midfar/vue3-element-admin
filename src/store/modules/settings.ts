import { defineStore } from 'pinia';
import defaultSettings from '@/settings';

const { showSettings, tagsView, fixedHeader, sidebarLogo, secondMenuPopup } = defaultSettings;

export default defineStore({
  id: 'settings',
  state: () => ({
    theme: '#1890ff',
    showSettings: showSettings,
    tagsView: tagsView,
    fixedHeader: fixedHeader,
    sidebarLogo: sidebarLogo,
    secondMenuPopup: secondMenuPopup
  }),
  getters: {},
  actions: {
    changeSetting({ key, value }) {
      // eslint-disable-next-line no-prototype-builtins
      if (this.hasOwnProperty(key)) {
        this[key] = value;
      }
    }
  }
});
