// libs
import { useState, useCallback } from "react";



export const useChatRoom = () => {
  const [activeChatRoomId, setActiveChatRoomId] = useState("");

  const changeActiveChatRoom = useCallback(
    (chatRoomId: string) => {
      setActiveChatRoomId(chatRoomId);
    },
    []
  );

  return {
    activeChatRoomId,
    changeActiveChatRoom,
  };
};