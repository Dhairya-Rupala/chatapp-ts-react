// libs 
import { createContext, useContext } from "react";


type AuthActionsContextType = {
  login: (username: string, password: string) => void;
  logout: () => void;
  signup: (username: string, password: string) => void;
  resetAuthState: () => void;
} | null


const AuthActionsContext = createContext<AuthActionsContextType>(null)

export const AuthActionsProvider = AuthActionsContext.Provider

export const useAuthActions = () => {
  const context = useContext(AuthActionsContext);
  if (!context) throw new Error("Context should be used inside the context provider")
  return context;
}