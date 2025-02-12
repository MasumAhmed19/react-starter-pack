/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import axios from "axios";



// Create AuthContext
export const AuthContext = createContext(null);

const API_URL = "https://eradicat-crimes-b8w4.onrender.com/accounts";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Register User (Signup)
  const createUser = async (userInfo) => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/register/`,userInfo);

      // Store user data after successful signup
      const userData = res.data;
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("userId", userData.id); // Store user ID in localStorage
      setUser(userData);

      return userData;
    } catch (error) {
      console.error("Registration Error:", error.response?.data);
      throw error;
    } finally {
      setLoading(false);
    }
  };

// Login User
const signIn = async (email, password) => {
  setLoading(true);
  try {
    const res = await axios.post(`${API_URL}/login/`, { email, password });
    // Store user data after login
    const userID = res.data.user_id;

    console.log(userID)
    try{
      const userFullInfo = await axios.get(`${API_URL}/accounts/profile/${userID}`);
      setUser(userFullInfo);
      // localStorage.setItem("user", JSON.stringify(userFullInfo));
      // localStorage.setItem("userId", userID); // Store user ID in localStorage

    }catch(err){
      console.log("user info save hoitese na-->", err)
    }

    

  } catch (error) {
    console.error("Login Error:", error.response?.data);
    console.error("Error Details:", {
      status: error.response?.status,
      message: error.response?.data?.detail || 'Login failed',
      headers: error.response?.headers
    });
    throw error;
  } finally {
    setLoading(false);
  }
};



  // Logout User
  const logOut = async () => {
    setLoading(true);
    try {
      await axios.post(`${API_URL}/logout/`);

      // Clear user data from localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("userId");
      setUser(null);
    } catch (error) {
      console.error("Logout Error:", error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  // Fetch User Profile (Optional)
  const fetchUser = async () => {
    setLoading(true);
    try {
      const userId = localStorage.getItem("id");
      if (userId) {
        const res = await axios.get(`${API_URL}/profile/${userId}`, { withCredentials: true });
        setUser(res.data);
      } else {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
          setUser(storedUser);
        }
      }
    } catch (error) {
      console.error("Profile Fetch Error:", error.response?.data);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Check Authentication Status on Mount
  useEffect(() => {
    fetchUser();
  }, []);

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    signIn,
    logOut,
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
