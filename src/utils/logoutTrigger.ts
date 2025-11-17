let logoutCallback: (() => void) | null = null;

export const setLogoutCallback = (callback: (() => void) | null) => {
  logoutCallback = callback;
};

export const triggerLogout = () => {
  if (logoutCallback) {
    logoutCallback();
  }
};
