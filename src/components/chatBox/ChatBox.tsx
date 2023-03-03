// libs 
import { useMemo } from "react";

// components
import {ChatBoxBody} from "./components/chatBoxBody"
import { EmptyState } from "./components/emptyState";
import { ChatBoxHeader } from "./components/chatBoxHeader";

// utils 
import { resolveUser } from "../../utils/chatUtils";

// styles 
import styles from "./ChatBox.module.css";

// types
import { ChatBoxProps } from "./types";
import { useUser } from "../../contexts/UserContext";


export const ChatBox = ({ activeChatRoomId, activeMessages, onAction }: ChatBoxProps) => {
  const { user } = useUser();
  const activeChatUserName = useMemo(
    () => {
      if (user) {
        return resolveUser(user.id,activeChatRoomId)
      }
      return "";
    },
    [activeChatRoomId, user]
  );


  return (
    <div className={styles.wrapper}>
      {activeChatRoomId ? <>
        <ChatBoxHeader activeChatUserName={activeChatUserName}/>
        <ChatBoxBody activeChatUserName={activeChatUserName} onAction={onAction} activeChatRoomId={activeChatRoomId} activeMessages={activeMessages} />
      </> : <EmptyState />}
    </div>
  );
};

