// libs
import { createContext, useContext } from "react";

// hooks 
import { useAuth } from "../hooks/useAuth";


// types 
import { UserProviderProps } from "./types";
import { UserType,onAuthActionType } from "../types";





export const UserContext = createContext<[UserType | null,onAuthActionType] | null>(null);

export const UserProvider = ({ children }: UserProviderProps) => {
  const { user, onAuthAction } = useAuth();
  return (
    <UserContext.Provider value={[user,onAuthAction]}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("Context should be used inside the context provider")
  return context;
};
