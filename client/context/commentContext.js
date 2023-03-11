import React, { useState } from "react";
import axios from "axios";

const CommentContext = React.createContext({
  comments: [],
  getComments: (businessId) => {},
  isLoading: true,
  error: "",
});

export const CommentContextProvider = (props) => {
  const [comments, setComments] = useState([]);
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

  return (
    <CommentContext.Provider
      value={{
        comments: comments,
        getComments: getCommentHandler,
        isLoading: isLoading,
        error: error,
      }}
    >
      {props.children}
    </CommentContext.Provider>
  );
};

export default CommentContext;
