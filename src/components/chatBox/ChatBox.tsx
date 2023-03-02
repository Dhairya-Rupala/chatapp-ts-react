// libs 
import { useMemo } from "react";

// components
import {ChatBoxBody} from "./components/chatBoxBody"
import { EmptyState } from "./components/emptyState";
import { ChatBoxHeader } from "./components/chatBoxHeader";

// utils 
import { getUserNameFromId } from "../../utils/chatUtils";

// styles 
import styles from "./ChatBox.module.css";

// types
import { ChatBoxProps } from "./types";


export const ChatBox = ({ activeChatId, activeMessages, onAction }: ChatBoxProps) => {

  const activeChatUserName = useMemo(
    () => getUserNameFromId(activeChatId),
    [activeChatId]
  );


  return (
    <div className={styles.wrapper}>
      {activeChatId ? <>
        <ChatBoxHeader activeChatUserName={activeChatUserName}/>
        <ChatBoxBody activeChatUserName={activeChatUserName} onAction={onAction} activeChatId={activeChatId} activeMessages={activeMessages} />
      </> : <EmptyState />}
    </div>
  );
};

