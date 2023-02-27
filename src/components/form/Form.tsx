// libs 
import { useState, useCallback, ChangeEvent } from "react";
import { Link } from "react-router-dom";

// components 
import { Button } from "../button";

// styles 
import styles from "./Form.module.css";

// types 
import { FormProps } from "./types";

export const Form = ({title,footerMessage,route,onSubmit,error}:FormProps) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUsernameChange = useCallback((e:ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    }, [])

    const handlePasswordChange = useCallback((e:ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }, [])
    
    const handleSubmit = useCallback(() => {
        onSubmit(username,password);
    },[onSubmit, password, username])


    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>{title}</div>
            <div className={styles.body}>
                <div className={styles.fieldWrapper}>
                <div className={styles.label}>Username</div>
                <input className={styles.field} onChange={handleUsernameChange} value={username} />
            </div>
            <div className={styles.fieldWrapper}>
                <div className={styles.label}>Password</div>
                <input className={styles.field} onChange={handlePasswordChange} value={password} />
            </div>
            </div>
            {error ? <div className={styles.error}>{error}</div>:null}
            <div className={styles.footer}>
                <Button onClick={handleSubmit}>{title}</Button>
                <Link to={`/${route}`}>
                    <div className={styles.footerMessage}>{footerMessage}</div>
                </Link>
            </div>

        </div>
    )
}



