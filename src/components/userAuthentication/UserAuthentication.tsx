// libs
import { ReactNode } from "react";

// hooks 
import { useAuth } from "../../hooks/useAuth";

// contexts providers
import { UserProvider } from "../../contexts/UserContext";
import { AuthActionsProvider } from "../../contexts/AuthActionsContext";




export type UserAuthenticationProviderProps = {
    children:ReactNode
}



export const UserAuthentication = ({ children }: UserAuthenticationProviderProps) => {
  const { authProcess, ...authActions } = useAuth();
  return (
    <UserProvider value={{ ...authProcess }}>
      <AuthActionsProvider value={{...authActions}}>
        {children}
      </AuthActionsProvider>
    </UserProvider>
  );
};




