<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapState } from 'pinia';
import adminDashboard from './admin';
import editorDashboard from './editor';
import store from '@/store';

export default defineComponent({
  name: 'Dashboard',
  components: { adminDashboard, editorDashboard },
  data() {
    return {
      currentRole: 'adminDashboard'
    };
  },
  computed: {
    ...mapState(store.user, ['roles'])
  },
  created() {
    console.log('dashboard created');
    if (!this.roles.includes('admin')) {
      this.currentRole = 'editorDashboard';
    }
  }
});
</script>
