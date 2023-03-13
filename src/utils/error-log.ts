import store from '@/store';
import { isString, isArray } from '@/utils/validate';
import settings from '@/settings';
import { nextTick } from 'vue';
import type { App } from 'vue';

// you can set in settings.js
// errorLog:'production' | ['production', 'development']
const { errorLog: needErrorLog } = settings;

function checkNeed() {
  const env = process.env.NODE_ENV || '';
  if (isString(needErrorLog)) {
    return env === needErrorLog;
  }
  if (isArray(needErrorLog)) {
    return needErrorLog.includes(env);
  }
  return false;
}

export function checkEnableLogs(app: App) {
  if (checkNeed()) {
    app.config.errorHandler = function(err, instance, info) {
      // Don't ask me why I use Vue.nextTick, it just a hack.
      // detail see https://forum.vuejs.org/t/dispatch-in-vue-config-errorhandler-has-some-problem/23500
      nextTick(() => {
        store.errorLog().addErrorLog({
          err,
          instance,
          info,
          url: window.location.href
        });
        console.error(err, info);
      });
    };
  }
}
