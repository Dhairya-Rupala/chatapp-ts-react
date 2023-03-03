



export type User = {
    id: string,
    name: string,
    profilePicture: string,
    password: string,
    chatRooms: string[],
};

export type Message = {
    id: string,
    content: string,
    from: string,
    to: string,
    creationDate: string,
    timestamp:string,
}

export type PersonalChatType = {
    id: string,
    participants: [string, string],
    messages:string[]
}


export type UsersRecord = {
    [id: string]: User
}

//MessageRecords
export type MessagesRecord = {
    [id:string]:Message
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
  user: User | null;
  error: string | null;
};

