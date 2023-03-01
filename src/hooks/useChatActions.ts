// libs 
import { useState, useMemo, useCallback, useEffect } from "react";

// hooks
import { useUser } from "../contexts/UserContext";

// utils 
import { getFriendsList, getActiveMessages,updateLocalStorage,pollLocalStorageMessages,getPartialActiveMessages } from "../utils/chatUtils";

// types 
import { MessageType,ChatActions } from "../types";

// actions 
import { SEND_MESSAGE,CHANGE_ACTIVE_MESSAGES } from "../components/chatBox/actionTypes";
import { CHANGE_ACTIVE_CHAT } from "../components/chatList/actionTypes";


export const useExtendedChatActions = () => {
    const {user} = useUser()
    const [activeChatId, setActiveChatId] = useState("");
    const [activeMessages, setActiveMessages] = useState<MessageType[]>([]);

    const friendList = useMemo(() => {
        if (user) {
            return getFriendsList(user.id, user.personalChats);
        }
        return []
    }, [user])


    useEffect(() => {
        let interval:any;
        interval = setInterval(() => {
            let updatedMessages = pollLocalStorageMessages(user, activeChatId)
            setActiveMessages(updatedMessages);
        }, 1000);
        return () => {
            clearInterval(interval)
        }
    },[activeChatId, user])


    //TODO: will be downlifted into the chatBox component as we are lazy loading the messages 
    useEffect(() => {
        if(user)
            setActiveMessages(getActiveMessages(user.id, activeChatId));
        else
            setActiveMessages([])
    }, [activeChatId, user])


    const onAction = useCallback((action: ChatActions) => {
        switch (action.type) {
            case SEND_MESSAGE:
                const updatedActiveMessages = [...activeMessages,action.payload];
                setActiveMessages(updatedActiveMessages);
                updateLocalStorage(user,activeChatId,action.payload)
                break;
            case CHANGE_ACTIVE_CHAT:
                setActiveChatId(action.payload);
                break;
            
            //TODO: action for fetching the partial messages
            case CHANGE_ACTIVE_MESSAGES:
                const start = action.payload.start;
                const end = action.payload.end;
                setActiveMessages(getPartialActiveMessages(user.id,activeChatId,start,end))
                break;
            default:
                throw new Error(`${action.type} is not supported`)
        }
    },[activeChatId, activeMessages, user])

    return {
        activeChatId,
        activeMessages,
        friendList,
        onAction
    }
}


