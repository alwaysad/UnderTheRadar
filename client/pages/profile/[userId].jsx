import { useRouter } from "next/router";
import { Avatar } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState({});

  const { userId } = router.query;

  const getUser = async (userId) => {
    if (!userId) {
      return;
    }
    const response = await axios.get(
      `http://localhost:8800/api/user/getUser/${userId}`
    );
    setUser(response.data);
  };
  useEffect(() => {
    getUser(userId);
  }, [userId]);

  return (
    <div className="flex items-center min-h-screen flex-col mt-40">
    <Avatar src={user.img} sx={{ width:200, height: 200 }} />
    <div className="flex space-x-1 md:space-x-1">
    <span className="">{user.firstName}</span>
    <span className="">{user.lastName}</span>

    </div>
    <p>Birth Date: {new Date(user.birthDate).getDate()} {new Date(user.birthDate).toLocaleString('default', { month: 'long' })}</p>
    <p>{user.email}</p>
    </div>
  );
};

export default Profile;
