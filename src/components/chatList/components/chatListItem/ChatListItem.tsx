// libs 
import { useCallback } from "react";
// hooks
import { useUser } from "../../../../contexts/UserContext";
// utils 
import { getChatRoomId } from "../../../../utils/chatUtils";
// styles
import styles from "./ChatListItem.module.css";
// types
import { User } from "../../../../types";



type ChatListItemProps = {
    chat: User,
    isActive:boolean,
    onItemClick: (id:string)=>void,
}


export const ChatListItem = ({ chat, isActive, onItemClick }: ChatListItemProps) => {

  const { user } = useUser();
  const handleChatListItemClick = useCallback(() => {
    if (user) {
      onItemClick(getChatRoomId(user.id, chat.id));
    }
  }, [chat.id, onItemClick, user])
  
  return (
    <div
      className={`${styles.wrapper} ${
        isActive ? styles.active : ""
      }`}
      onClick={handleChatListItemClick}
    >
      <img
        src={chat.profilePicture}
        alt="profile"
        className={styles.chatListItemAvatar}
      />
      <span>{chat.name}</span>
    </div>
  );
};

