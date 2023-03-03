// components 
import { Form } from "../../components/form";

// hooks
import { useUser } from "../../contexts/UserContext";
import { useAuthActions } from "../../contexts/AuthActionsContext";



export const Login = () => {
    const {error} = useUser()
    const { login,resetAuthState } = useAuthActions();
    return (
        <Form title="Login" onSubmit={login} footerMessage="Do not have an account? SIGN UP" redirectRoute="signup" error={error} onPageNavigate={resetAuthState } />
    )
}