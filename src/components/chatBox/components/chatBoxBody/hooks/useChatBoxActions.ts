// libs
import {
  useState,
  KeyboardEvent,
  useCallback,
  useRef,
  MouseEvent,
  ChangeEvent,
  useEffect,
} from "react";
import { v4 as uuidv4 } from "uuid";


// utils
import { getMessageCreationDetails } from "../utils/messageUtils";
import {
  fetchMessages,
  getFriendIdFromChatRoomId,
  updateMessagesDB,
} from "../../../../../utils/chatUtils";

// types
import { User, Message } from "../../../../../types";



export const useChatBoxActions = (activeChatRoomId: string, user: User | null) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [activeMessages, setActiveMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // polling db for latest messages 
  useEffect(() => {
    let interval: any;
    interval = setInterval(() => {
      const updatedMessages = fetchMessages(activeChatRoomId, {
        upto: activeMessages[activeMessages.length - 1]?.id,
      });
      if (!!updatedMessages?.length) {
        setActiveMessages((activeMessages) => [
          ...activeMessages,
          ...updatedMessages,
        ]);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [activeChatRoomId, activeMessages]);


  useEffect(() => {
    if (user) {
      const updatedMessages = fetchMessages(activeChatRoomId, undefined, 8);
      if (updatedMessages) {
        setActiveMessages(updatedMessages);
      }
    }
  }, [activeChatRoomId, user]);


  const handleCurrentMessageChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setCurrentMessage(e.target.value);
    },
    []
  );

  const sendMessage = useCallback(() => {
    if (user) {
      const { timestamp, creationDate } = getMessageCreationDetails();
      const newMessage = {
        id: uuidv4(),
        content: currentMessage,
        from: user.id,
        to: getFriendIdFromChatRoomId(user.id, activeChatRoomId),
        creationDate,
        timestamp,
      };
      setActiveMessages((activeMessages) => [...activeMessages, newMessage]);
      setCurrentMessage("");
      updateMessagesDB(activeChatRoomId, newMessage);
    }
  }, [activeChatRoomId, currentMessage, user]);

  

  const handleMessageSend = useCallback(
    (e: KeyboardEvent<HTMLInputElement> | MouseEvent<HTMLButtonElement>) => {
      if ("code" in e) {
        if (e.code === "Enter" && currentMessage.trim() !== "") {
          sendMessage();
        }
      } else {
        sendMessage();
      }
    },
    [currentMessage, sendMessage]
  );


  // callback for fetching more messages
  const fetchMoreMessages = useCallback(() => {
    const updatedMessages = fetchMessages(
      activeChatRoomId,
      { from: activeMessages[0].id },
      8
    );
    if (updatedMessages.length) {
      setActiveMessages((activeMessages) => [
        ...updatedMessages,
        ...activeMessages,
      ]);
    }
  }, [activeChatRoomId, activeMessages]);

  
  return {
    currentMessage,
    handleCurrentMessageChange,
    handleMessageSend,
    messagesEndRef,
    fetchMoreMessages,
    activeMessages,
  };
};
