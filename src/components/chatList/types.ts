import {UserType,onActionType} from "../../types"
    
export type ChatListProps = {
    friendList: UserType[],
    activeChatId:string,
    onAction: onActionType
}

export * from "./components/chatListItem/types"