// libs 
import { v4 as uuid } from "uuid";

// types 
import { UserType,UsersType } from "../types";

export function checkUserExistance(username: string, password: string) {
    const stringifiedUsers = window.localStorage.getItem("Users")
    if (typeof stringifiedUsers === "string") {
        const users:UsersType = JSON.parse(stringifiedUsers)
        for (let user of Object.values(users)) {
        if (user.name === username && user.password === password) {
            return user;
        }
    }
    }
    return null;
}


export function addUserSession(user: UserType) {
    window.sessionStorage.setItem("CurrentUser", JSON.stringify(user));
}

export function removeUserSession() {
    window.sessionStorage.removeItem('CurrentUser');
}


export function registerUser(username: string, password: string) {
    const stringifiedUsers = window.localStorage.getItem("Users")
    if (typeof stringifiedUsers === "string") {
        const users: UsersType = JSON.parse(stringifiedUsers)
        const newUser = {
        id: uuid(),
        name: username,
        password: password,
        profilePicture: "https://picsum.photos/200",
        personalChats: [],
        groupChats:[]
    }
    users[newUser.id] = newUser; 
    window.localStorage.setItem("Users", JSON.stringify(users));
    return newUser
    }
    return null;
    
}