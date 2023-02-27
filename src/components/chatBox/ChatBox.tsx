// libs 
import { ChangeEvent, useCallback,KeyboardEvent } from "react";
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



export const ChatBox = ({ activeChatId, activeMessages, onAction }: ChatBoxProps) => {
  const user = useUser();
  const { currentMessage, setCurrentMessage, onSend,messagesEndRef,enterPressHandler,activeChatUserName } = useChatBoxActions(
    activeMessages,
    activeChatId,
    onAction,
    user
  );

  const handleSendClick = useCallback(() => {
    onSend();
  }, [onSend])
  
  const handleCurrentMessageChange = useCallback((e:ChangeEvent<HTMLInputElement>) => {
    setCurrentMessage(e.target?.value)
  }, [setCurrentMessage])
  
  const handleEnterKeyDown = useCallback((e:KeyboardEvent<HTMLInputElement>) => {
    enterPressHandler(e);
  }, [enterPressHandler]);
  

  
  return (
    <div className={styles.wrapper}>
      {activeChatId?<><div className={styles.currentChatName}>{ activeChatUserName}</div>
      <div className={styles.chatWrapper}>
        {activeMessages?.map((message, index) => (
          <Message
            content={message.content}
            from={message.from === user?.id ? { id: user?.id, name: user?.name } : {
              id: activeChatId,
              name:activeChatUserName
            }}
            key={index}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className={styles.writeMessage}>
        <input
          contentEditable
          className={styles.chatInput}
          placeholder="Type the message"
          onChange={handleCurrentMessageChange}
          onKeyDown={handleEnterKeyDown}
          value={currentMessage}
        />
        <Button disabled={currentMessage.trim() === ""}
          onClick={handleSendClick}
        >
          Send
        </Button>
      </div></>:<EmptyState/>}
    </div>
  );
};

