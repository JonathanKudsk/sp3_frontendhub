import { createContext, useState, useContext, useEffect } from "react";
import facade from "../apiFacade";

const AuthContext = createContext(null);

export const Auth = ({ children }) => {
  const [user, setUser] = useState({ username: "", roles: [] });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (facade.loggedIn()) {
      const [username, roles] = facade.getUserNameAndRoles();
      setUser({ username, roles });
      setIsLoggedIn(true);
    }
  }, []);

  const login = async (username, password) => {
    await facade.login(username, password);

    const [user, roles] = facade.getUserNameAndRoles();
    setUser({ username: user, roles: roles });
    setIsLoggedIn(true);
  };

  const logout = () => {
    facade.logout();
    setUser({ username: "", roles: [] });
    setIsLoggedIn(false);
  };

  const value = { user, isLoggedIn, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
