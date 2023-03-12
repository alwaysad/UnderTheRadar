import React, { useState } from "react";
import axios from "axios";
import { async } from "@firebase/util";
import newRequest from "../utils/makerequest";

const CommentContext = React.createContext({
  comments: [],
  usercomments: [],
  getComments: (businessId) => {},
  getUserComments: (userId) => {},
  isLoading: true,
  error: "",
});

export const CommentContextProvider = (props) => {
  const [comments, setComments] = useState([]);
  const [userComments, setUserComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const getCommentHandler = async (businessId) => {
    if (!businessId) {
      return;
    }
    try {
      setIsLoading(true);

      const response = await axios.get(
        `http://localhost:8800/api/comment/getcomments/${businessId}`
      );

      setComments(response.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(true);
    }
  };

  const getUserCommentHandler = async (userId) => {
    if (!userId) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await newRequest.get(
        `comment/getUsercomments/${userId}`
      );
      setUserComments(response.data);
      setIsLoading(false);
      console.log(response.data);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <CommentContext.Provider
      value={{
        comments: comments,
        getComments: getCommentHandler,
        getUserComments: getUserCommentHandler,
        isLoading: isLoading,
        error: error,
        usercomments: userComments,
      }}
    >
      {props.children}
    </CommentContext.Provider>
  );
};

export default CommentContext;
