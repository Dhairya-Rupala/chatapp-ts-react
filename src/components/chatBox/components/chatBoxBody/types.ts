import { Message } from "../../../../types";
import { SEND_MESSAGE,FETCH_MESSAGES } from "./actionTypes";



export type SendMessageAction = {
    type: typeof SEND_MESSAGE,
    payload: Message
}

export type FetchMessagesAction = {
    type: typeof FETCH_MESSAGES,
}
export type onActionType = (action: SendMessageAction | FetchMessagesAction) => void;

export type ChatBoxBodyProps = {
  activeChatRoomId: string;
  activeMessages: Message[];
  activeChatUserName: string;
  onAction: onActionType;
};