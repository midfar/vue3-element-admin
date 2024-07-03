<template>
  <div class="app-container">
    <div>Store Demo</div>
    <div>1. 使用 mapStores 然后调用 this.xxxStore.yyy </div>
    <div>2. 使用 mapState 然后调用 this.xxx </div>
    <div>3. 调用函数 const xxxStore = store.xxx() 然后可以使用xxxStore变量</div>
    <div>&nbsp;</div>
    <div>========</div>
    <div>以下是变量显示值，具体用法参考源代码</div>
    <div>userStore.name={{ userStore.name }}</div>
    <div>appStore.device={{ device }}</div>
    <div><el-button @click="handleToggleDevice">toggleDevice</el-button></div>
  </div>
</template>

<script>
import { mapStores, mapState, mapActions } from 'pinia';
import { defineComponent } from 'vue';
import store from '@/store';

export default defineComponent({
  name: 'StoreDemo',
  computed: {
    ...mapStores(store.app, store.user),
    ...mapState(store.app, ['device'])
  },
  mounted() {
    console.log('StoreDemo mounted appStore.device=', this.appStore.device);
    console.log('StoreDemo mounted device=', this.device);
    console.log('StoreDemo mounted token=', this.userStore.token);
    const appStore = store.app();
    console.log('StoreDemo mounted useAppStore.device=', appStore.device);
    console.log('StoreDemo END');
  },
  methods: {
    ...mapActions(store.app, ['toggleDevice']),
    handleToggleDevice() {
      this.toggleDevice(+new Date());
    }
  }
});
</script>

<style lang="scss" scoped>
.app-container {
  div {
    padding: 5px 0;
  }
}
</style>
