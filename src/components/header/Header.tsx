// components
import { Profile } from "./components/profile";
import { Button } from "../button";

// hooks
import { useAuthActions } from "../../contexts/AuthActionsContext";

// styles
import styles from "./Header.module.css";


export const Header = () => {
  const {logout} = useAuthActions()
  return (
    <>
      <div className={styles.wrapper}>
        <span className={styles.title}>Chat App</span>
        <Button
          onClick={logout}
        >
         Log Out
        </Button>
        <Profile />
      </div>
    </>
  );
};
