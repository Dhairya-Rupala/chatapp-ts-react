// actions 
import { CHANGE_ACTIVE_CHAT } from "./actionTypes"
import { onActionType,UserType } from "../../../../types"

export type ChatListItemProps = {
    chat: UserType,
    isActive:boolean,
    onAction: onActionType
}


export type ChangeActiveChat = {
    type: typeof CHANGE_ACTIVE_CHAT,
    payload:string
}

