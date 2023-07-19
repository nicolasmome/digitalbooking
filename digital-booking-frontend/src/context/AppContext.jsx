/* eslint-disable react/prop-types */
import { createContext, useEffect, useContext, useReducer } from "react";
import { appReducer } from "../reducer/appReducer";
import { actionTypes } from "../reducer/actionTypes";

export const initialState = {
  theme: "light",
  loading: false,
  errors: null,
  user: JSON.parse(localStorage.getItem("user")) || null,
};

export const AppContext = createContext();

export const ContextProvider = ({ children }) => {
  const [appState, dispatch] = useReducer(appReducer, initialState);

  const login = (userInfo) => {
    dispatch({
      type: actionTypes.LOGIN,
      payload: userInfo,
    });
  };

  const logout = () => {
    dispatch({
      type: actionTypes.LOGOUT,
    });
    localStorage.removeItem("user");
  };

  const setAppTheme = (theme) => {
    dispatch({
      type: actionTypes.SET_APP_THEME,
      payload: theme,
    });
  };

  const setLoading = (loading) => {
    dispatch({
      type: actionTypes.SET_LOADING,
      payload: loading,
    });
  };

  const setErrors = (errors) => {
    dispatch({
      type: actionTypes.SET_ERRORS,
      payload: errors,
    });
  };

  const setData = (data) => {
    dispatch({
      type: actionTypes.SET_DATA,
      payload: data,
    });
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(appState.user));
  }, [appState.user]);

  const value = {
    ...appState,
    login,
    logout,
    setAppTheme,
    setLoading,
    setErrors,
    setData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("Context Error");
  }
  return context;
};
