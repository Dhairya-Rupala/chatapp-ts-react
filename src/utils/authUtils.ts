// libs
import { v4 as uuid } from "uuid";

// types
import { User } from "../types";

function checkEmptyField(field: string):boolean {
  return !!field.trim()
}

export function checkUserExistance(username: string, password: string):User {
  if (!checkEmptyField(username)) throw new Error("Username can not be empty");
  if (!checkEmptyField(password)) throw new Error("Password can not be empty");
  const stringifiedUsers = window.localStorage.getItem("Users");
  if (stringifiedUsers) {
    const users = JSON.parse(stringifiedUsers);
    const user = (Object.values(users) as User[]).find((user) => user.name === username && user.password === password)
    if (user) return user;
  }
  throw new Error("User does not exist, please check the credentials");
}

export function addUserSession(user: User):void {
  if (!checkEmptyField(user.name)) throw new Error("Username can not be empty");
  if (!checkEmptyField(user.password)) throw new Error("Password can not be empty");
  window.sessionStorage.setItem("CurrentUser", JSON.stringify(user));
}

export function removeUserSession():void {
  window.sessionStorage.removeItem("CurrentUser");
}

export function registerUser(username: string, password: string):void {
  if (!checkEmptyField(username)) throw new Error("Username can not be empty");
  if (!checkEmptyField(password)) throw new Error("Password can not be empty");
  const stringifiedUsers = window.localStorage.getItem("Users");
  if (stringifiedUsers) {
    const users = JSON.parse(stringifiedUsers);
    const newUser = {
      id: uuid(),
      name: username,
      password: password,
      profilePicture: "https://picsum.photos/200",
      personalChats: [],
      groupChats: [],
    };
    const updatedUsers = {...users, [newUser.id]: newUser}
    window.localStorage.setItem("Users", JSON.stringify(updatedUsers));
    return;
  }
    throw new Error("Failed to register the user");
  }
  
