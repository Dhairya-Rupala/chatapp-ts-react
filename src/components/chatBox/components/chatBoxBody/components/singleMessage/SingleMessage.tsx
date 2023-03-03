// libs
import { useEffect, RefObject } from "react";

// hooks
import { useUser } from "../../../../../../contexts/UserContext";

// styles
import styles from "./SingleMessage.module.css";

type SingleMessageProps = {
  content: string;
  creationDate: string,
  timestamp:string
  messageRef: RefObject<HTMLDivElement> | null;
  isLast: boolean;
  from: {
    id: string | undefined;
    name: string | undefined;
  };
};

export const SingleMessage = ({
  isLast,
  content,
  from,
  messageRef,
  creationDate,
  timestamp
}: SingleMessageProps) => {
  const { user } = useUser();

  // for scrolling behaviour 
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
