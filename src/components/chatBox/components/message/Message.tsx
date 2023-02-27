// libs 
import { useContext } from "react";
// context
import { UserContext } from "../../../../contexts/UserContext";
// styles
import styles from "./Message.module.css"
// types 
import { MessageProps } from "./types";


export const Message = ({ content, from }:MessageProps) => {
    const user = useContext(UserContext);
    return <div className={styles.wrapper}
        data-alignment={user?.id===from?.id?"right":"left"}
    >
        <div className={styles.sender}>{from?.name}</div>
        <div className={styles.content}>{content}</div>
    </div>
}
