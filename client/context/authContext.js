import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  userId: "",
  //   onLogout: () => {},
  //   onLogin: (email, password) => {}
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");

    if (storedUserId && storedIsLoggedIn) {
      setIsLoggedIn(true);
      setUserId(storedUserId);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setUserId("");
  };

  const loginHandler = (userId) => {
    setIsLoggedIn(true);
    setUserId(userId);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userId", userId);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
        userId: userId,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
