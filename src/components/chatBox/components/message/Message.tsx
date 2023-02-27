// hooks
import { useUser } from "../../../../contexts/UserContext";

// styles
import styles from "./Message.module.css"

// types 
import { MessageProps } from "./types";


export const Message = ({ content, from }:MessageProps) => {
    const [user] = useUser();
    return <div className={styles.wrapper}
        data-alignment={user?.id===from?.id?"right":"left"}
    >
        <div className={styles.sender}>{from?.name}</div>
        <div className={styles.content}>{content}</div>
    </div>
}
