// libs 
import { createContext, useContext } from "react";

// types 
import { AuthProcessType } from "../types";


type UserContextType = AuthProcessType | null

const UserContext = createContext<UserContextType>(null);

export const UserProvider = UserContext.Provider

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("Context should be used inside the context provider")
  return context;
};
