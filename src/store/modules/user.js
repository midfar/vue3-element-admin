import { defineStore } from 'pinia';
import { login, logout, getInfo } from '@/api/user';
import { getToken, setToken, removeToken } from '@/utils/auth';
import router, { resetRouter } from '@/router';
import tagsViewStore from './tagsView';
import permissionStore from './permission';

const getDefaultState = () => ({
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: []
});

const getters = {};

const actions = {
  // user login
  login(userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response;
        this.token = data.token;
        setToken(data.token);
        resolve();
      }).catch(error => {
        reject(error);
      });
    });
  },

  // get user info
  getInfo() {
    return new Promise((resolve, reject) => {
      getInfo(this.token).then(response => {
        const { data } = response;

        if (!data) {
          reject('Verification failed, please Login again.');
        }

        const { roles, name, avatar, introduction } = data;

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!');
        }

        this.roles = roles;
        this.name = name;
        this.avatar = avatar;
        this.introduction = introduction;
        resolve(data);
      }).catch(error => {
        reject(error);
      });
    });
  },

  // user logout
  logout() {
    return new Promise((resolve, reject) => {
      logout(this.token).then(() => {
        this.token = '';
        this.roles = [];
        removeToken();
        resetRouter();

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        tagsViewStore().delAllViews();

        resolve();
      }).catch(error => {
        reject(error);
      });
    });
  },

  // remove token
  resetToken() {
    this.token = '';
    this.roles = [];
    removeToken();
  },

  // dynamically modify permissions
  async changeRoles(role) {
    const token = role + '-token';

    this.token = token;
    setToken(token);

    const { roles } = await this.getInfo({ token });

    resetRouter();

    // generate accessible routes map based on roles
    const accessRoutes = await permissionStore().generateRoutes(roles);
    // dynamically add accessible routes
    // router.addRoutes(accessRoutes);
    accessRoutes.forEach(item => {
      router.addRoute(item);
    });

    // reset visited views and cached views
    tagsViewStore().delAllViews();
  }
};

export default defineStore({
  id: 'user',
  state: getDefaultState,
  getters,
  actions
});
