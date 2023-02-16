// components 
import ChatListItem from "../chatListItem/ChatListItem";
// styles
import styles from "./ChatList.module.css";
// types 
import { ChatListProps } from "../../types"; 

const ChatList = ({userChats,currentChat,onAction}:ChatListProps) => {
  return (
    <div className={styles.wrapper}>
      {userChats?.map((chat, index) => (
        <ChatListItem key={index} chat={chat} currentChat={currentChat} onAction={onAction} />
      ))}
    </div>
  );
};

export default ChatList;
