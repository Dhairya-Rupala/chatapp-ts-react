// libs
import { RefObject } from "react";

// components
import { SingleMessage } from "./components/singleMessage";
import { MessageInput } from "./components/messageInput/MessageInput";

// hooks
import { useChatBoxActions } from "./hooks/useChatBoxActions";
import { useUser } from "../../../../contexts/UserContext";

// utils 
import { getFriendIdFromChatRoomId } from "../../../../utils/chatUtils";

// styles
import styles from "./ChatBoxBody.module.css";

// types 
import { ChatBoxBodyProps } from "./types";



export const ChatBoxBody = ({
  activeChatRoomId,
  activeMessages,
  activeChatUserName,
  onAction,
}: ChatBoxBodyProps) => {
  const { user } = useUser();
  const {
    currentMessage,
    handleCurrentMessageChange,
    handleSend,
    messagesEndRef,
    messageLoaderRef,
    messagesWrapperRef,
  } = useChatBoxActions(activeChatRoomId, onAction, user);

  return (
    <>
      <div
        id="ok"
        className={styles.chatWrapper}
        ref={messagesWrapperRef as RefObject<HTMLDivElement>}
      >
        {activeMessages?.map((message, index) => (
          <SingleMessage
            key={message.id}
            content={message.content}
            isLast={index === activeMessages.length - 1}
            creationDate={message.creationDate}
            timestamp={message.timestamp}
            from={
              message.from === user?.id
                ? { id: user?.id, name: user?.name }
                : {
                    id: (user?getFriendIdFromChatRoomId(user.id,activeChatRoomId):undefined),
                    name: activeChatUserName,
                  }
            }
            messageRef={
              index === 0
                ? (messageLoaderRef as RefObject<HTMLDivElement>)
                : index === activeMessages.length - 1
                ? (messagesEndRef as RefObject<HTMLDivElement>)
                : null
            }
          />
        ))}
  
      </div>
      <MessageInput
        currentMessage={currentMessage}
        handleCurrentMessageChange={handleCurrentMessageChange}
        handleSend={handleSend}
      />
    </>
  );
};
