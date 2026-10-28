import React, { useState, useEffect, useCallback } from "react";
import { AuthContext } from "./authContextDef";
import authApi from "../api/auth.api";
import assistantApi from "../api/assistant.api";
import envConfig from "../config/env.config";

/**
 * Authentication and User Session Context Provider
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  /**
   * Check if user has an active session from server cookie
   */
  const checkAuth = useCallback(async () => {
    try {
      setLoading(true);
      const currentUser = await authApi.getCurrentUser();
      setUser(currentUser);
      setAuthError(null);
      return currentUser;
    } catch {
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial session check on application mount
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const currentUser = await authApi.getCurrentUser();
        if (isMounted) {
          setUser(currentUser);
          setAuthError(null);
        }
      } catch {
        if (isMounted) {
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  /**
   * Log in user
   * @param {{ email: string, password: string }} credentials
   */
  const login = async (credentials) => {
    try {
      setLoading(true);
      setAuthError(null);
      const data = await authApi.login(credentials);
      const loggedUser = data.user || data;
      setUser(loggedUser);
      return loggedUser;
    } catch (err) {
      setAuthError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Register new user
   * @param {{ name: string, email: string, password: string }} userData
   */
  const register = async (userData) => {
    try {
      setLoading(true);
      setAuthError(null);
      const data = await authApi.register(userData);
      const registeredUser = data.user || data;
      setUser(registeredUser);
      return registeredUser;
    } catch (err) {
      setAuthError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Log out user and clear user state
   */
  const logout = async () => {
    try {
      await authApi.logout();
    } catch (err) {
      console.warn("Logout error:", err.message);
    } finally {
      setUser(null);
      setAuthError(null);
    }
  };

  /**
   * Update assistant configuration (avatar and name)
   * @param {{ assistantName?: string, file?: File, imageUrl?: string }} config
   */
  const updateAssistantProfile = async ({ assistantName, file, imageUrl }) => {
    const updatedUser = await assistantApi.updateAssistant({
      assistantName,
      file,
      imageUrl,
    });
    setUser(updatedUser);
    return updatedUser;
  };

  /**
   * Query assistant AI command
   * @param {string} command
   */
  const getGeminiResponse = async (command) => {
    return await assistantApi.askAssistant(command);
  };

  /**
   * Update local user state safely
   */
  const updateUser = useCallback((updater) => {
    setUser((prev) => (typeof updater === "function" ? updater(prev) : { ...prev, ...updater }));
  }, []);

  const contextValue = {
    user,
    setUser,
    updateUser,
    isAuthenticated: Boolean(user),
    userData: user, // Alias for backward compatibility
    setUserData: setUser, // Alias for backward compatibility
    loading,
    authError,
    setAuthError,
    login,
    register,
    logout,
    checkAuth,
    updateAssistantProfile,
    getGeminiResponse,
    serverUrl: envConfig.API_BASE_URL,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
