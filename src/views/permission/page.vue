<template>
  <div class="app-container">
    <switch-roles @change="handleRolesChange" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import SwitchRoles from './components/SwitchRoles';

export default defineComponent({
  name: 'PagePermission',
  components: { SwitchRoles },
  methods: {
    handleRolesChange() {
      this.$router.push({ path: '/permission/index?' + +new Date() });
    }
  }
});
</script>
