<script setup>
import {
  Check,
  Delete,
  Edit,
  Loading,
  Message,
  Search,
  Star
} from '@element-plus/icons-vue';
import store from '@/store';
console.log('store=', store);

console.log('HomeView VITE_ENV=', import.meta.env.VITE_ENV);
console.log('HomeView VITE_BASE_API=', import.meta.env.VITE_BASE_API);

const useAppStore = store.app();

console.log('appStore.device=', useAppStore.device);
</script>

<template>
  <div class="app-container">
    <div class="mytitle">
      <span class="text">获取环境变量</span>
    </div>
    <div>element按钮示例</div>
    <div class="button-example">
      <el-row class="mb-4">
        <el-button>Default</el-button>
        <el-button type="primary">Primary</el-button>
        <el-button type="success">Success</el-button>
        <el-button type="info">Info</el-button>
        <el-button type="warning">Warning</el-button>
        <el-button type="danger">Danger</el-button>
      </el-row>

      <el-row class="mb-4">
        <el-button plain>Plain</el-button>
        <el-button type="primary" plain>Primary</el-button>
        <el-button type="success" plain>Success</el-button>
        <el-button type="info" plain>Info</el-button>
        <el-button type="warning" plain>Warning</el-button>
        <el-button type="danger" plain>Danger</el-button>
      </el-row>

      <el-row class="mb-4">
        <el-button round>Round</el-button>
        <el-button type="primary" round>Primary</el-button>
        <el-button type="success" round>Success</el-button>
        <el-button type="info" round>Info</el-button>
        <el-button type="warning" round>Warning</el-button>
        <el-button type="danger" round>Danger</el-button>
      </el-row>

      <el-row>
        <el-button :icon="Search" circle />
        <el-button type="primary" :icon="Edit" circle />
        <el-button type="success" :icon="Check" circle />
        <el-button type="info" :icon="Message" circle />
        <el-button type="warning" :icon="Star" circle />
        <el-button type="danger" :icon="Delete" circle />
      </el-row>
    </div>
    <div>&nbsp;</div>
    <div>element图标示例</div>
    <div style="font-size: 20px;">
      <!-- 由于SVG图标默认不携带任何属性 -->
      <!-- 你需要直接提供它们 -->
      <Edit style="width: 1em; height: 1em; margin-right: 8px" />
      <Star style="width: 1em; height: 1em; margin-right: 8px" />
      <Delete style="width: 1em; height: 1em; margin-right: 8px" />
      <Search style="width: 1em; height: 1em; margin-right: 8px" />
    </div>
    <div class="myicon">
      <el-icon class="is-loading">
        <Loading />
      </el-icon>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-container {
  div {
    padding: 5px 0;
  }
  .mytitle {
    font-size: 20px;

    .text {
      font-size: 30px;
    }
  }
}
</style>
