import { ChangeActiveChat } from "../components/chatList/types"
import { AddNewUser } from "../components/header/types"
import { SendMessage } from "../components/chatBox/types"
import { SignUp } from "../pages/SignUp/types"
import { LogIn } from "../pages/Login/types"
import { LogOut } from "../components/header/types"

export type ChatActions = SendMessage | AddNewUser | ChangeActiveChat 
export type AuthActions = SignUp | LogIn | LogOut

export type onActionType = (args: ChatActions) => void;
export type onAuthActionType = (args: AuthActions) => void;


export type UserType = {
    id: string,
    name: string,
    profilePicture: string,
    password:string,
    personalChats: string[],
    groupChats:string[]
}

export type MessageType = {
    id: string,
    content: string,
    from: string,
    to:string
}

export type PersonalChatType = {
    id: string,
    participants: [string, string],
    messages:string[]
}

export type GroupChatType = {
    id: string,
    groupName:string,
    participants: string[],
    messages:string[]
}

export type UsersType = {
    [id:string]:UserType
}

export type MessagesType = {
    [id:string]:MessageType
}

export type PersonalChatsType = {
    [id:string]:PersonalChatType
}




