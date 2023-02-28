// libs 
import { useCallback } from "react";

// components 
import { Form } from "../../components/form";

// types 
import { LogInProps } from "./types";

// actions 
import { LOGIN } from "./actionTypes";


export const Login = ({ onAuthAction,error }: LogInProps) => {
    
    const handleLogin = useCallback((username:string,password:string) => {
        onAuthAction({
            type: LOGIN,
            payload: {
                username,
                password
            }
        })
    }, [onAuthAction])
    
    return (
        <Form title="Login" onSubmit={handleLogin} footerMessage="Do not have an account? SIGN UP" redirectRoute="signup" error={error} onAuthAction={onAuthAction} />
    )
}