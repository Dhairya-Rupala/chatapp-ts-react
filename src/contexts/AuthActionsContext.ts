// libs 
import { createContext, useContext } from "react";


type AuthActions = {
  login: (username: string, password: string) => void;
  logout: () => void;
  signup: (username: string, password: string) => void;
  resetAuthState: () => void;
} | null


const AuthActionsContext = createContext<AuthActions>(null)

export const AuthActionsProvider = AuthActionsContext.Provider

export const useAuthActions = () => {
  const context = useContext(AuthActionsContext);
  if (!context) throw new Error("Context should be used inside the context provider")
  return context;
}