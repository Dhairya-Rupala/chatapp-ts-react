// libs
import {
  useState,
  KeyboardEvent,
  useCallback,
  useMemo,
  useRef,
  useEffect,
  MouseEvent
} from "react";
import { v4 as uuidv4 } from "uuid";

// hooks
import { useIntersectionObserver } from "./useIntersectionObserver";

// actions
import { SEND_MESSAGE, CHANGE_ACTIVE_MESSAGES } from "../actionTypes";

// types
import { MessageType, onActionType, UserType } from "../../../types";

// utils
import { getUserNameFromId } from "../../../utils/chatUtils";

export const useChatBoxActions = (
  activeMessages: MessageType[] | null,
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
    (e: KeyboardEvent | MouseEvent) => {
      const sendMessage = () => {
        if (user) {
          onAction({
            type: SEND_MESSAGE,
            payload: {
              id: uuidv4(),
              content: currentMessage,
              from: user.id,
              to: activeChatId,
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

  // TODO: Handled on the separate message
  // useLayoutEffect(() => {
  //   messagesEndRef?.current?.scrollIntoView(false);
  // }, [activeMessages?.length]);


  return {
    currentMessage,
    setCurrentMessage,
    handleSend,
    messagesEndRef,
    messageLoaderRef,
    messageWrapperRef,
  };
};
