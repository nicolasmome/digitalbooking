/* eslint-disable no-unused-vars */
import { useState } from "react";
import AuthService from "../services/auth";

const useAuth = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const login = (userCredentials) => {
    setLoading(true);
    AuthService.loginWithEmailAndPassword(userCredentials)
      .then((resp) => {
        setUser(resp);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setErrors(error);
      });
  };

  return {
    user,
    loading,
    errors,
    login,
  };
};

export default useAuth;
