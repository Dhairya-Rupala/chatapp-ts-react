// libs
import { useMemo } from "react";

// components 
import { ChatListItem } from "./components/chatListItem";

// hooks
import { useUser } from "../../contexts/UserContext";

// utils 
import { getFriendsList } from "../../utils/chatUtils";

// styles
import styles from "./ChatList.module.css";

// types 
import { ChatListProps } from "./types"; 


export const ChatList = ({ activeChatId, onAction }: ChatListProps) => {
  const { user } = useUser();

  const friendList = useMemo(() => {
    if (user) {
      return getFriendsList(user.id, user.personalChats);
    }
    return [];
  }, [user]);


  return (
    <div className={styles.wrapper}>
      {friendList.map((chat, index) => (
        <ChatListItem key={index} chat={chat} isActive={activeChatId===chat.id} onAction={onAction} />
      ))}
    </div>
  );
};
