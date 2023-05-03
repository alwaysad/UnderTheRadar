import { useState, useCallback, useEffect, useContext } from "react";
import StarIcon from "@mui/icons-material/Star";
import { purple } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import DeleteIcon from "@mui/icons-material/Delete";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import EditIcon from "@mui/icons-material/Edit";
import AuthContext from "../context/authContext";
import BusinessContext from "../context/businessContext";
import CommentContext from "../context/commentContext";
import { Avatar } from "@mui/material";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import Link from "next/link";
import newRequest from "../utils/makerequest";
import getFormatDate from "../utils/formatDate";
import EditModal from "./editModal";
import Portal from "./modals/commentModal";

const SingleComment = ({
  text,
  userId,
  createdAt,
  rating,
  like,

  id,
  businessId,
}) => {
  const [user, setUser] = useState({});
  const [time, setTime] = useState("");
  const [open, setOpen] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [userReady, setUserReady] = useState(false);
  const authCtx = useContext(AuthContext);
  const commentCtx = useContext(CommentContext);
  const businessCtx = useContext(BusinessContext);

  const getUser = useCallback(async () => {
    const response = await newRequest.get(`user/getUser/${userId}`);
    if (!response) {
      console.log("mistake");
    }
    setUserReady(true);
    setUser(response.data);
  }, [userId]);

  const userVerification = useCallback(() => {
    if (!user._id) {
      return;
    }
    if (authCtx.userId === user._id.toString()) {
      setIsUser(true);
    } else {
      setIsUser(false);
    }
  }, [authCtx.userId, user._id]);

  useEffect(() => {
    getUser();
  }, [userId]);

  useEffect(() => {
    userVerification();
    getFormattedDateDifference(createdAt);
  }, [userVerification, createdAt]);

  const stars = Array.from({ length: rating }, (_, index) => (
    <StarIcon color="secondary" key={index} />
  ));
  const theme = createTheme({
    palette: {
      primary: {
        // Purple and green play nicely together.
        main: purple[500],
      },
      secondary: {
        // This is green.A700 as hex.
        main: "#ffa31a",
      },
    },
  });

  const likeComment = async () => {
    await newRequest.put(`comment/like/${id}`, {
      userId: authCtx.userId,
    });
    commentCtx.getComments(businessId);
  };

  const dislikeComment = async () => {
    await newRequest.put(`comment/dislike/${id}`, {
      userId: authCtx.userId,
    });
    commentCtx.getComments(businessId);
  };

  const deleteComment = async () => {
    await newRequest.delete(`comment/delete/${id}`, {
      data: {
        userId: authCtx.userId,
      },
    });
    businessCtx.businessHandler(businessId);
    commentCtx.getComments(businessId);
  };

  const openHandler = () => {
    setOpen(true);
  };
  const closeHandler = () => {
    setOpen(false);
  };

  const getFormattedDateDifference = (dateString) => {
    const formattedString = getFormatDate(dateString);
    setTime(formattedString);
  };

  return (
    <ThemeProvider theme={theme}>
      {!userReady && (
        <SkeletonTheme
          enableAnimation
          duration={1.5}
          baseColor="#5A5453"
          highlightColor="#444"
        >
          <div className="flex flex-col space-y-4 shadow-sm">
            <Skeleton
              containerClassName="flex-1"
              circle
              width={40}
              height={40}
            />
            <Skeleton containerClassName="flex-1" count={3} />
          </div>
        </SkeletonTheme>
      )}
      {userReady && (
        <div className="flex flex-col space-y-4 shadow-sm">
          <Link
            className="flex flex-col space-y-4"
            href={`/profile/${user._id}`}
          >
            <span className="font-bold"> {user.username}</span>
            <Avatar src={user.img} />
          </Link>
          <div className="flex justify-between">
            <div className="flex space-x-2">
              {stars}
              <div className="border border-l-1"></div>
              <span className="font-light"> {time}</span>
            </div>
            <div className="flex space-x-2">
              {isUser && (
                <DeleteIcon
                  className="cursor-pointer"
                  onClick={deleteComment}
                />
              )}
              {isUser && (
                <EditIcon className="cursor-pointer" onClick={openHandler} />
              )}
            </div>
          </div>
          {text}
          {open && (
            <Portal>
              <EditModal
                onClose={closeHandler}
                businessName={businessCtx.business.name}
                businessId={
                  businessCtx.business._id
                    ? businessCtx.business._id.toString()
                    : ""
                }
                comment={text}
                rating={rating}
                id={id}
              />
            </Portal>
          )}
          <div className="flex items-center space-x-2 ">
            <ThumbUpIcon className="cursor-pointer" onClick={likeComment} />
            <div>{like}</div>
            <ThumbDownAltIcon
              onClick={dislikeComment}
              className="cursor-pointer"
            />
          </div>
          <div className="border border-b-1"></div>
        </div>
      )}
    </ThemeProvider>
  );
};

export default SingleComment;
