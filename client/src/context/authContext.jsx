import axios from "axios";
import { createContext, useEffect, useState } from "react";

import { toast } from "react-toastify";

export const AuthContext = createContext();

const API = "https://team-task-manager-nine-chi.vercel.app/api";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("user");

    if (data) {
      setUser(JSON.parse(data));
    }
  }, []);

  const signup = async (formData) => {
    try {
      const res = await axios.post(
        `${API}/auth/signup`,
        formData
      );

      toast.success("Signup Successful");

      return res.data;
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Signup Failed"
      );
    }
  };

  // LOGIN
  const login = async (formData) => {
    try {
      const res = await axios.post(
        `${API}/auth/login`,
        formData
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      setUser(res.data.user);

      toast.success("Login Successful");

      return true;
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "User Not Found"
      );

      return false;
    }
  };

  // LOGOUT
  const logout = () => {
    localStorage.clear();

    setUser(null);

    toast.success("Logout Successful");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;