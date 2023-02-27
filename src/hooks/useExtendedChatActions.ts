// libs 
import { useState, useMemo, useCallback, useEffect } from "react";

// hooks
import { useUser } from "../contexts/UserContext";

// utils 
import { getFriendsList, getActiveMessages,updateLocalStorage } from "../utils/chatUtils";

// types 
import { MessageType,ChatActions } from "../types";

// actions 
import { SEND_MESSAGE } from "../components/chatBox/actionTypes";
import { CHANGE_ACTIVE_CHAT } from "../components/chatList/actionTypes";




export const useExtendedChatActions = () => {
    const [user] = useUser()
    const [activeChatId, setActiveChatId] = useState("");
    const [activeMessages, setActiveMessages] = useState<MessageType[]>([]);

    const friendList = useMemo(() => {
        if (user) {
            return getFriendsList(user.id, user.personalChats);
        }
        return []
    }, [user])


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


/*

State structure 
activeUser = currently logged in user 

// will just be the memoized list not state 
usersList  = list of the users activeUser has chat with 
           --> can be derived with the given flow
               
               map over the 
               activeUser.personalChats and send the chat id into resolve for the 
               friend user key
               
               utils
                    1. resolver(compositekey,user) => filtered friend user key 
                from the key can directly fetch the userinfo from the user table


activeChat = currently rendered chat
            --> can be derived with the given flow 
                
                utils
                     1. createCompositeKey(id1,id2)=>returns the composite key
                     2. can fetch the messages from the 
                        PersonalChats.compositeKey.Messages 


composite key will be : the small string first then the big string and the placeholder 
will be #

*/
