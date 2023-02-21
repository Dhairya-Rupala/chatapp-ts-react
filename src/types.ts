export type LayoutProps = {
    top: JSX.Element,
    left: JSX.Element,
    right:JSX.Element
}

export type MessageProps = {
    content: string,
    from: {
        id: string,
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
        id: string,
        name:string
    },
    to: {
        id: string,
        name:string
    }
}

export type UserChat = {
    id: string,
    name: string,
    profile_picture: string,
    messages:Message[]
}

export type ChatListProps = {
    userChats: UserChat[],
    currentChat:string,
    onAction: (args:onActionProps)=> void,
}

export type ChatListItemProps = {
    chat: UserChat,
    currentChat:string,
    onAction: (args:onActionProps)=> void,
}

export type ChatBoxProps = {
    currentChat: string,
    userChats: UserChat[],
    onAction: (args:onActionProps)=> void,
}