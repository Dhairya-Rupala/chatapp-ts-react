// styles
import styles from "./ChatBoxHeader.module.css";

// types
type ChatBoxHeaderProps = {
  activeChatUserName: string;
};

export const ChatBoxHeader = ({ activeChatUserName }: ChatBoxHeaderProps) => {
  return <div className={styles.chatBoxHeader}>{activeChatUserName}</div>;
};
