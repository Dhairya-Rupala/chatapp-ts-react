// libs 
import React from "react"

// types 
import { onAuthActionType,AuthProcessType } from "../types";

export type UserProviderProps = {
    children:React.ReactNode
}


export type UserContextType = (AuthProcessType & {
  onAuthAction:onAuthActionType
}) | null