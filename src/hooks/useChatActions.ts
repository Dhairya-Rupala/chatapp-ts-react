// libs
import { useState, useMemo, useCallback, useEffect } from "react";

// hooks
import { useUser } from "../contexts/UserContext";

// utils
import {
  getFriendsList,
  getActiveMessages,
  updateLocalStorage,
  pollLocalStorageMessages,
  getPartialActiveMessages,
} from "../utils/chatUtils";

// types
import { MessageType, ChatActions } from "../types";

// actions
import {
  SEND_MESSAGE,
  CHANGE_ACTIVE_MESSAGES,
} from "../components/chatBox/actionTypes";
import { CHANGE_ACTIVE_CHAT } from "../components/chatList/actionTypes";

export const useChatActions = () => {
  const { user } = useUser();
  const [activeChatId, setActiveChatId] = useState("");
  const [activeMessages, setActiveMessages] = useState<MessageType[]>([]);

    

  // TODO: Polling needs to be figured out
  // useEffect(() => {
  //     let interval:any;
  //     interval = setInterval(() => {
  //         let updatedMessages = pollLocalStorageMessages(user, activeChatId)
  //         setActiveMessages(updatedMessages);
  //     }, 1000);
  //     return () => {
  //         clearInterval(interval)
  //     }
  // },[activeChatId, user])


  const onAction = useCallback(
    (action: ChatActions) => {
      switch (action.type) {
        case SEND_MESSAGE:
          const updatedActiveMessages = [...activeMessages, action.payload];
          setActiveMessages(updatedActiveMessages);
          updateLocalStorage(user, activeChatId, action.payload);
              break;
          
        case CHANGE_ACTIVE_CHAT:
          setActiveChatId(action.payload);
          if (user) {
            const data = getPartialActiveMessages(user.id, action.payload, 8, 0);
            setActiveMessages(data);
          }
          break;

        case CHANGE_ACTIVE_MESSAGES:
          const data = getPartialActiveMessages(
            user?.id,
            activeChatId,
            action.payload,
            activeMessages.length
          );
          setActiveMessages([...data, ...activeMessages]);
              break;
        
        default:
          throw new Error(`${action.type} is not supported`);
      }
    },
    [activeChatId, activeMessages, user]
  );

  return {
    activeChatId,
    activeMessages,
    onAction,
  };
};









/*

Workflow for the lazy fetching chats 

ChatWrapper = root element which will observe for the intersection 
Message = target elements which the root will observe for the intersection 

Initial Fetch = x messages latest 

Prepend one div for the intesection in ChatBox component 
    - when the div intesects then we have to fetch more messages with the buffer let say y
    - state updates will be done here, 


TODO: Scroll behaviour will break here need to be taken care of

*/
