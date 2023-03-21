import { Avatar } from "@mui/material";
import { useState, useEffect } from "react";
import Link from "next/link";
import newRequest from "../utils/makerequest";

const Follower = ({ id }) => {
  const [user, setUser] = useState({});

  const linkString = `/profile/${id._id.toString()}`;
  // const getUser = async () => {
  //   const response = await newRequest.get(`user/getUser/${id}`);
  //   setUser(response.data);
  // };

  // useEffect(() => {
  //   getUser();
  // }, []);

  return (
    <div>
      <Link href={linkString}>
        <Avatar src={id.img} sx={{ width: 50, height: 50 }} />
      </Link>
    </div>
  );
};

export default Follower;
