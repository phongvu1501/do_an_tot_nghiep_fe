let openLoginPopupCallback: (() => void) | null = null;

export const setOpenLoginPopupCallback = (callback: (() => void) | null) => {
  openLoginPopupCallback = callback;
};

export const triggerLoginPopup = () => {
  if (openLoginPopupCallback) {
    openLoginPopupCallback();
  }
};








