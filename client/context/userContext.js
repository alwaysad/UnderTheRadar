import React, { useState } from "react";
import axios from "axios";
import newRequest from "../utils/makerequest";
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
    console.log(userId);
    try {
      const response = await newRequest.get(`user/getUser/${userId}`);
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
