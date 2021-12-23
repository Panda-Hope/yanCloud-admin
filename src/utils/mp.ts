/**
 * 异步检查微信 JS Bridge
 * @param callback ready 回调
 */
export const ready = (callback: Function): void => {
  if (typeof window['WeixinJSBridge'] === 'undefined') {
    const task = setTimeout(() => callback(true), 6000);
    const handle = () => {
      clearTimeout(task);
      callback();
    };
    if (typeof document !== 'undefined') {
      if (document.addEventListener) {
        document.addEventListener('WeixinJSBridgeReady', handle, false);
      } else if (document['attachEvent']) {
        document['attachEvent']('WeixinJSBridgeReady', handle);
        document['attachEvent']('onWeixinJSBridgeReady', handle);
      }
    }
  } else {
    callback();
  }
};

export const checkMiniProgramEnv = (
  callback: (miniprogram: boolean) => void,
): void => {
  ready(() => {
    callback(window['__wxjs_environment'] === 'miniprogram');
  });
};

export const toRedirectMiniProgram = (url: string) => {
  wx['miniProgram']?.redirectTo({ url });
};

export const navigateToMiniProgram = (url: string) => {
  wx['miniProgram']?.navigateTo({ url });
};
