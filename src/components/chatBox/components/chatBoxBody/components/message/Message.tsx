// libs
import { useEffect, RefObject } from "react";

// hooks
import { useUser } from "../../../../../../contexts/UserContext";

// styles
import styles from "./Message.module.css";

type MessageProps = {
  content: string;
  from: {
    id: string | null;
    name: string | null;
  };
  creationDate: string,
  timestamp:string
  messageRef: RefObject<HTMLDivElement> | null;
  isLast: boolean;
};

export const Message = ({
  isLast,
  content,
  from,
  messageRef,
  creationDate,
  timestamp
}: MessageProps) => {
  const { user } = useUser();

  useEffect(() => {
    if (isLast) messageRef?.current?.scrollIntoView(false);
  }, [isLast, messageRef]);

  return (
    <div
      className={styles.wrapper}
      data-alignment={user?.id === from?.id ? "right" : "left"}
      ref={messageRef}
    >
          <div className={styles.messageHeader}>
              <span className={styles.sender}>{from?.name}</span>
              <span className={styles.creationDetailsWrapper}
                  data-color={user?.id === from?.id ? "offwhite" : "grey"}
              >
                  <span className={styles.creationDetails}>{creationDate}</span>
                  <span className={styles.creationDetails}>{timestamp}</span>
              </span>
              
      </div>
      <div className={styles.content}>{content}</div>
    </div>
  );
};
