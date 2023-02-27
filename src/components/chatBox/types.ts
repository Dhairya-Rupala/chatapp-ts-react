// types 
import { onActionType,MessageType } from "../../types";

// actions
import { SEND_MESSAGE } from "./actionTypes";


export type ChatBoxProps = {
    activeChatId: string,
    activeMessages: MessageType[] | null,
    onAction: onActionType
}

export type SendMessage = {
    type: typeof SEND_MESSAGE,
    payload: MessageType
}
