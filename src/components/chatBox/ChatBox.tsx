// libs 
import { useMemo } from "react";

// components
import {ChatBoxBody} from "./components/chatBoxBody"
import { EmptyState } from "./components/emptyState";
import { ChatBoxHeader } from "./components/chatBoxHeader";

// hooks
import { useUser } from "../../contexts/UserContext";

// utils 
import { resolveUser } from "../../utils/chatUtils";

// styles 
import styles from "./ChatBox.module.css";



type ChatBoxProps = {
    activeChatRoomId: string,
}

export const ChatBox = ({ activeChatRoomId }: ChatBoxProps) => {
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
        <ChatBoxHeader activeChatUserName={activeChatUserName} />
        <ChatBoxBody activeChatUserName={activeChatUserName}  activeChatRoomId={activeChatRoomId}  />
      </> : <EmptyState />}
    </div>
  );
};

