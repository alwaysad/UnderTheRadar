import { useState, useCallback, useEffect, useContext } from "react";

import axios from "axios";
import StarIcon from "@mui/icons-material/Star";
import { purple } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LoremIpsum } from "react-lorem-ipsum";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import DeleteIcon from "@mui/icons-material/Delete";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import EditIcon from "@mui/icons-material/Edit";
import AuthContext from "../context/authContext";

const SingleComment = ({
  text,
  userId,
  createdAt,
  rating,
  like,
  dislike,
  id,
}) => {
  const [user, setUser] = useState({});
  const [time, setTime] = useState("");
  const [isUser, setIsUser] = useState(false);
  const authCtx = useContext(AuthContext);

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
    await axios.put(`http://localhost:8800/api/comment/like/${id}`, {
      userId: authCtx.userId,
    });
    
  };

  const deleteComment = async () => {
    await axios.delete(`http://localhost:8800/api/comment/delete/${id}`, {
      userId: authCtx.userId,
    });
  };

  const editComment = async () => {
    await axios.delete(`http://localhost:8800/api/comment/edit/${id}`, {
      userId: authCtx.userId,
    });
  };

  const getFormattedDateDifference = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();

    const yearDiff = now.getFullYear() - date.getFullYear();
    const monthDiff = now.getMonth() - date.getMonth();
    const dayDiff = now.getDate() - date.getDate();
    const hourDiff = now.getHours() - date.getHours();
    const minuteDiff = now.getMinutes() - date.getMinutes();

    let formattedString = "";

    if (yearDiff > 0) {
      formattedString += `${yearDiff} year${yearDiff > 1 ? "s" : ""} `;
    }

    if (monthDiff > 0) {
      formattedString += `${monthDiff} month${monthDiff > 1 ? "s" : ""} `;
    }

    if (dayDiff > 0) {
      formattedString += `${dayDiff} day${dayDiff > 1 ? "s" : ""} `;
    }

    if (hourDiff > 0) {
      formattedString += `${hourDiff} hour${hourDiff > 1 ? "s" : ""} `;
    }

    if (minuteDiff > 0) {
      formattedString += `${minuteDiff} minute${minuteDiff > 1 ? "s" : ""} `;
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
        <LoremIpsum />
        {isUser && <DeleteIcon onClick={deleteComment} />}
        {isUser && <EditIcon onClick={editComment} />}
        <div className="flex items-center space-x-2 ">
          <ThumbUpIcon className="cursor-pointer" onClick={likeComment} />
          <div>{like}</div>
          <ThumbDownAltIcon className="cursor-pointer" /> <div>{dislike}</div>
        </div>

        <div className="border border-b-1"></div>
      </div>
    </ThemeProvider>
  );
};

export default SingleComment;
