<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">

        <el-col :span="6" :xs="24">
          <user-card :user="user" />
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="Activity" name="activity">
                <activity />
              </el-tab-pane>
              <el-tab-pane label="Timeline" name="timeline">
                <timeline />
              </el-tab-pane>
              <el-tab-pane label="Account" name="account">
                <account :user="user" />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia';
import UserCard from './components/UserCard';
import Activity from './components/Activity';
import Timeline from './components/Timeline';
import Account from './components/Account';
import { defineComponent } from 'vue';
import store from '@/store';
// const userStore = store.user();

export default defineComponent({
  name: 'Profile',
  components: { UserCard, Activity, Timeline, Account },
  data() {
    return {
      user: {},
      activeTab: 'activity'
    };
  },
  computed: {
    ...mapState(store.user, [
      'name',
      'avatar',
      'roles'
    ])
    // userStore,
  },
  watch: {
    name(newVal) {
      this.user.name = newVal;
    }
  },
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      this.user = {
        name: this.name,
        role: this.roles.join(' | '),
        email: 'admin@test.com',
        avatar: this.avatar
      };
    }
  }
});
</script>
