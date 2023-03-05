// types 
import { Message } from "../../types";
import { FetchMessagesAction,SendMessageAction } from "./components/chatBoxBody/types";


export type ChatBoxProps = {
    activeChatRoomId: string,
    activeMessages: Message[],
    onAction: (action: FetchMessagesAction | SendMessageAction) => void;
}

export * from "./components/chatBoxBody/types"


