// libs 
import { useCallback, ChangeEvent, KeyboardEvent } from "react";

// components 
import { Button } from "../../../../../button";

// styles 
import styles from "./MessageInput.module.css";

// types 
type MessageInputProps = {
    currentMessage:string,
    handleCurrentMessageChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleSend: (e: KeyboardEvent<Element> | MouseEvent) => void;
}



export const MessageInput = ({ currentMessage,handleCurrentMessageChange,handleSend }: MessageInputProps) => {

    return (
        <div className={styles.messageInputWrapper}>
        <input
          contentEditable
          className={styles.messageInput}
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
      </div>
    )
}