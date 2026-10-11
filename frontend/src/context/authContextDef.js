import { createContext } from "react";

export const AuthContext = createContext(null);
export const userDataContext = AuthContext; // Backward-compatibility alias
