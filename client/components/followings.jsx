import { Avatar } from "@mui/material";
import { useState, useEffect } from "react";
import newRequest from "../utils/makerequest";
const Followings = ({ id }) => {
  const [user, setUser] = useState({});
  const getUser = async () => {
    const response = await newRequest.get(
      `user/getUser/${id}`
    );
    setUser(response.data);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <Avatar src={user.img} sx={{ width: 50, height: 50 }} />
    </div>
  );
};

export default Followings;
