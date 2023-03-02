// libs
import { useState, useCallback, useEffect } from "react";

// utils
import {
  checkUserExistance,
  addUserSession,
  registerUser,
  removeUserSession,
} from "../utils/authUtils";

// types
import { UserType, AuthActions,AUTH_STATUS,AuthProcessType } from "../types";

// actions
import { LOGIN } from "../pages/Login/actionTypes";
import { SIGNUP } from "../pages/SignUp/actionTypes";
import { LOGOUT } from "../components/header/actionTypes";
import { RESET_AUTH_STATE } from "../components/form/actionTypes";



export const useAuth = () => {
  const [authProcess, setAuthProcess] = useState<AuthProcessType>({
    status: AUTH_STATUS.IDLE,
    user: null,
    error: null,
  });

  // onMount checking if the session is already there for user
  useEffect(() => {
    let stringifiedCurrentUser = window.sessionStorage.getItem("CurrentUser");
    if (typeof stringifiedCurrentUser === "string") {
      const currentUser: UserType = JSON.parse(stringifiedCurrentUser);
        setAuthProcess({
          status: AUTH_STATUS.LOGIN_SUCCESS,
          user: currentUser,
          error: null,
        });
      }
  }, []);

  const handleLogin = useCallback(
    (username: string, password: string) => {
      try {
        setAuthProcess({
          status: AUTH_STATUS.LOGIN_START,
          user: null,
          error: null,
        });
        const currentUser = checkUserExistance(username, password);
          setAuthProcess({
            ...authProcess,
            status: AUTH_STATUS.LOGIN_SUCCESS,
            user: currentUser,
          });
          addUserSession(currentUser);
          window.location.replace("/");
      } catch (err) {
        setAuthProcess({
          status: AUTH_STATUS.LOGIN_FAIL,
          user: null,
          error: (err as Error).message,
        });
      }
    },
    [authProcess]
  );

  const handleSignup = useCallback(
    (username: string, password: string) => {
      try {
        setAuthProcess({
          status: AUTH_STATUS.SIGNUP_START,
          user: null,
          error: null,
        });
        registerUser(username, password);
        setAuthProcess({ ...authProcess, status: AUTH_STATUS.SIGNUP_SUCCESS });
        window.location.replace("/login");
      } catch(err) {
        setAuthProcess({
          ...authProcess,
          status: AUTH_STATUS.SIGNUP_FAIL,
          error: (err as Error).message,
        });
      }
    },
    [authProcess]
  );

  const handleLogout = useCallback(() => {
    try {
      setAuthProcess({
        status: AUTH_STATUS.LOGOUT_START,
        user: null,
        error: null,
      });
      removeUserSession();
      setAuthProcess({
        status: AUTH_STATUS.LOGOUT_SUCCESS,
        user: null,
        error: null,
      });
    } catch(err) {
      setAuthProcess({
        ...authProcess,
        status: AUTH_STATUS.LOGOUT_FAIL,
        error: (err as Error).message,
      });
    }
  }, [authProcess]);
    
    const handleStateReset = useCallback(() => {
        setAuthProcess({
            status: AUTH_STATUS.IDLE,
            user: null,
            error:null
        })
    },[])

  const onAuthAction = useCallback(
    (action: AuthActions) => {
      switch (action.type) {
        case LOGIN:
          handleLogin(action.payload.username, action.payload.password);
          break;
        case SIGNUP:
          handleSignup(action.payload.username, action.payload.password);
          break;
        case LOGOUT:
          handleLogout();
            break;
          case RESET_AUTH_STATE:
            handleStateReset()
            break;
        default:
          throw new Error("Unknown auth action");
      }
    },
    [handleLogin, handleLogout, handleSignup, handleStateReset]
  );

  return {
    authProcess,
    onAuthAction,
  };
};
