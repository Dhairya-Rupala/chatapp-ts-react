// libs
import { useState, useCallback, useRef } from "react";

// hooks
import { useUser } from "../../contexts/UserContext";

// utils
import {
  getPartialActiveMessages,
  updateMessagesDB
} from "../../utils/chatUtils";

// types
import { ChatActions } from "./types";
import { Message } from "../../types";


// chat actions
import {
  SEND_MESSAGE,
  FETCH_MESSAGES,
} from "../../components/chatBox/actionTypes";


export const useChatActions = () => {
  const { user } = useUser();
  const [activeChatRoomId, setActiveChatRoomId] = useState("");
  const [activeMessages, setActiveMessages] = useState<Message[]>([]);

  
  const sendMessage = useCallback(
    (message: Message) => {
      setActiveMessages((activeMessages) => [...activeMessages, message]);
      if (user) updateMessagesDB(activeChatRoomId, message);
    },
    [activeChatRoomId, user]
  );

  const changeActiveChatRoom = useCallback(
    (chatRoomId: string) => {
      setActiveChatRoomId(chatRoomId);
      if (user) {
        const updatedMessagesData = getPartialActiveMessages(
          user.id,
          chatRoomId,
          8,
          0
        );
        if (updatedMessagesData) {
          setActiveMessages(updatedMessagesData.messages);
        }
      }
    },
    [user]
  );

  const fetchMessages = useCallback(
    (fetchCount: number) => {
      if (user) {
        const updatedMessagesData = getPartialActiveMessages(
          user.id,
          activeChatRoomId,
          fetchCount,
          activeMessages.length
        );
        if (updatedMessagesData) {
          setActiveMessages((activeMessages) => {
            return [
            ...updatedMessagesData.messages,
            ...activeMessages,
          ]
          });
        }
      }
    },
    [activeChatRoomId, activeMessages.length, user]
  );

  const onAction = useCallback(
    (action: ChatActions) => {
      switch (action.type) {
        case SEND_MESSAGE:
          sendMessage(action.payload);
          break;

        case FETCH_MESSAGES:
          fetchMessages(action.payload);
          break;

        default:
          throw new Error(`Action is not supported`);
      }
    },
    [fetchMessages, sendMessage]
  );

  return {
    activeChatRoomId,
    activeMessages,
    changeActiveChatRoom,
    onAction,
  };
};



// TODO:
  // const messagesCount = useRef(0);

  // useEffect(() => {
  //   let interval: any;
  //   interval = setInterval(() => {
  //     if (user && activeChatRoomId) {
  //       let updatedMessagesData = pollLocalStorageMessages(
  //         user.id,
  //         activeChatId,
  //         messagesCount.current
  //       );
  //       if (updatedMessagesData) {
  //         setActiveMessages(updatedMessagesData.messages);
  //         messagesCount.current = updatedMessagesData.totalMessages;
  //       }
  //     }
  //   }, 1000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [activeChatId, user]);