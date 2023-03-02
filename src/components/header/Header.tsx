// libs
import { useCallback } from "react";
// components
import { Profile } from "./components/profile";
import { Button } from "../button";
// styles
import styles from "./Header.module.css";
// types 
import { HeaderProps } from "./types";
import { LOGOUT } from "./actionTypes";

export const Header = ({ onAuthAction }: HeaderProps) => {

  const handleLogOut = useCallback(() => {
    onAuthAction({
      type: LOGOUT,
      payload:null,
      })
  },[onAuthAction])

  return (
    <>
      <div className={styles.wrapper}>
        <span className={styles.title}>Chat App</span>
        <Button
          onClick={handleLogOut}
        >
         Log Out
        </Button>
        <Profile />
      </div>
    </>
  );
};
