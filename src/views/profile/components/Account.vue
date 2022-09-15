<template>
  <el-form>
    <el-form-item label="Name">
      <el-input v-model.trim="userName" />
    </el-form-item>
    <el-form-item label="Email">
      <el-input v-model.trim="userEmail" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">Update</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { defineComponent } from 'vue';
import store from '@/store';

export default defineComponent({
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          email: ''
        };
      }
    }
  },
  data() {
    return {
      userName: this.user.name,
      userEmail: this.user.email
    };
  },
  methods: {
    submit() {
      store.user().name = this.userName;
      // store.user().email = this.userEmail;
      ElMessage({
        message: 'User information has been updated successfully',
        type: 'success',
        duration: 5 * 1000
      });
    }
  }
});
</script>
