// libs 
import {ReactNode} from "react"

// types 
import { onAuthActionType,AuthProcessType } from "../types";

export type UserProviderProps = {
    children:ReactNode
}


export type UserContextType = (AuthProcessType & {
  onAuthAction:onAuthActionType,
}) | null