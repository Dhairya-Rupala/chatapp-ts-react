// libs
import { createContext, useContext } from "react";

// hooks 
import { useAuth } from "../hooks/useAuth";


// types 
import { UserProviderProps } from "./types";
import { UserContextType } from "./types";


export const UserContext = createContext <UserContextType>(null);

export const UserProvider = ({ children }: UserProviderProps) => {
  const { authProcess, onAuthAction } = useAuth();
  return (
    <UserContext.Provider value={{ ...authProcess, onAuthAction }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("Context should be used inside the context provider")
  return context;
};
