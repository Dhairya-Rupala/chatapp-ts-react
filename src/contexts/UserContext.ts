// libs 
import { createContext, useContext } from "react";

// types 
import { AuthProcess } from "../types";


const UserContext = createContext<AuthProcess | null>(null);

export const UserProvider = UserContext.Provider

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("Context should be used inside the context provider")
  return context;
};
