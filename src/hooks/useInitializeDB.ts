// libs
import { useEffect } from "react";

// data
import { Users, Messages, ChatRoomRecord } from "../dummy_data";


export const useInitializeDB = () => {
  useEffect(() => {
    if (!window.localStorage.getItem("Users"))
      window.localStorage.setItem("Users", JSON.stringify(Users));
    if (!window.localStorage.getItem("Messages"))
      window.localStorage.setItem("Messages", JSON.stringify(Messages));
    if (!window.localStorage.getItem("ChatRoomRecord"))
      window.localStorage.setItem(
        "ChatRoomRecord",
        JSON.stringify(ChatRoomRecord)
      );
  }, []);
};
