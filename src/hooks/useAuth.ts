// libs 
import { useState, useCallback, useEffect } from "react"

// utils 
import { checkUserExistance,addUserSession,registerUser,removeUserSession } from "../utils/authUtils";

// types 
import { UserType,AuthActions } from "../types"

// actions 
import { LOGIN } from "../pages/Login/actionTypes";
import { SIGNUP } from "../pages/SignUp/actionTypes";
import { LOGOUT } from "../components/header/actionTypes";



export const useAuth = () => {
    const [user, setUser] = useState<UserType | null>(null);

    // onMount checking if the session is already there for user
    useEffect(() => {
        let stringifiedCurrentUser = window.sessionStorage.getItem("CurrentUser");
        if (typeof stringifiedCurrentUser === "string") {
            const currentUser:UserType = JSON.parse(stringifiedCurrentUser);
            if (currentUser) setUser(currentUser);
        }
    },[])

    const onAuthAction = useCallback((action:AuthActions) => {
        switch (action.type) {
            case LOGIN:
                const currentUser = checkUserExistance(action.payload.username, action.payload.password);
                if (currentUser) {
                    setUser(currentUser);
                    addUserSession(currentUser);
                    window.location.replace("/")
                }
                break;
            case SIGNUP:
                const username = action.payload.username
                const password = action.payload.password
                registerUser(username, password)
                window.location.replace("/login");
                break;
            case LOGOUT:
                removeUserSession();
                setUser(null);
                break;
            default:
                throw new Error("Unknown auth action")
        }
    }, [])
    
    return {
        user,
        onAuthAction
    }
}