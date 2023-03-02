// types 
import { onAuthActionType } from "../../types"
import { LOGOUT } from "./actionTypes"


export type HeaderProps = {
    onAuthAction: onAuthActionType
}

export type LogOut = {
    type: typeof LOGOUT,
    payload:null
}
