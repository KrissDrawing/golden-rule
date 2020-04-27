import React, { useEffect, useState } from "react";
import app,{db} from "./base.js";


export const AuthContext = React.createContext();

export const AuthProvider = ({ children, task }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    app.auth().onAuthStateChanged(setCurrentUser);
  }, []);


  return (
    <AuthContext.Provider
      value={{
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};