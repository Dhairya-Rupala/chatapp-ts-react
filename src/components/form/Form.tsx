// libs 
import { useState, useCallback, ChangeEvent } from "react";

// components 
import { Button } from "../button";

// styles 
import styles from "./Form.module.css";

// types 
import { FormProps } from "./types";

export const Form = ({title,footerMessage,onSubmit}:FormProps) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onUsernameChange = useCallback((e:ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    }, [])

    const onPasswordChange = useCallback((e:ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }, [])
    
    const onButtonClick = useCallback(() => {
        onSubmit();
    },[onSubmit])


    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>{title}</div>
            <div className={styles.body}>
                <div className={styles.fieldWrapper}>
                <div className={styles.label}>Username</div>
                <input className={styles.field} onChange={onUsernameChange} value={username} />
            </div>
            <div className={styles.fieldWrapper}>
                <div className={styles.label}>Password</div>
                <input className={styles.field} onChange={onPasswordChange} value={password} />
            </div>
            </div>
            <div className={styles.footer}>
                <Button onClick={onButtonClick}>{title}</Button>
                <div className={styles.footerMessage}>{footerMessage}</div>
            </div>

        </div>
    )
}



