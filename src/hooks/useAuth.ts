// libs
import { useState, useCallback } from "react";

// utils
import {
  checkUserExistance,
  addUserSession,
  registerUser,
  removeUserSession,
} from "../utils/authUtils";

// types
import { AUTH_STATUS, AuthProcess } from "../types";

export const useAuth = () => {
  const [authProcess, setAuthProcess] = useState<AuthProcess>(() => {
    const stringifiedCurrentUser = window.sessionStorage.getItem("CurrentUser");
    if (stringifiedCurrentUser) {
      return {
        status: AUTH_STATUS.LOGIN_SUCCESS,
        user: JSON.parse(stringifiedCurrentUser),
        error: null,
      };
    }
    return {
      status: AUTH_STATUS.IDLE,
      user: null,
      error: null,
    };
  });

  const login = useCallback((username: string, password: string) => {
    try {
      setAuthProcess({
        status: AUTH_STATUS.LOGIN_START,
        user: null,
        error: null,
      });
      const currentUser = checkUserExistance(username, password);
      setAuthProcess({
        status: AUTH_STATUS.LOGIN_SUCCESS,
        user: currentUser,
        error: null,
      });
      addUserSession(currentUser);
    } catch (err) {
      setAuthProcess({
        status: AUTH_STATUS.LOGIN_FAIL,
        user: null,
        error: (err as Error).message,
      });
    }
  }, []);

  const signup = useCallback((username: string, password: string) => {
    try {
      setAuthProcess({
        status: AUTH_STATUS.SIGNUP_START,
        user: null,
        error: null,
      });
      registerUser(username, password);
      setAuthProcess({
        status: AUTH_STATUS.SIGNUP_SUCCESS,
        user: null,
        error: null,
      });
      window.location.replace("/login");
    } catch (err) {
      setAuthProcess({
        status: AUTH_STATUS.SIGNUP_FAIL,
        user: null,
        error: (err as Error).message,
      });
    }
  }, []);

  const logout = useCallback(() => {
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
    } catch (err) {
      setAuthProcess({
        ...authProcess,
        status: AUTH_STATUS.LOGOUT_FAIL,
        error: (err as Error).message,
      });
    }
  }, [authProcess]);

  const resetAuthState = useCallback(() => {
    setAuthProcess({
      status: AUTH_STATUS.IDLE,
      user: null,
      error: null,
    });
  }, []);

  return {
    authProcess,
    login,
    logout,
    signup,
    resetAuthState,
  };
};
