// types
import {
  MessagesType,
  MessageType,
  PersonalChatsType,
  UsersType,
  UserType,
} from "../types";

export function getFriendIdFromCompositeKey(
  currentUserId: string,
  personalChatId: string
) {
  const friendId = personalChatId
    .split("#")
    .filter((id) => id !== currentUserId)[0];
  return friendId;
}

export function getCompositeKey(currentUserId: string, friendId: string) {
  const compositeKey = [currentUserId, friendId];
  compositeKey.sort();
  return compositeKey.join("#");
}

export function getFriendsList(
  curentUserId: string,
  currentUserPersonalChats: string[]
) {
  const stringifiedUsers = window.localStorage.getItem("Users");
  if (typeof stringifiedUsers === "string") {
    const users: UsersType = JSON.parse(stringifiedUsers);
      const friends = currentUserPersonalChats.map((personalChatId) => {
        const friendId = getFriendIdFromCompositeKey(
          curentUserId,
          personalChatId
        );
        return users[friendId];
      });
      return friends;
  }
  return [];
}

export function getActiveMessages(currentUserId: string, activeChatId: string) {
  const stringifiedPersonalChats = window.localStorage.getItem("PersonalChats");
  const stringifiedMessages = window.localStorage.getItem("Messages");

  if (
    typeof stringifiedPersonalChats === "string" &&
    typeof stringifiedMessages === "string"
  ) {
    const personalChats: PersonalChatsType = JSON.parse(
      stringifiedPersonalChats
    );
    const messages: MessagesType = JSON.parse(stringifiedMessages);
    const compositeKey = getCompositeKey(currentUserId, activeChatId);
    const messageIds = personalChats[compositeKey].messages;
    const activeMessages = messageIds.map(
      (messageId) => messages[messageId]
    );
    return activeMessages;
  }
  return [];
}

export function getUserNameFromId(userId: string) {
  const stringifiedUsers = window.localStorage.getItem("Users");
  if (typeof stringifiedUsers === "string") {
    const users: UsersType = JSON.parse(stringifiedUsers);
    return users[userId]?.name || "";
  }
  return "";
}

export function updateLocalStorage(
  user: UserType,
  activeChatId: string,
  newMessage: MessageType
) {
    const stringifiedPersonalChats = window.localStorage.getItem("PersonalChats");
    const stringifiedMessages = window.localStorage.getItem("Messages");

    if (
      typeof stringifiedMessages === "string" &&
      typeof stringifiedPersonalChats === "string"
    ) {
      const personalChatId = getCompositeKey(user.id, activeChatId);
      const messages: MessagesType = JSON.parse(stringifiedMessages);
      const personalChats: PersonalChatsType = JSON.parse(
        stringifiedPersonalChats
      );

      messages[newMessage.id] = newMessage;
      personalChats[personalChatId].messages.push(newMessage.id);

      window.localStorage.setItem("Messages", JSON.stringify(messages));
      window.localStorage.setItem(
        "PersonalChats",
        JSON.stringify(personalChats)
      );
    }
}

export function pollLocalStorageMessages(
  user: UserType,
  activeChatId: string
) {
  return getActiveMessages(user.id, activeChatId);
}


export function getPartialActiveMessages(
  currentUserId: string,
  activeChatId: string,
  messageCount: number,
  alreadyFetched: number
) {
  const stringifiedPersonalChats = window.localStorage.getItem("PersonalChats");
  const stringifiedMessages = window.localStorage.getItem("Messages");

  if (
    typeof stringifiedPersonalChats === "string" &&
    typeof stringifiedMessages === "string"
  ) {
    const personalChats: PersonalChatsType = JSON.parse(
      stringifiedPersonalChats
    );
    const messages: MessagesType = JSON.parse(stringifiedMessages);

    const compositeKey = getCompositeKey(currentUserId, activeChatId);
    const messageIds = personalChats[compositeKey].messages;
    const activeMessages = messageIds.map(
      (messageId) => messages[messageId]
    );
      const end = Math.max(activeMessages.length - alreadyFetched, 0);
      const start = Math.max(0, end - messageCount);
      return activeMessages.slice(start, end);
  }
  return [];
}


