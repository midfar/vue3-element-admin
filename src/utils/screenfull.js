const methodMap = [
  [
    'requestFullscreen',
    'exitFullscreen',
    'fullscreenElement',
    'fullscreenEnabled',
    'fullscreenchange',
    'fullscreenerror'
  ],
  // New WebKit
  [
    'webkitRequestFullscreen',
    'webkitExitFullscreen',
    'webkitFullscreenElement',
    'webkitFullscreenEnabled',
    'webkitfullscreenchange',
    'webkitfullscreenerror'

  ],
  // Old WebKit
  [
    'webkitRequestFullScreen',
    'webkitCancelFullScreen',
    'webkitCurrentFullScreenElement',
    'webkitCancelFullScreen',
    'webkitfullscreenchange',
    'webkitfullscreenerror'

  ],
  [
    'mozRequestFullScreen',
    'mozCancelFullScreen',
    'mozFullScreenElement',
    'mozFullScreenEnabled',
    'mozfullscreenchange',
    'mozfullscreenerror'
  ],
  [
    'msRequestFullscreen',
    'msExitFullscreen',
    'msFullscreenElement',
    'msFullscreenEnabled',
    'MSFullscreenChange',
    'MSFullscreenError'
  ]
];

const nativeAPI = (() => {
  if (typeof document === 'undefined') {
    return false;
  }

  const unprefixedMethods = methodMap[0];
  const returnValue = {};

  for (const methodList of methodMap) {
    const exitFullscreenMethod = methodList?.[1];
    if (exitFullscreenMethod in document) {
      for (const [index, method] of methodList.entries()) {
        returnValue[unprefixedMethods[index]] = method;
      }

      return returnValue;
    }
  }

  return false;
})();

const eventNameMap = {
  change: nativeAPI.fullscreenchange,
  error: nativeAPI.fullscreenerror
};

let screenfull = {
  // eslint-disable-next-line default-param-last
  request(element = document.documentElement, options) {
    return new Promise((resolve, reject) => {
      const onFullScreenEntered = () => {
        screenfull.off('change', onFullScreenEntered);
        resolve();
      };

      screenfull.on('change', onFullScreenEntered);

      const returnPromise = element[nativeAPI.requestFullscreen](options);

      if (returnPromise instanceof Promise) {
        returnPromise.then(onFullScreenEntered).catch(reject);
      }
    });
  },
  exit() {
    return new Promise((resolve, reject) => {
      if (!screenfull.isFullscreen) {
        resolve();
        return;
      }

      const onFullScreenExit = () => {
        screenfull.off('change', onFullScreenExit);
        resolve();
      };

      screenfull.on('change', onFullScreenExit);

      const returnPromise = document[nativeAPI.exitFullscreen]();

      if (returnPromise instanceof Promise) {
        returnPromise.then(onFullScreenExit).catch(reject);
      }
    });
  },
  toggle(element, options) {
    return screenfull.isFullscreen ? screenfull.exit() : screenfull.request(element, options);
  },
  onchange(callback) {
    screenfull.on('change', callback);
  },
  onerror(callback) {
    screenfull.on('error', callback);
  },
  on(event, callback) {
    const eventName = eventNameMap[event];
    if (eventName) {
      document.addEventListener(eventName, callback, false);
    }
  },
  off(event, callback) {
    const eventName = eventNameMap[event];
    if (eventName) {
      document.removeEventListener(eventName, callback, false);
    }
  },
  raw: nativeAPI
};

Object.defineProperties(screenfull, {
  isFullscreen: {
    get: () => Boolean(document[nativeAPI.fullscreenElement])
  },
  element: {
    enumerable: true,
    get: () => document[nativeAPI.fullscreenElement] ?? undefined
  },
  isEnabled: {
    enumerable: true,
    // Coerce to boolean in case of old WebKit.
    get: () => Boolean(document[nativeAPI.fullscreenEnabled])
  }
});

const handleKeydown = (event) => {
  if (event.keyCode === 122) { // F11的keyCode为122
    event.preventDefault();
    screenfull.toggle();
  }
};

// 避免chrome浏览器，F11进入全屏后，无法用js退出全屏
export const bindF11 = () => {
  window.addEventListener('keydown', handleKeydown, true);
};

export const unbindF11 = () => {
  window.removeEventListener('keydown', handleKeydown, true);
};

if (!nativeAPI) {
  screenfull = { isEnabled: false };
}

export default screenfull;
