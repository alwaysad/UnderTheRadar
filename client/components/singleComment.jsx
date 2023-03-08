import { useState, useCallback, useEffect, useContext } from "react";

import axios from "axios";
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

const SingleComment = ({
  text,
  userId,
  createdAt,
  rating,
  like,
  dislike,
  id,
  businessId,
}) => {
  const [user, setUser] = useState({});
  const [time, setTime] = useState("");
  const [isUser, setIsUser] = useState(false);
  const authCtx = useContext(AuthContext);
  const commentCtx = useContext(CommentContext);
  const businessCtx = useContext(BusinessContext);

  const getUser = useCallback(async () => {
    const response = await axios.get(
      `http://localhost:8800/api/user/getUser/${userId}`
    );
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
  }, [getUser]);

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
    axios.defaults.withCredentials = true;
    await axios.put(`http://localhost:8800/api/comment/like/${id}`, {
      userId: authCtx.userId,
    });
    commentCtx.getComments(businessId);
  };

  const deleteComment = async () => {
    axios.defaults.withCredentials = true;

    await axios.delete(`http://localhost:8800/api/comment/delete/${id}`, {
      data: {
        userId: authCtx.userId,
      },
    });
    businessCtx.businessHandler(businessId);
  };

  const editComment = async () => {
    axios.defaults.withCredentials = true;
    await axios.delete(`http://localhost:8800/api/comment/edit/${id}`, {
      data: {
        userId: authCtx.userId,
      },
    });
  };

  const getFormattedDateDifference = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();

    const timeDiffInMs = now.getTime() - date.getTime();
    const timeDiffInMinutes = Math.round(timeDiffInMs / (1000 * 60));
    const timeDiffInHours = Math.round(timeDiffInMs / (1000 * 60 * 60));
    const timeDiffInDays = Math.round(timeDiffInMs / (1000 * 60 * 60 * 24));

    let formattedString = "";

    if (timeDiffInDays >= 1) {
      formattedString += `${timeDiffInDays} day${
        timeDiffInDays > 1 ? "s" : ""
      } `;
    } else if (timeDiffInHours >= 1) {
      formattedString += `${timeDiffInHours} hour${
        timeDiffInHours > 1 ? "s" : ""
      } `;
    } else if (timeDiffInMinutes > 0) {
      formattedString += `${timeDiffInMinutes} minute${
        timeDiffInMinutes > 1 ? "s" : ""
      } `;
    } else {
      formattedString = "just now";
    }

    setTime(formattedString);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="flex flex-col space-y-4">
        <span className="font-bold"> {user.username}</span>
        <div className="flex space-x-2">
          {stars}
          <div className="border border-l-1"></div>
          <span className="font-light"> {time}</span>
        </div>
        {text}{" "}
        {isUser && (
          <DeleteIcon className="cursor-pointer" onClick={deleteComment} />
        )}
        {isUser && (
          <EditIcon className="cursor-pointer" onClick={editComment} />
        )}
        <div className="flex items-center space-x-2 ">
          <ThumbUpIcon className="cursor-pointer" onClick={likeComment} />
          <div>{like}</div>
          <ThumbDownAltIcon className="cursor-pointer" />
        </div>
        <div className="border border-b-1"></div>
      </div>
    </ThemeProvider>
  );
};

export default SingleComment;
