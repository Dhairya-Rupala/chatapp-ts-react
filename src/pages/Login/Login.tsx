// components 
import { Form } from "../../components/form";


export const Login = () => {
    return (
        <Form title="Login" onSubmit={()=>console.log("Login")} footerMessage="Do not have an account? SIGN IN"/>
    )
}