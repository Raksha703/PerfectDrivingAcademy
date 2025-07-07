import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`${BACKEND_BASE_URL}/user/auth`, { withCredentials: true })
      .then((res) => {
        setUser(res.data)}
      )
      .catch(() => setUser(null));
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
