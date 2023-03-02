import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const SingleComment = ({ text, userId }) => {
  const [user, setUser] = useState({});
  const getUser = async () => {
    const response = await axios.get(
      `http://localhost:8800/api/user/getUser/${userId}`
    );
    setUser(response.data);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      {text}
      {user.firstName}
    </div>
  );
};

export default SingleComment;
