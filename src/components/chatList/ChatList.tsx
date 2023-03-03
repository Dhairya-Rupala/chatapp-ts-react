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


type ChatListProps = {
    activeChatRoomId:string,
    onItemClick: (id:string)=>void
}


export const ChatList = ({ activeChatRoomId, onItemClick }: ChatListProps) => {
  const { user } = useUser();

  const friendList = useMemo(() => {
    if (user) {
      return getFriendsList(user);
    }
    return [];
  }, [user]);


  return (
    <div className={styles.wrapper}>
      {friendList.map((chat, index) => (
        <ChatListItem key={index} chat={chat} isActive={chat.chatRooms.includes(activeChatRoomId)} onItemClick={onItemClick} />
      ))}
    </div>
  );
};
