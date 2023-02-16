// styles
import styles from "./Header.module.css";
// components
import Profile from "../profile/Profile";
import AddUserModal from "../addUserModal/AddUserModal";
// libs
import { useState } from "react";
// types 
import { HeaderProps } from "../../types";

const Header = ({onAction}:HeaderProps) => {
  const [addUser, setAddUser] = useState(false);

  return (
    <>
      <div className={styles.wrapper}>
        <span className={styles.title}>Chat App</span>
        <button
          onClick={() => {
            setAddUser(!addUser);
          }}
          className={styles.adduser_btn}
        >
          Add User
        </button>
        <Profile />
      </div>
      {addUser ? (
        <AddUserModal addUser={addUser} setAddUser={setAddUser} onAction={onAction} />
      ) : null}
    </>
  );
};

export default Header;
