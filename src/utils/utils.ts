// types
import { MessagesType, MessageType, PersonalChatsType, UsersType, UserType } from "../types";


export function getFriendIdFromCompositeKey(currentUserId:string, personalChatId:string) {
    const friendId = personalChatId.split("#").filter((id) => id !== currentUserId)[0];
    return friendId;
}
 
export function getCompositeKey(currentUserId:string, friendId:string) {
    const compositeKey = [currentUserId, friendId];
    compositeKey.sort();
    return compositeKey.join("#");
}

export function getFriendsList(curentUserId: string, currentUserPersonalChats: string[]) {
    const users: UsersType = JSON.parse(window.localStorage.getItem("Users") || "{}")
    
    const friends = currentUserPersonalChats.map((personalChatId) => {
            const friendId = getFriendIdFromCompositeKey(curentUserId,personalChatId);
            return users?.[friendId];
    });
    return friends;
}

export function getActiveMessages(currentUserId: string, activeChatId: string) {
    const personalChats: PersonalChatsType = JSON.parse(window.localStorage.getItem("PersonalChats") || "{}");
    
    const messages: MessagesType = JSON.parse(window.localStorage.getItem("Messages") || "{}");
    
    const compositeKey = getCompositeKey(currentUserId, activeChatId);
    const messageIds = personalChats?.[compositeKey]?.messages;
    const activeMessages = messageIds?.map((messageId) => messages?.[messageId]);
    return activeMessages;
}


export function getUserNameFromId(userId: string) {
    const users:UsersType = JSON.parse(window.localStorage.getItem("Users") || "{}")
    return users?.[userId]?.name;
}


export function updateLocalStorage(user:UserType | undefined,activeChatId: string,newMessage: MessageType) {
    if (user) {
        const personalChatId = getCompositeKey(user.id, activeChatId);
    const messages: MessagesType = JSON.parse(window.localStorage.getItem("Messages") || "{}");
    
    const personalChats: PersonalChatsType = JSON.parse(window.localStorage.getItem("PersonalChats") || "{}");
    

    if (messages) {
        messages[newMessage.id] = newMessage;
    }
    if (personalChats) {
        personalChats[personalChatId].messages.push(newMessage.id);
    }

    // updating the storage
    window.localStorage.setItem("Messages", JSON.stringify(messages));
    window.localStorage.setItem("PersonalChats", JSON.stringify(personalChats));

    }
    
}

