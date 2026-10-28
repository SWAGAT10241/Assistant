import { createContext } from "react";

/**
 * React Context definition for Authentication & User Session
 */
export const AuthContext = createContext(null);

/**
 * Backward-compatibility alias
 */
export const userDataContext = AuthContext;

export default AuthContext;
