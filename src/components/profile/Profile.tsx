// styles
import styles from "./Profile.module.css";
// context
import { UserContext } from "../../contexts/UserContext";
// libs 
import { useContext } from "react";

const Profile = () => {
  const user = useContext(UserContext);
  return (
    <div className={styles.wrapper}>
      <img
        src={user.profile_picture}
        alt="profile"
        className={styles.profile_pic}
      />
    </div>
  );
};

export default Profile;
