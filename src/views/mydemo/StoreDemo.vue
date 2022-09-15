<template>
  <div class="app-container">
    <div>Store Demo</div>
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
