// hooks
import { useUser } from "../../../../contexts/UserContext";
// styles
import styles from "./Profile.module.css";

export const Profile = () => {
  const user = useUser();
  return (
    <div className={styles.wrapper}>
      <img
        src={user?.profilePicture}
        alt="profile"
        className={styles.profileAvatar}
      />
    </div>
  );
};
