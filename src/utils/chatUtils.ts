// types
import {
  Message,
  User
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

export function resolveUser(userId:string,chatRoomId: string):string {
  const stringifiedUsers = window.localStorage.getItem("Users");
  if (stringifiedUsers) {
    const users = JSON.parse(stringifiedUsers);
    const friendId = getFriendIdFromChatRoomId(userId,chatRoomId);
    return users[friendId]?.name ?? "";
  }
  return "";
}


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

export function updateMessagesDB(chatRoomId: string, newMessage: Message): void {
  addMessageToChatRoom(newMessage.id, chatRoomId);
  addMessageToMessageRecords(newMessage);
}



export function fetchMessages(chatRoomId: string, cursor: { from?: string, upto?: string } | undefined, pageSize: number | undefined=undefined) {
  const stringifiedChatRoomRecord = window.localStorage.getItem("ChatRoomRecord");
  const stringifiedMessages = window.localStorage.getItem("Messages");

  if (stringifiedChatRoomRecord && stringifiedMessages) {
    const chatRoomRecord = JSON.parse(stringifiedChatRoomRecord);
    const messages = JSON.parse(stringifiedMessages);
    let messageIds = chatRoomRecord[chatRoomId].messages;
    
    // Initial fetch 
    if (!cursor && pageSize) {
      messageIds = messageIds.slice(Math.max(messageIds.length-pageSize,0))
      const activeMessages = messageIds.map((messageId: string) => messages[messageId]);
      return activeMessages;
    }

    // scrolling based fetching 
    if (cursor && cursor.from && pageSize) {
      const index = messageIds.findIndex((messageId: string) => messageId === cursor.from)
      messageIds = messageIds.slice(Math.max(index - pageSize, 0), index);
      const activeMessages = messageIds.map((messageId: string) => messages[messageId]);
      return activeMessages;
    }

    //polling 
    if (cursor && cursor.upto) {
      const index = messageIds.findIndex((messageId: string) => messageId === cursor.upto)
      messageIds = messageIds.slice(index + 1);
      const activeMessages = messageIds.map((messageId: string) => messages[messageId]);
      return activeMessages;
    }

  }
}


