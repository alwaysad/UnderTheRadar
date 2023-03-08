import React, { useState } from "react";
import axios from "axios";

const CommentContext = React.createContext({
  comments: [],
  getComments: (businessId) => {},
});

export const CommentContextProvider = (props) => {
  const [comments, setComments] = useState([]);

  const getCommentHandler = async (businessId) => {
    if (!businessId) {
      return;
    }
    const response = await axios.get(
      `http://localhost:8800/api/comment/getcomments/${businessId}`
    );
    setComments(response.data);
  };

  return (
    <CommentContext.Provider
      value={{ comments: comments, getComments: getCommentHandler }}
    >
      {props.children}
    </CommentContext.Provider>
  );
};

export default CommentContext;
