import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import Api from "./Api";

const ContextApi = createContext();

export const ContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setAdmin] = useState(null);

  const fetchToken = async () => {
    try {
      const savedToken = await SecureStore.getItemAsync("_token");
      setToken(savedToken ? savedToken : null);
    } catch (error) {
      console.error("Error fetching token:", error);
      setToken(null);
    } finally {
      setIsLoading(false); // Mark loading as complete
    }
  };

  const fetchAdmin = async () => {
    try {
      const savedAdmin = await SecureStore.getItemAsync("IS_ADMIN");
      setAdmin(savedAdmin ? savedAdmin : null);
    } catch (error) {
      console.error("Error fetching admin flag:", error);
      setAdmin(null);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      setIsLoading(true); // Start loading
      await fetchToken(); // Fetch token
      await fetchAdmin(); // Fetch admin
    };

    initialize();
  }, []);

  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token]);

  const fetchUser = async () => {
    try {
      const user = await SecureStore.getItemAsync("current_user");
      const parsedUser = user ? JSON.parse(user) : null;

      if (parsedUser?.username) {
        const { data } = await Api.get("/api/user/getuser");
        setCurrentUser(data);
      }
    } catch (error) {
      console.error("Error fetching user:", error.response?.data || error.message);
      setCurrentUser(null);
    }
  };

  return (
    <ContextApi.Provider
      value={{
        token,
        setToken,
        currentUser,
        setCurrentUser,
        isAdmin,
        setAdmin,
        isLoading,
      }}
    >
      {children}
    </ContextApi.Provider>
  );
};

export const useTimeCapsuleContext = () => {
  const context = useContext(ContextApi);
  if (!context) {
    throw new Error("useTimeCapsuleContext must be used within a ContextProvider");
  }
  return context;
};
