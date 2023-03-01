// libs 
import { useEffect } from "react";



// hooks
import { useUser } from "../../../../contexts/UserContext";

// styles
import styles from "./Message.module.css"

// types 
import { MessageProps } from "./types";


export const Message = ({ isLast,content, from,messageRef }: MessageProps) => {
    const { user } = useUser();
    
    useEffect(() => {
        if (isLast) messageRef?.current?.scrollIntoView(false);
    }, [isLast, messageRef])
    
    return <div className={styles.wrapper}
        data-alignment={user?.id === from?.id ? "right" : "left"}
        ref={messageRef}
    >
        <div className={styles.sender}>{from?.name}</div>
        <div className={styles.content}>{content}</div>
    </div>
}
