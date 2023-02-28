import { RESET_AUTH_STATE } from "./actionTypes"
import { onAuthActionType } from "../../types"

export type FormProps = {
    title: string,
    footerMessage: string,
    onSubmit: (...args:any)=>void,
    redirectRoute: string,
    error: string | null,
    onAuthAction:onAuthActionType
}

export type ResetAuthState = {
    type: typeof RESET_AUTH_STATE,
    payload:null
}