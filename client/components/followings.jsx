import { Avatar } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
const Followings = ({ id }) => {
  const [user, setUser] = useState({});
  const getUser = async () => {
    const response = await axios.get(
      `http://localhost:8800/api/user/getUser/${id}`
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
