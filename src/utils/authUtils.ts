// libs 
import { v4 as uuid } from "uuid";

// types 
import { UserType, UsersType } from "../types";

function checkEmptyFailed(field: string) {
    if (field.trim() === "") return false;
    return true;
}



export function checkUserExistance(username: string, password: string) {
    if(!checkEmptyFailed(username)) throw new Error("Username can not be empty")
    if(!checkEmptyFailed(password)) throw new Error("Password can not be empty")
    const stringifiedUsers = window.localStorage.getItem("Users")
    if (typeof stringifiedUsers === "string") {
        const users:UsersType = JSON.parse(stringifiedUsers)
        for (let user of Object.values(users)) {
        if (user.name === username && user.password === password) {
            return user;
        }
    }
    }
    throw new Error("User does not exist, please check the credentials")
}


export function addUserSession(user: UserType) {
    if (!checkEmptyFailed(user.name)) throw new Error("Username can not be empty")
    if(!checkEmptyFailed(user.password)) throw new Error("Password can not be empty")
    window.sessionStorage.setItem("CurrentUser", JSON.stringify(user));
}

export function removeUserSession() {
    window.sessionStorage.removeItem('CurrentUser');
}


export function registerUser(username: string, password: string) {
    if (!checkEmptyFailed(username)) throw new Error("Username can not be empty")
    if(!checkEmptyFailed(password)) throw new Error("Password can not be empty")
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
    throw new Error("Failed to register the user")
    
}