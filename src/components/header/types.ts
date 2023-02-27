// types 
import { onAuthActionType } from "../../types"
import { LOGOUT } from "./actionTypes"

export { AddNewUser } from "./components/addUserModal/types"

export type HeaderProps = {
    onAuthAction: onAuthActionType
}

export type LogOut = {
    type: typeof LOGOUT,
    payload:null
}
