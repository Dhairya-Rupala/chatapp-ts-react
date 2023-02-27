// components 
import { Form } from "../../components/form";


export const SignUp = () => {
    return (
        <Form title="Sign Up" onSubmit={()=>console.log("Sign Up")} footerMessage="Already have an account? Log In"/>
    )
}