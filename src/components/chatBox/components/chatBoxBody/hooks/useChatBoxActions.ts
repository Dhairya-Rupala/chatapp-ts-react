// libs
import {
  useState,
  KeyboardEvent,
  useCallback,
  useMemo,
  useRef,
  useEffect,
  MouseEvent,
  ChangeEvent
} from "react";
import { v4 as uuidv4 } from "uuid";

// hooks
import { useIntersectionObserver } from "../../../../../hooks/useIntersectionObserver";

// utils 
import { getMessageCreationDetails } from "../utils";

// actions
import { SEND_MESSAGE, CHANGE_ACTIVE_MESSAGES } from "../../../actionTypes";

// types
import { onActionType, UserType } from "../../../../../types";

export const useChatBoxActions = (
  activeChatId: string,
  onAction: onActionType,
  user: UserType | null
) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const fetchMoreMessages = useCallback(() => {
    onAction({
      type: CHANGE_ACTIVE_MESSAGES,
      payload: 5,
    });
  }, [onAction]);

  
  const { targetRef: messageLoaderRef, rootRef: messageWrapperRef } =
    useIntersectionObserver({ callback: fetchMoreMessages });

  
  const handleSend = useCallback(
    (e: any) => {
      const sendMessage = () => {
        if (user) {
          const {timestamp,creationDate} = getMessageCreationDetails()
          onAction({
            type: SEND_MESSAGE,
            payload: {
              id: uuidv4(),
              content: currentMessage,
              from: user.id,
              to: activeChatId,
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
    [activeChatId, currentMessage, onAction, user]
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
    messageWrapperRef,
  };
};
