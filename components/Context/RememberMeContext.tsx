import { createContext } from "react";

type LoadContextType = {
  rememberMe: boolean; // Not sure what these are, type it appropriately
  setRememberMe: any;
};

export const RememberMeContext = createContext<LoadContextType>({
  rememberMe: false,
  setRememberMe: null,
});
