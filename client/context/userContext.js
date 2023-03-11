import React, { useState } from "react";
import axios from "axios";
const UserContext = React.createContext({
  user: {},
  userHandler: (userId) => {},
  isLoading: true,
  error: "",
});

export const UserContextProvider = (props) => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const userHandler = async (userId) => {
    if (!userId) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8800/api/user/getUser/${userId}`
      );
      setUser(response.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(true);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user: user,
        userHandler: userHandler,
        isLoading: isLoading,
        error: error,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
export default UserContext;
