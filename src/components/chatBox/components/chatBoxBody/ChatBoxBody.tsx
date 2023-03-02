// libs 
import {RefObject} from "react"

// components
import { Message } from "./components/message";
import { MessageInput } from "./components/messageInput/MessageInput";

// hooks
import { useChatBoxActions } from "./hooks/useChatBoxActions";
import { useUser } from "../../../../contexts/UserContext";

// styles
import styles from "./ChatBoxBody.module.css";

// types 
import { MessageType, onActionType } from "../../../../types";


type ChatBoxBodyProps = {
    activeChatId: string,
    activeMessages: MessageType[] | null,
    activeChatUserName:string,
    onAction:onActionType
}

export const ChatBoxBody = ({activeChatId,activeMessages,activeChatUserName,onAction}:ChatBoxBodyProps) => {
  const { user } = useUser();
  const {
    currentMessage,
    handleCurrentMessageChange,
    handleSend,
    messagesEndRef,
    messageLoaderRef,
    messageWrapperRef,
  } = useChatBoxActions(activeChatId, onAction, user);


    return (
      <>
    <div
      className={styles.chatWrapper}
      ref={messageWrapperRef as RefObject<HTMLDivElement>}
    >
      {activeMessages?.map((message, index) => (
        <Message
          key={message.id}
          content={message.content}
          from={
            message.from === user?.id
              ? { id: user?.id, name: user?.name }
              : {
                  id: activeChatId,
                  name: activeChatUserName,
                }
          }
              creationDate={message.creationDate}
              timestamp={message.timestamp}
          messageRef={
            index === 0
              ? (messageLoaderRef as RefObject<HTMLDivElement>)
              : index === activeMessages.length - 1
              ? (messagesEndRef as RefObject<HTMLDivElement>)
              : null
          }
          isLast={index === activeMessages.length - 1}
        />
      ))}
      </div>
      <MessageInput currentMessage={currentMessage} handleCurrentMessageChange={handleCurrentMessageChange}
              handleSend={handleSend}
            />
            </>
  );
};
