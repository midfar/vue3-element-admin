import { defineStore } from 'pinia';
import { asyncRoutes, constantRoutes } from '@/router';

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role));
  } else {
    return true;
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = [];

  routes.forEach(route => {
    const tmp = { ...route };
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }
      res.push(tmp);
    }
  });

  return res;
}

const getDefaultState = () => ({
  routes: [],
  addRoutes: []
});

const getters = {};

const actions = {
  setRoutes(routes) {
    this.addRoutes = routes;
    this.routes = constantRoutes.concat(routes);
  },
  generateRoutes(roles) {
    let accessedRoutes;
    if (roles.includes('admin')) {
      accessedRoutes = asyncRoutes || [];
    } else {
      accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
    }
    this.setRoutes(accessedRoutes);
    return accessedRoutes;
  }
};

export default defineStore({
  id: 'permission',
  state: getDefaultState,
  getters,
  actions
});
