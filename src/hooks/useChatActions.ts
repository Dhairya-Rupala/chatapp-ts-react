// libs
import { useState } from "react"
import { v4 as uuidv4 } from "uuid";
// data
import { user_chats, current_user } from "../dummy_data";
// types 
import { onActionProps,UserChat } from "../types";

const useChatActions = () => {
    const [user,setUser] = useState(current_user)
    const [userChats, setuserChats] = useState<UserChat[]>(user_chats);
    const [currentChat, setCurrentChat] = useState("2");

    const onAction = (action:onActionProps) => {
        switch (action.type) {
            case "MESSAGE_SENT":
                let updatedUserChats = [...userChats];
                updatedUserChats = updatedUserChats.map((chat) => {
                    if (chat.id !== currentChat) return chat;
                    let updatedCurrentChat = {
                        ...chat,
                        messages: [
                            ...chat.messages,
                            action.payload
                        ]
                    }
                    return updatedCurrentChat
                })
                setuserChats(updatedUserChats)
                break;
            case "CHANGE_CURRENT_CHAT":
                setCurrentChat(action.payload)
                break;
            case "ADD_NEW_USER_CHAT":
                const newUserId = uuidv4();
                setuserChats([
                    ...userChats,
                    {
                        id: newUserId,
                        name: action.payload.username,
                        profile_picture: "https://picsum.photos/200",
                        messages: []
                    }
                ])
                setCurrentChat(newUserId);
                break;
            default:
                break;
        }
    }
 
    return {
        onAction,
        userChats,
        currentChat,
        user
    }
}

export default useChatActions;