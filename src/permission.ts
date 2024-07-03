import router from './router';
import userStore from './store/modules/user';
import permissionStore from './store/modules/permission';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
import { getToken } from '@/utils/auth'; // get token from cookie
import getPageTitle from '@/utils/get-page-title';

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ['/login', '/auth-redirect']; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // console.log('router.beforeEach', to.path, from.path);
  // start progress bar
  NProgress.start();

  // set page title
  document.title = getPageTitle(to.meta.title);

  // determine whether the user has logged in
  const hasToken = getToken();

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      NProgress.done(); // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
      next({ path: '/' });
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = userStore().roles && userStore().roles.length > 0;
      // console.log('hasRoles=', hasRoles);
      if (hasRoles) {
        next();
      } else {
        try {
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const infoRes = await userStore().getInfo() as any;
          let roles = [];
          if (infoRes.roles) {
            roles = infoRes.roles;
          }

          // generate accessible routes map based on roles
          const accessRoutes = await permissionStore().generateRoutes(roles);
          // console.log('accessRoutes=', accessRoutes)

          // dynamically add accessible routes
          // router.addRoutes(accessRoutes);
          accessRoutes.forEach(item => {
            router.addRoute(item);
          });
          // console.log('next=', accessRoutes);

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          // remove token and go to login page to re-login
          await userStore().resetToken();
          ElMessage.error(error.message || 'Has Error');
          NProgress.done();
          next(`/login?redirect=${to.path}`);
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next();
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      NProgress.done();
      next(`/login?redirect=${to.path}`);
    }
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
