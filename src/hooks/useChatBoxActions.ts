// libs
import { useState, useContext, useLayoutEffect,useEffect, useRef, KeyboardEvent } from "react";
// context
import { UserContext } from "../contexts/UserContext";
// types
import { UserChat, onActionProps } from "../types";

const useChatBoxActions = (
  userChats: UserChat[],
  currentChat: string,
  onAction: (args: onActionProps) => void
) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const user = useContext(UserContext);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [currentChatMessages] = userChats.filter(
    (chat) => chat.id === currentChat
  );

  useEffect(() => {
    const enterPressHandler = (event: KeyboardEvent) => {
      if (event.code === "Enter" && !event.shiftKey) {
        if (currentMessage.trim() !== "" && !!currentChatMessages?.name) {
          onAction({
            type: "MESSAGE_SENT",
            payload: {
              content: currentMessage,
              from: {
                id: user.id,
                name: user.name,
              },
              to: {
                id: currentChat,
                name: currentChatMessages?.name,
              },
            },
          });
          setCurrentMessage("");
        }
      }
    };
    // window.addEventListener("keydown", enterPressHandler);
    return () => {
      // window.removeEventListener("keydown", enterPressHandler);
    };
  }, [
    currentMessage,
    currentChat,
    currentChatMessages?.name,
    onAction,
    user.id,
    user.name,
  ]);

  useLayoutEffect(() => {
    messagesEndRef?.current?.scrollIntoView();
  }, [currentChatMessages]);

  const onSend = () => {
    onAction({
      type: "MESSAGE_SENT",
      payload: {
        content: currentMessage,
        from: {
          id: user.id,
          name: user.name,
        },
        to: {
          id: currentChat,
          name: currentChatMessages.name,
        },
      },
    });
    setCurrentMessage("");
  };

  return {
    currentChatMessages,
    currentMessage,
    setCurrentMessage,
    onSend,
    user,
    messagesEndRef,
  };
};

export default useChatBoxActions;
