import { useRouter } from "next/router";
import { Avatar } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Follower from "../../components/followers";
import UserContext from "../../context/userContext";
import LoopIcon from "@mui/icons-material/Loop";
import AvatarGroup from "@mui/material/AvatarGroup";

const Profile = () => {
  const router = useRouter();
  const { userId } = router.query;
  const userCtx = useContext(UserContext);

  const followHandler = async () => {
    axios.defaults.withCredentials = true;
    await axios.put(`http://localhost:8800/api/user/follow/${userId}`);
    userCtx.userHandler(userId);
  };
  const unfollowHandler = async () => {
    axios.defaults.withCredentials = true;
    await axios.put(`http://localhost:8800/api/user/unfollow/${userId}`);
    userCtx.userHandler(userId);
  };

  useEffect(() => {
    userCtx.userHandler(userId);
  }, [userId]);

  return (
    <div>
      {userCtx.isLoading && (
        <div className="flex items-center justify-center min-h-screen ">
          <LoopIcon className="animate-spin" />
        </div>
      )}
      {!userCtx.isLoading && (
        <div className="flex items-center min-h-screen flex-col mt-40">
          <Avatar src={userCtx.user.img} sx={{ width: 200, height: 200 }} />
          <div className="flex space-x-1 md:space-x-1">
            <span className="">{userCtx.user.firstName}</span>
            <span className="">{userCtx.user.lastName}</span>
          </div>
          <p>
            Birth Date: {new Date(userCtx.user.birthDate).getDate()}{" "}
            {new Date(userCtx.user.birthDate).toLocaleString("default", {
              month: "long",
            })}
          </p>
          <p>{userCtx.user.email}</p>
          <div className="flex flex-col space-y-2 md:flex-row space-x-2 md:space-y-0">
            <button
              onClick={followHandler}
              className="bg-blue-400 text-white rounded-lg px-2 py-2 max-w-md"
            >
              Follow
            </button>
            <button
              onClick={unfollowHandler}
              className="bg-blue-400 text-white rounded-lg px-2 py-2 max-w-md "
            >
              Unfollow
            </button>
          </div>
          <div>
            <span>Followers:</span>
            <div className="flex ">
              {userCtx.user.followers &&
                userCtx.user.followers.map((follower) => (
                  <Follower key={follower} id={follower} />
                ))}
            </div>
          </div>
          <div>
            <span>Followings:</span>
            <div className="flex ">
              {userCtx.user.followings &&
                userCtx.user.followings.map((followings) => (
                  <Follower key={followings} id={followings} />
                ))}
            </div>
          </div>
          <div>Comments</div>
        </div>
      )}
    </div>
  );
};

export default Profile;
