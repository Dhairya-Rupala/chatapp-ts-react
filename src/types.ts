export type LayoutProps = {
    top: JSX.Element,
    left: JSX.Element,
    right:JSX.Element
}

export type MessageProps = {
    content: string,
    from: {
        id: number,
        name:string
    }
}

export type onActionProps = {
    type: string,
    payload?: any
}

export type AddUserModalProps = {
    addUser: boolean,
    setAddUser: React.Dispatch<React.SetStateAction<boolean>>,
    onAction: (args:onActionProps)=> void,
}

export type HeaderProps = {
    onAction: (args:onActionProps)=> void,
}




export type Message = {
    content: string,
    from: {
        id: number,
        name:string
    },
    to: {
        id: number,
        name:string
    }
}

export type UserChat = {
    id: number,
    name: string,
    profile_picture: string,
    messages:Message[]
}

export type ChatListProps = {
    userChats: UserChat[],
    currentChat:number,
    onAction: (args:onActionProps)=> void,
}

export type ChatListItemProps = {
    chat: UserChat,
    currentChat:number,
    onAction: (args:onActionProps)=> void,
}

export type ChatBoxProps = {
    currentChat: number,
    userChats: UserChat[],
    onAction: (args:onActionProps)=> void,
}