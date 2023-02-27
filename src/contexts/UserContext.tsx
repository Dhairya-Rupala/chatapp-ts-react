// libs
import { createContext, useContext } from "react";

// dummy data 
import { CurrentUser } from "../dummy_data";

// types 
import { UserProviderProps } from "./types";
import { UserType } from "../types";





export const UserContext = createContext<UserType | undefined>(undefined);

export const UserProvider = ({ children }: UserProviderProps) => {
  return (
    <UserContext.Provider value={CurrentUser}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  return context;
};
