// components
import Message from "../message/Message";
// styles 
import styles from "./ChatBox.module.css";
// hooks
import useChatBoxActions from "../../hooks/useChatBoxActions";
// types
import { ChatBoxProps } from "../../types";

const ChatBox = ({ currentChat, userChats, onAction }:ChatBoxProps) => {
  const { currentChatMessages, currentMessage, setCurrentMessage, onSend,messagesEndRef } = useChatBoxActions(
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
          type="text"
          style={{
            width: "100%",
            height: "40px",
            borderRadius: "8px",
            border: "1px solid black",
            fontSize:"1.1rem"
          }}
          placeholder="Type the message"
          onChange={(e) => setCurrentMessage(e.target.value)}
          value={currentMessage}
        ></input>
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
