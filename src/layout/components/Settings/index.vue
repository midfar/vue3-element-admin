<template>
  <div class="drawer-container">
    <div>
      <h3 class="drawer-title">系统设置</h3>

      <!-- <div class="drawer-item">
        <span>Theme Color</span>
        <theme-picker style="float: right;height: 26px;margin: -3px 8px 0 0;" @change="themeChange" />
      </div> -->

      <div class="drawer-item">
        <span>开启 Tags-View</span>
        <el-switch v-model="tagsView" class="drawer-switch" />
      </div>

      <div class="drawer-item">
        <span>固定 Header</span>
        <el-switch v-model="fixedHeader" class="drawer-switch" />
      </div>

      <div class="drawer-item">
        <span>侧边栏 Logo</span>
        <el-switch v-model="sidebarLogo" class="drawer-switch" />
      </div>

      <div class="drawer-item">
        <span>侧边栏子目录气泡显示</span>
        <el-switch v-model="secondMenuPopup" class="drawer-switch" />
      </div>

    </div>
  </div>
</template>

<script>
// import ThemePicker from '@/components/ThemePicker';
import { defineComponent } from 'vue';
import store from '@/store';

export default defineComponent({
  components: {
    // ThemePicker
  },
  data() {
    return {};
  },
  computed: {
    fixedHeader: {
      get() {
        return store.settings().fixedHeader;
      },
      set(val) {
        store.settings().changeSetting({
          key: 'fixedHeader',
          value: val
        });
      }
    },
    tagsView: {
      get() {
        return store.settings().tagsView;
      },
      set(val) {
        store.settings().changeSetting({
          key: 'tagsView',
          value: val
        });
      }
    },
    sidebarLogo: {
      get() {
        return store.settings().sidebarLogo;
      },
      set(val) {
        store.settings().changeSetting({
          key: 'sidebarLogo',
          value: val
        });
      }
    },
    secondMenuPopup: {
      get() {
        return store.settings().secondMenuPopup;
      },
      set(val) {
        store.settings().changeSetting({
          key: 'secondMenuPopup',
          value: val
        });
      }
    }
  },
  methods: {
    themeChange(val) {
      store.settings().changeSetting({
        key: 'theme',
        value: val
      });
    }
  }
});
</script>

<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, .85);
    font-size: 14px;
    line-height: 22px;
  }

  .drawer-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: rgba(0, 0, 0, .65);
    font-size: 14px;
    padding: 12px 0;
  }

  .drawer-switch {
    float: right
  }
}
</style>
