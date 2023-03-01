// libs 
import { ChangeEvent, useCallback,KeyboardEvent, useRef, RefObject, useMemo } from "react";
// components
import { Message } from "./components/message";
import { Button } from "../button"
import { EmptyState } from "./components/emptyState";
// hooks
import { useChatBoxActions } from "./hooks/useChatBoxActions";
import { useUser } from "../../contexts/UserContext";
// styles 
import styles from "./ChatBox.module.css";
// types
import { ChatBoxProps } from "./types";
import { getUserNameFromId } from "../../utils/chatUtils";


export const ChatBox = ({ activeChatId, activeMessages, onAction }: ChatBoxProps) => {
  const {user} = useUser();
  const { currentMessage, setCurrentMessage, handleSend,messagesEndRef,messageLoaderRef,messageWrapperRef } = useChatBoxActions(
    activeMessages,
    activeChatId,
    onAction,
    user
  );

  
  const handleCurrentMessageChange = useCallback((e:ChangeEvent<HTMLInputElement>) => {
    setCurrentMessage(e.target?.value)
  }, [setCurrentMessage])

  const activeChatUserName = useMemo(
    () => getUserNameFromId(activeChatId),
    [activeChatId]
  );
  

  

  
  return (
    <div className={styles.wrapper}>
      
      {activeChatId?<><div className={styles.currentChatName}>{ activeChatUserName}</div>
        <div className={styles.chatWrapper} ref={messageWrapperRef as RefObject<HTMLDivElement>}>
        {activeMessages?.map((message, index) => (
          <Message
            key={message.id}
            content={message.content}
            from={message.from === user?.id ? { id: user?.id, name: user?.name } : {
              id: activeChatId,
              name:activeChatUserName
            }}
            messageRef={index === 0 ? (messageLoaderRef as RefObject<HTMLDivElement>) : (index === activeMessages.length - 1 ? (messagesEndRef as RefObject<HTMLDivElement>) : null)}
            isLast={index===activeMessages.length-1}
          />
        ))}
      </div>
      <div className={styles.writeMessage}>
        <input
          contentEditable
          className={styles.chatInput}
          placeholder="Type the message"
          onChange={handleCurrentMessageChange}
          onKeyDown={handleSend}
          value={currentMessage}
        />
        <Button disabled={currentMessage.trim() === ""}
          onClick={handleSend}
        >
          Send
        </Button>
      </div></>:<EmptyState/>}
    </div>
  );
};

