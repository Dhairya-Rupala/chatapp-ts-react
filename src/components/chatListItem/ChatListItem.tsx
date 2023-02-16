// styles
import styles from "./ChatListItem.module.css";
// types
import { ChatListItemProps } from "../../types";

const ChatListItem = ({ chat, currentChat, onAction }: ChatListItemProps) => {
  return (
    <div
      className={`${styles.wrapper} ${
        chat.id === currentChat ? styles.active : ""
      }`}
      onClick={(event) => {
        event.preventDefault();
        onAction({
          type: "CHANGE_CURRENT_CHAT",
          payload: chat.id,
        });
      }}
    >
      <img
        src={chat.profile_picture}
        alt="profile"
        className={styles.chatListItem_pic}
      />
      <div className={styles.chatListItem_content}>{chat.name}</div>
    </div>
  );
};

export default ChatListItem;
