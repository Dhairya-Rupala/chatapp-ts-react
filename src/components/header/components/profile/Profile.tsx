// hooks
import { useUser } from "../../../../contexts/UserContext";
// styles
import styles from "./Profile.module.css";

export const Profile = () => {
  const {user} = useUser();
  return (
    <div className={styles.wrapper}>
      <div className={styles.username}>{user?.name}</div>
      <div className={styles.profileAvatarWrapper}>
        <img
        src={user?.profilePicture}
        alt="profile"
        className={styles.profileAvatar}
      />
      </div>
    </div>
  );
};
