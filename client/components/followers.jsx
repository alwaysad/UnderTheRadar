import { Avatar } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";
import LoopIcon from "@mui/icons-material/Loop";
const Follower = ({ id }) => {
  const [user, setUser] = useState({});
  
  const linkString = `/profile/${id}`;
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
    
      <Link href={linkString}>
        <Avatar src={user.img} sx={{ width: 50, height: 50 }} />
      </Link>
    </div>
  );
};

export default Follower;
