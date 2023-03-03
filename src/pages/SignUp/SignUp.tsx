// components 
import { Form } from "../../components/form";

// hooks
import { useUser } from "../../contexts/UserContext";
import { useAuthActions } from "../../contexts/AuthActionsContext";



export const SignUp = () => {
    const {error} = useUser()
    const {signup,resetAuthState} = useAuthActions()
    return (
        <Form title="Sign Up" onSubmit={signup} footerMessage="Already have an account? Log In" redirectRoute="login" error={error} onPageNavigate={resetAuthState} />
    )
}