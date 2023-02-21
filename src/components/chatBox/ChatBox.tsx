// components
import Message from "../message/Message";
// styles 
import styles from "./ChatBox.module.css";
// hooks
import useChatBoxActions from "../../hooks/useChatBoxActions";
// types
import { ChatBoxProps } from "../../types";

const ChatBox = ({ currentChat, userChats, onAction }:ChatBoxProps) => {
  const { currentChatMessages, currentMessage, setCurrentMessage, onSend,messagesEndRef,enterPressHandler } = useChatBoxActions(
    userChats,
    currentChat,
    onAction
  );

  
  return (
    <div className={styles.wrapper}>
      <div className={styles.current_chat_name}>{ currentChatMessages?.name }</div>
      <div className={styles.chatWrapper}>
        {currentChatMessages?.messages?.map((message, index) => (
          <Message
            content={message.content}
            from={message.from}
            key={index}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className={styles.write_message}>
        <input
          contentEditable
          className={styles.chat_input}
          placeholder="Type the message"
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyDown={(e)=>enterPressHandler(e)}
          value={currentMessage}
        />
        <button disabled={currentMessage.trim() === ""}
          onClick={() => {
            onSend()
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
