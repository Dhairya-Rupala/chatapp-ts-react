import { SIGNUP } from "./actionTypes"
import { onAuthActionType } from "../../types"

export type SignUp = {
    type: typeof SIGNUP,
    payload: {
        username: string,
        password:string
    }
}

export type SignUpProps = {
    onAuthAction:onAuthActionType
}