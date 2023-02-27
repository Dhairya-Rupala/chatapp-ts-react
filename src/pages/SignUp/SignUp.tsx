// libs 
import { useCallback } from "react";

// components 
import { Form } from "../../components/form";

// types 
import { SignUpProps } from "./types";

// actions 
import { SIGNUP } from "./actionTypes";


export const SignUp = ({ onAuthAction,error }: SignUpProps) => {
    const handleSignUp = useCallback((username:any,password:any) => {
        onAuthAction({
            type: SIGNUP,
            payload: {
                username,
                password
            }
        })
    }, [onAuthAction])
    return (
        <Form title="Sign Up" onSubmit={handleSignUp} footerMessage="Already have an account? Log In" route="login" error={error} />
    )
}