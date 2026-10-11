import React, { useState, useEffect, useCallback } from "react";
import { AuthContext } from "./authContextDef";
import authApi from "../api/auth.api";
import assistantApi from "../api/assistant.api";
import envConfig from "../config/env.config";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  // Assistant customization step state
  const [selectedImage, setSelectedImage] = useState(null);
  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);

  /**
   * Check if user has an active session on mount
   */
  const checkAuth = useCallback(async () => {
    try {
      setLoading(true);
      const currentUser = await authApi.getCurrentUser();
      setUser(currentUser);
      setAuthError(null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  /**
   * Log in user
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
   * Log out user
   */
  const logout = async () => {
    try {
      await authApi.logout();
    } catch (err) {
      console.warn("Logout error:", err.message);
    } finally {
      setUser(null);
      setSelectedImage(null);
      setFrontendImage(null);
      setBackendImage(null);
    }
  };

  /**
   * Update assistant configuration
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
   */
  const getGeminiResponse = async (command) => {
    return await assistantApi.askAssistant(command);
  };

  const contextValue = {
    user,
    setUser,
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
    // Customization state
    selectedImage,
    setSelectedImage,
    frontendImage,
    setFrontendImage,
    backendImage,
    setBackendImage,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
