// // libs
// import { useState } from "react"
// import { v4 as uuidv4 } from "uuid";
// // data
// import { user_chats } from "../dummy_data";
// // types 
// import { UserChat,ChatActions } from "../types";
// import { ADD_NEW_USER_CHAT } from '../components/header/actionTypes'
// import { CHANGE_ACTIVE_CHAT } from "../components/chatList/actionTypes";
// import { SEND_MESSAGE } from "../components/chatBox/actionTypes";





// export const useChatActions = () => {
//     const [userChats, setUserChats] = useState<UserChat[]>(user_chats);
//     const [activeChat, setActiveChat] = useState("2");


//     const onAction = (action:ChatActions) => {
//         switch (action.type) {
//             case SEND_MESSAGE:
//                 let updatedUserChats = [...userChats].map((chat) => {
//                     if (chat.id !== activeChat) return chat;
//                     let updatedCurrentChat = {
//                         ...chat,
//                         messages: [
//                             ...chat.messages,
//                             action.payload
//                         ]
//                     }
//                     return updatedCurrentChat
//                 })
//                 setUserChats(updatedUserChats)
//                 break;
//             case CHANGE_ACTIVE_CHAT:
//                 setActiveChat(action.payload)
//                 break;
//             case ADD_NEW_USER_CHAT: 
//                 const newUserId = uuidv4();
//                 setUserChats([
//                     ...userChats,
//                     {
//                         id: newUserId,
//                         name: action.payload.username,
//                         profilePicture: "https://picsum.photos/200",
//                         messages: []
//                     }
//                 ])
//                 setActiveChat(newUserId);
//                 break;
//             default:
//                 throw new Error("Invalid Action")
//         }
//     }
 
//     return {
//         onAction,
//         userChats,
//         activeChat,
//     }
// }