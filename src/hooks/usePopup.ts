import { useContext } from "react";
import { PopupContext } from "../contexts/popupContext";
import type { PopupContextType } from "../contexts/popupContext";

export const usePopup = (): PopupContextType => {
  const context = useContext(PopupContext);
  if (context === undefined) {
    throw new Error("usePopup must be used within a PopupProvider");
  }
  return context;
};
