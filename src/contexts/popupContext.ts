import { createContext } from "react";

export type PopupType =
  | "login"
  | "register"
  | null;

export interface PopupContextType {
  currentPopup: PopupType;
  openPopup: (popupType: PopupType) => void;
  closePopup: () => void;
  switchPopup: (from: PopupType, to: PopupType) => void;
}

export const PopupContext = createContext<PopupContextType | undefined>(
  undefined
);
