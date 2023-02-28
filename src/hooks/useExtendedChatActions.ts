// libs 
import { useState, useMemo, useCallback, useEffect } from "react";

// hooks
import { useUser } from "../contexts/UserContext";

// utils 
import { getFriendsList, getActiveMessages,updateLocalStorage,pollLocalStorageMessages } from "../utils/chatUtils";

// types 
import { MessageType,ChatActions } from "../types";

// actions 
import { SEND_MESSAGE } from "../components/chatBox/actionTypes";
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


    useEffect(() => {
        if(user)
            setActiveMessages(getActiveMessages(user.id, activeChatId));
        else
            setActiveMessages([])
    }, [activeChatId, user, user?.id])


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


