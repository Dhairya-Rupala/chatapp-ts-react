// types
import {
  Message,
  User,
  UsersRecord,
  MessagesRecord
} from "../types";

export function getFriendIdFromChatRoomId(
  userId: string,
  chatRoomId: string
):string {
  const friendId = chatRoomId
    .split("#")
    .filter((id) => id !== userId)[0];
  return friendId;
}

export function getChatRoomId(userId: string, friendId: string):string {
  const compositeKey = [userId, friendId];
  compositeKey.sort();
  return compositeKey.join("#");
}

export function getFriendsList(
  user:User
): User[] {
  
  const stringifiedUsers = window.localStorage.getItem("Users");
  if (stringifiedUsers) {
    const users = JSON.parse(stringifiedUsers);
      const friends = user.chatRooms.map((chatRoomId) => {
        const friendId = getFriendIdFromChatRoomId(
          user.id,
          chatRoomId
        );
        return users[friendId];
      });
      return friends ;
  }
  return [];
}

// export function getChatRoomMessages(chatRoomId) {
// export function getChatRoomMessages(userId: string, friendId: string) {
//   const stringifiedPersonalChats = window.localStorage.getItem("PersonalChats");
//   const stringifiedMessages = window.localStorage.getItem("Messages");

//   if (
//     stringifiedPersonalChats  &&
//     stringifiedMessages 
//   ) {
//     const chatRoomRecord: PersonalChatsType = JSON.parse(
//       stringifiedPersonalChats
//     );
//     const allMessages: MessagesType = JSON.parse(stringifiedMessages);
//     const chatRoomId = getChatRoomId(userId, friendId);
//     const messageIds = chatRoomRecord[chatRoomId].messages;
//     const activeMessages = messageIds.map(
//       (messageId) => allMessages[messageId]
//     );
//     return activeMessages;
//   }
//   return [];
// }

export function getChatRoomMessages(chatRoomId: string):Message[] {
  const stringifiedChatRoomRecord = window.localStorage.getItem("ChatRoomRecord");
  const stringifiedMessages = window.localStorage.getItem("Messages");

  if (stringifiedChatRoomRecord && stringifiedMessages) {
    const chatRoomRecord = JSON.parse(stringifiedChatRoomRecord);
    const allMessages = JSON.parse(stringifiedMessages);
    const messageIds = chatRoomRecord[chatRoomId].messages;
    const activeMessages = messageIds.map((messageId: string) => allMessages[messageId]);
    return activeMessages;
  }
  return [];
}

// @@DONE 
export function resolveUser(userId:string,chatRoomId: string):string {
  const stringifiedUsers = window.localStorage.getItem("Users");
  if (stringifiedUsers) {
    const users = JSON.parse(stringifiedUsers);
    const friendId = getFriendIdFromChatRoomId(userId,chatRoomId);
    return users[friendId]?.name ?? "";
  }
  return "";
}

// export function addMessageToChatRoom(messageId, chatRoomId)
// export function addMessageToMessageRecords(message)
// export function updateLocalStorage(
//   chatRoomId: string,
//   newMessage: MessageType
// ) {
//     const stringifiedPersonalChats = window.localStorage.getItem("PersonalChats");
//     const stringifiedMessages = window.localStorage.getItem("Messages");

//     //chatRoomId -> user1 user2
  
//     if (
//       typeof stringifiedMessages === "string" &&
//       typeof stringifiedPersonalChats === "string"
//     ) {
//       // const personalChatId = getChatRoomId(user.id, friendId);
//       const allMessages: MessagesType = JSON.parse(stringifiedMessages);
//       const personalChats: PersonalChatsType = JSON.parse(
//         stringifiedPersonalChats
//       );

//       allMessages[newMessage.id] = newMessage;
//       personalChats[personalChatId].messages.push(newMessage.id);

//       window.localStorage.setItem("Messages", JSON.stringify(allMessages));
//       window.localStorage.setItem(
//         "PersonalChats",
//         JSON.stringify(personalChats)
//       );
//     }
// }



// @@ DONE
export function addMessageToChatRoom(messageId: string, chatRoomId: string): void{
  const stringifiedChatRoomRecord = window.localStorage.getItem("ChatRoomRecord");
  if (stringifiedChatRoomRecord) {
    const chatRoomRecord = JSON.parse(stringifiedChatRoomRecord);
    const updatedChatRoomRecord = {
      ...chatRoomRecord,
      [chatRoomId]: {
        ...chatRoomRecord[chatRoomId],
        messages:[...chatRoomRecord[chatRoomId].messages,messageId]
      }
    }
    window.localStorage.setItem("ChatRoomRecord", JSON.stringify(updatedChatRoomRecord));
  }
}

// @@ DONE 
export function addMessageToMessageRecords(message: Message):void {
  const stringifiedMessages = window.localStorage.getItem("Messages");
  if (stringifiedMessages) {
    const allMessages = JSON.parse(stringifiedMessages);
    const updatedMessages = {
      ...allMessages,
      [message.id]:{
        ...message
      }
    }
    window.localStorage.setItem("Messages",JSON.stringify(updatedMessages));
  }
}

// @@ DONE 
export function updateMessagesDB(chatRoomId: string, newMessage: Message): void {
  addMessageToChatRoom(newMessage.id, chatRoomId);
  addMessageToMessageRecords(newMessage);
}




















// cursor based fetching messages 
// export function getPaginatedMessages(
// {userId, chatRoomId, cursor {from, upto}, pageSize}
export function getPartialActiveMessages(
  userId: string,
  chatRoomId: string,
  messageCount: number,
  alreadyFetched: number
) {
  const stringifiedPersonalChats = window.localStorage.getItem("ChatRoomRecord");
  const stringifiedMessages = window.localStorage.getItem("Messages");
  
  if (
    typeof stringifiedPersonalChats === "string" &&
    typeof stringifiedMessages === "string"
  ) {
    const personalChats = JSON.parse(
      stringifiedPersonalChats
    );
    const allMessages = JSON.parse(stringifiedMessages);

    // const compositeKey = getChatRoomId(userId, chatRoomId);
    const messageIds = personalChats[chatRoomId].messages;
    const activeMessages = messageIds.map(
      (messageId:string) => allMessages[messageId]
    );
      const end = Math.max(activeMessages.length - alreadyFetched, 0);
      const start = Math.max(0, end - messageCount);
    return { messages: activeMessages.slice(start, end), totalMessages: activeMessages.length };
  }
  return null;
}

//remove, only one query for fetching messages
// export function pollLocalStorageMessages(currentUserId: string, activeChatId: string, messagesCount:number) {
//   const stringifiedPersonalChats = window.localStorage.getItem("PersonalChats");
//   const stringifiedMessages = window.localStorage.getItem("Messages");

//   if (
//     typeof stringifiedPersonalChats === "string" &&
//     typeof stringifiedMessages === "string"
//   ) {
//     const personalChats = JSON.parse(
//       stringifiedPersonalChats
//     );
//     const allMessages = JSON.parse(stringifiedMessages);
//     const compositeKey = getChatRoomId(currentUserId, activeChatId);
//     const messageIds = personalChats[compositeKey].messages;
//     const activeMessages = messageIds.map(
//       (messageId:string) => allMessages[messageId]
//     );
//     const updatedMessageCount = activeMessages.length;
//     if (updatedMessageCount !== messagesCount) {
//       const latestMessages = activeMessages.slice(messagesCount, updatedMessageCount);
//       return {messages:latestMessages,totalMessages:updatedMessageCount}
//     }
//     return null;
//   }
//   return null;
// }




