import { LOGIN } from "./actionTypes";
import { onAuthActionType } from "../../types";

export type LogIn = {
    type: typeof LOGIN,
    payload: {
        username:string,
        password:string
    }
}

export type LogInProps = {
    onAuthAction: onAuthActionType,
    error:string | null
}