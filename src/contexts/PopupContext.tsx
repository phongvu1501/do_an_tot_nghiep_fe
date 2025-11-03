import type { ReactNode } from "react";
import React, { useState, useEffect } from "react";
import {
  PopupContext,
  type PopupContextType,
  type PopupType,
} from "./popupContext";
import { setOpenLoginPopupCallback } from "../utils/popupTrigger";

interface PopupProviderProps {
  children: ReactNode;
}

export const PopupProvider: React.FC<PopupProviderProps> = ({ children }) => {
  const [currentPopup, setCurrentPopup] = useState<PopupType>(null);

  const openPopup = (popupType: PopupType) => {
    setCurrentPopup(popupType);
  };

  const closePopup = () => {
    setCurrentPopup(null);
  };

  const switchPopup = (from: PopupType, to: PopupType) => {
    if (currentPopup === from) {
      setCurrentPopup(to);
    }
  };

  useEffect(() => {
    setOpenLoginPopupCallback(() => {
      openPopup("login");
    });

    return () => {
      setOpenLoginPopupCallback(null);
    };
  }, []);

  const value: PopupContextType = {
    currentPopup,
    openPopup,
    closePopup,
    switchPopup,
  };

  return (
    <PopupContext.Provider value={value}>{children}</PopupContext.Provider>
  );
};
