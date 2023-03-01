import {onActionType} from "../../types"
    
export type ChatListProps = {
    activeChatId:string,
    onAction: onActionType
}

export * from "./components/chatListItem/types"