// libs
import { useState, useLayoutEffect, useRef, KeyboardEvent, useCallback, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";

// actions 
import { SEND_MESSAGE } from "../actionTypes";

// types
import { MessageType,onActionType,UserType } from "../../../types";

// utils 
import { getUserNameFromId } from "../../../utils/utils"

export const useChatBoxActions = (
  activeMessages: MessageType[],
  activeChatId: string,
  onAction: onActionType,
  user:UserType | undefined
) => {
  
  const [currentMessage, setCurrentMessage] = useState("");
  
  const activeChatUserName = useMemo(() => getUserNameFromId(activeChatId),[activeChatId])
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const onSend = useCallback(() => {
    if (user) {
      onAction({
      type: SEND_MESSAGE,
      payload: {
        id: uuidv4(),
        content: currentMessage,
        from: user.id,
        to:activeChatId,
      },
    });
    setCurrentMessage("");
    }
  },[activeChatId, currentMessage, onAction, user]);

  const enterPressHandler = useCallback((event:KeyboardEvent) => {
    if (event.code === "Enter" && !event.shiftKey) {
        if (currentMessage.trim() !== "") {
          onSend()
        }
      }
    },[currentMessage, onSend]);

  
  useLayoutEffect(() => {
    messagesEndRef?.current?.scrollIntoView();
  }, [activeMessages]);



  return {
    currentMessage,
    setCurrentMessage,
    onSend,
    user,
    messagesEndRef,
    enterPressHandler,
    activeChatUserName
  };
};
