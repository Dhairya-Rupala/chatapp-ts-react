// libs 
import { ChangeEvent, KeyboardEvent,MouseEvent } from "react";

// components 
import { Button } from "../../../../../button";

// styles 
import styles from "./MessageInput.module.css";


type MessageInputProps = {
    currentMessage:string,
    handleCurrentMessageChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleMessageSend: (e: KeyboardEvent<HTMLInputElement> | MouseEvent<HTMLButtonElement>) => void;
}



export const MessageInput = ({ currentMessage,handleCurrentMessageChange,handleMessageSend }: MessageInputProps) => {

    return (
        <div className={styles.messageInputWrapper}>
        <input
          contentEditable
          className={styles.messageInput}
          placeholder="Type the message"
          onChange={handleCurrentMessageChange}
          onKeyDown={handleMessageSend}
          value={currentMessage}
        />
        <Button disabled={currentMessage.trim() === ""}
          onClick={handleMessageSend}
        >
          Send
        </Button>
      </div>
    )
}