// components 
import {ChatListItem} from "./components/chatListItem";
// styles
import styles from "./ChatList.module.css";
// types 
import { ChatListProps } from "./types"; 

export const ChatList = ({ friendList, activeChatId, onAction }: ChatListProps) => {
  return (
    <div className={styles.wrapper}>
      {friendList?.map((chat, index) => (
        <ChatListItem key={index} chat={chat} isActive={activeChatId===chat?.id} onAction={onAction} />
      ))}
    </div>
  );
};
