// types 
import { Message } from "../../types";
import { onActionType } from "../../hooks/useChatActions/types";

// actions
import { SEND_MESSAGE,FETCH_MESSAGES } from "./actionTypes";


export type ChatBoxProps = {
    activeChatRoomId: string,
    activeMessages: Message[],
    onAction: onActionType
}

export type SendMessage = {
    type: typeof SEND_MESSAGE,
    payload: Message
}


export type FetchMessages = {
    type: typeof FETCH_MESSAGES,
    payload: number
}
