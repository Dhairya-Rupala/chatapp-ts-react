// libs
import {
  useState,
  KeyboardEvent,
  useCallback,
  useRef,
  MouseEvent,
  ChangeEvent,
} from "react";
import { v4 as uuidv4 } from "uuid";

// hooks
import { useIntersectionObserver } from "../../../../../hooks/useIntersectionObserver";

// utils 
import { getMessageCreationDetails } from "../utils/messageUtils";

// actions
import { SEND_MESSAGE, FETCH_MESSAGES } from "../actionTypes";

// types
import { User } from "../../../../../types";
import { onActionType } from "../types"
import { getFriendIdFromChatRoomId } from "../../../../../utils/chatUtils";


export const useChatBoxActions = (
  activeChatRoomId: string,
  onAction: onActionType,
  user: User | null,
) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);


  const fetchMoreMessages = useCallback(() => {
    onAction({
      type: FETCH_MESSAGES,
    });
  }, [onAction]);


  const { targetRef: messageLoaderRef, rootRef: messagesWrapperRef } =
    useIntersectionObserver({ callback: fetchMoreMessages });
  
  
  
  const handleSend = useCallback(
    (e: KeyboardEvent<HTMLInputElement> | MouseEvent<HTMLButtonElement>) => {
      const sendMessage = () => {
        if (user) {
          const {timestamp,creationDate} = getMessageCreationDetails()
          onAction({
            type: SEND_MESSAGE,
            payload: {
              id: uuidv4(),
              content: currentMessage,
              from: user.id,
              to: getFriendIdFromChatRoomId(user.id,activeChatRoomId),
              creationDate,
              timestamp

            },
          });
          setCurrentMessage("");
        }
      };
      if ("code" in e) {
        if (e.code === "Enter" && !e.shiftKey && currentMessage.trim() !== "") {
          sendMessage()
        }
      } else {
        sendMessage()
      }
    },
    [activeChatRoomId, currentMessage, onAction, user]
  );

  const handleCurrentMessageChange = useCallback((e:ChangeEvent<HTMLInputElement>) => {
    setCurrentMessage(e.target.value)
  },[])


  return {
    currentMessage,
    handleCurrentMessageChange,
    handleSend,
    messagesEndRef,
    messageLoaderRef,
    messagesWrapperRef,
  };
};
