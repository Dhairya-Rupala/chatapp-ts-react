// types 
import { onActionType,MessageType } from "../../types";

// actions
import { SEND_MESSAGE,CHANGE_ACTIVE_MESSAGES } from "./actionTypes";


export type ChatBoxProps = {
    activeChatId: string,
    activeMessages: MessageType[] | null,
    onAction: onActionType
}

export type SendMessage = {
    type: typeof SEND_MESSAGE,
    payload: MessageType
}


export type ChangeActiveMessages = {
    type: typeof CHANGE_ACTIVE_MESSAGES,
    payload: {
        start: number,
        end:number
    }
}
