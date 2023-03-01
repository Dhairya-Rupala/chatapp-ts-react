// styles
import styles from "./ChatListItem.module.css";
// types
import { ChatListItemProps } from "./types";
import { CHANGE_ACTIVE_CHAT } from "./actionTypes";

//TODO: acccept onCLick
export const ChatListItem = ({ chat, isActive, onAction }: ChatListItemProps) => {
  return (
    <div
      className={`${styles.wrapper} ${
        isActive ? styles.active : ""
      }`}
      onClick={() => {
        onAction({
          type: CHANGE_ACTIVE_CHAT,
          payload: chat?.id,
        });
      }}
    >
      <img
        src={chat?.profilePicture}
        alt="profile"
        className={styles.chatListItemAvatar}
      />
      <span>{chat?.name}</span>
    </div>
  );
};

