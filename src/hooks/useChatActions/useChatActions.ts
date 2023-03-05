// libs
import { useState, useCallback, useEffect } from "react";

// hooks
import { useUser } from "../../contexts/UserContext";

// utils
import {
  fetchMessages,
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

  useEffect(() => {
    let interval: any;
    interval = setInterval(() => {
      const updatedMessages = fetchMessages(activeChatRoomId, { upto: activeMessages[activeMessages.length - 1].id })
      if (!!updatedMessages.length) {
        setActiveMessages(activeMessages=>[...activeMessages,...updatedMessages])
      }
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  },[activeChatRoomId, activeMessages])

  
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
        const updatedMessages = fetchMessages(chatRoomId,undefined,8);
        if (updatedMessages) {
          setActiveMessages(updatedMessages);
        }
      }
    },
    [user]
  );

  const fetchMoreMessages = useCallback(
    () => {
        const updatedMessages = fetchMessages(activeChatRoomId,{from:activeMessages[0].id},8)
        if (updatedMessages.length) {
          setActiveMessages((activeMessages) => [
            ...updatedMessages,
            ...activeMessages,
          ]);
        }
    },
    [activeChatRoomId, activeMessages]
  );

  const onAction = useCallback(
    (action: ChatActions) => {
      switch (action.type) {
        case SEND_MESSAGE:
          sendMessage(action.payload);
          break;

        case FETCH_MESSAGES:
          fetchMoreMessages();
          break;

        default:
          throw new Error(`Action is not supported`);
      }
    },
    [fetchMoreMessages, sendMessage]
  );

  return {
    activeChatRoomId,
    activeMessages,
    changeActiveChatRoom,
    onAction,
  };
};