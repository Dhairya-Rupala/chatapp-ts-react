// libs
import { useCallback, useState } from "react";
// components
import { Profile } from "./components/profile";
import { AddUserModal } from "./components/addUserModal";
import { Button } from "../button";
// styles
import styles from "./Header.module.css";
// types 
import { HeaderProps } from "./types";

export const Header = ({ onAction }: HeaderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddUserClick = useCallback(() => {
    setIsModalOpen(!isModalOpen);
  },[isModalOpen])

  return (
    <>
      <div className={styles.wrapper}>
        <span className={styles.title}>Chat App</span>
        <Button
          onClick={handleAddUserClick}
        >
          Add User
        </Button>
        <Profile />
      </div>
        <AddUserModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} onAction={onAction} />
    </>
  );
};
