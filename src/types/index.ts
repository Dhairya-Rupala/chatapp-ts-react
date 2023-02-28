import { ChangeActiveChat } from "../components/chatList/types"
import { AddNewUser } from "../components/header/types"
import { SendMessage } from "../components/chatBox/types"
import { SignUp } from "../pages/SignUp/types"
import { LogIn } from "../pages/Login/types"
import { LogOut } from "../components/header/types"
import { ResetAuthState } from "../components/form/types"

export type ChatActions = SendMessage | AddNewUser | ChangeActiveChat 
export type AuthActions = SignUp | LogIn | LogOut | ResetAuthState

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


export enum AUTH_STATUS {
  IDLE = "IDLE",
  LOGIN_START = "LOGIN_START",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_FAIL = "LOGIN_FAIL",
  SIGNUP_START = "SIGNUP_START",
  SIGNUP_SUCCESS = "SIGNUP_SUCCESS",
  SIGNUP_FAIL = "SIGNUP_FAIL",
  LOGOUT_START = "LOGOUT_START",
  LOGOUT_FAIL = "LOGOUT_FAIL",
  LOGOUT_SUCCESS = "LOGOUT_SUCCESS",
}

export type AuthProcessType = {
  status: string;
  user: UserType | null;
  error: string | null;
};

