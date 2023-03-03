import { SendMessage,FetchMessages } from "../../components/chatBox/types"


export type ChatActions = SendMessage | FetchMessages

export type onActionType = (args: ChatActions) => void;