// libs 
import { useState } from "react";
// styles
import styles from "./AddUserModal.module.css";
// types 
import { AddUserModalProps } from "../../types";

const AddUserModal = ({ addUser, setAddUser, onAction }:AddUserModalProps) => {
    const [username, setUsername] = useState("")
    const [id, setId] = useState(0);

    return <>
        <div className={styles.overlay} onClick={() => setAddUser(!addUser)}>
        </div>
        <div className={styles.adduser_form}>
            <div className={styles.field}>
              <span className={styles.label}>Id</span>
                <input type="number" placeholder="Enter the id" onChange={(e) => {
                    e.stopPropagation();
                    setId(+e.target.value)
              }}/>
            </div>
            <div className={styles.field}>
              <span className={styles.label}>Username</span>
                <input type="text" placeholder="Enter the username"
                    onChange={(e) => {
                        e.stopPropagation();
                        
                    setUsername(e.target.value)
                }}    
              />
            </div>
            <div className={styles.button_group}>
                <button disabled={!username || !id}
                    onClick={() => {
                        onAction({
                            type: "ADD_NEW_USER_CHAT",
                            payload: {
                                id,
                                username,
                            }
                        })
                        setAddUser(!addUser)
                    }}
                >Add</button>
                <button onClick={()=>setAddUser(!addUser)}>Close</button>
            </div>
            
        </div>
    </>
}

export default AddUserModal