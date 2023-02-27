import { ADD_NEW_USER_CHAT } from "./actionTypes";
import { onActionType } from "../../../../types";

export type AddUserModalProps = {
    isModalOpen: boolean,
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    onAction: onActionType
}

export type AddNewUser = {
    type: typeof ADD_NEW_USER_CHAT,
    payload: {
        username:string
    }
}