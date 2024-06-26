<template>
  <div>
    <div style="margin-bottom:15px;">
      Your roles: {{ roles }}
    </div>
    Switch roles:
    <el-radio-group v-model="switchRoles">
      <el-radio-button label="editor" value="editor" />
      <el-radio-button label="admin" value="admin" />
    </el-radio-group>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import store from '@/store';

export default defineComponent({
  computed: {
    roles() {
      return store.user().roles;
    },
    switchRoles: {
      get() {
        return this.roles[0];
      },
      set(val) {
        store.user().changeRoles(val).then(() => {
          this.$emit('change');
        });
      }
    }
  }
});
</script>
