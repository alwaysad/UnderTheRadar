import { createTheme, ThemeProvider } from "@mui/material/styles";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import DeleteIcon from "@mui/icons-material/Delete";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import EditIcon from "@mui/icons-material/Edit";
import { Avatar } from "@mui/material";
import { purple } from "@mui/material/colors";
import UserContext from "../context/userContext";
import { useContext, useState, useEffect, useCallback } from "react";
import CommentContext from "../context/commentContext";
import StarIcon from "@mui/icons-material/Star";
import AuthContext from "../context/authContext";
import newRequest from "../utils/makerequest";
import getFormatDate from "../utils/formatDate";
import BusinessContext from "../context/businessContext";
const UserProfileComment = ({ comment }) => {
  const [time, setTime] = useState("");
  const [isUser, setIsUser] = useState(false);
  const userCtx = useContext(UserContext);
  const commentCtx = useContext(CommentContext);
  const authCtx = useContext(AuthContext);
  const businessCtx = useContext(BusinessContext);
  const [business, setBusiness] = useState({});
  const likeComment = async () => {
    await newRequest.put(`comment/like/${comment._id}`, {
      userId: authCtx.userId,
    });
    commentCtx.getUserComments(userCtx.user._id);
    businessCtx.businessHandler(comment.business);
  };

  const deleteComment = async () => {
    await newRequest.delete(`comment/delete/${comment._id}`, {
      data: {
        userId: authCtx.userId,
      },
    });
    businessCtx.businessHandler(comment.business);
    commentCtx.getUserComments(userCtx.user._id); //businessId eklenecek
  };

  const editComment = async () => {
    await newRequest.delete(`comment/edit/${comment._id}`, {
      data: {
        userId: authCtx.userId,
      },
    });
  };

  const getFormattedDateDifference = (dateString) => {
    const formattedString = getFormatDate(dateString);

    setTime(formattedString);
  };

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
  const stars = Array.from({ length: comment.rating }, (_, index) => (
    <StarIcon color="secondary" key={index} />
  ));
  const userVerification = useCallback(() => {
    if (!userCtx.user._id) {
      return;
    }
    if (authCtx.userId === userCtx.user._id.toString()) {
      setIsUser(true);
    } else {
      setIsUser(false);
    }
  }, [authCtx.userId, userCtx.user._id]);
  useEffect(() => {
    userVerification();
    getFormattedDateDifference(comment.createdAt);
  }, [userVerification, comment.createdAt]);

  const getBusiness = async (businessId) => {
    try {
      const response = await newRequest.get(
        `/business/getBusiness/${businessId}`
      );
      setBusiness(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBusiness(comment.business);
  }, [comment.business]);

  return (
    <ThemeProvider theme={theme}>
      <div className="flex flex-col space-y-2 justify-start mb-2">
        <span className="font-bold"> {`${userCtx.user.username}>>${business.name}`}</span>
        
        <Avatar src={userCtx.user.img} />
        <div className="flex justify-between">
          <div className="flex space-x-2 ">
            {stars}
            <div className="border border-l-1"></div>
            <span className="font-light"> {time}</span>
          </div>
          <div className="flex space-x-2">
            {isUser && (
              <DeleteIcon className="cursor-pointer" onClick={deleteComment} />
            )}
            {isUser && (
              <EditIcon className="cursor-pointer" onClick={editComment} />
            )}
          </div>
        </div>
        <span>{comment.text}</span>
      </div>

      <div className="flex items-center space-x-2 ">
        <ThumbUpIcon className="cursor-pointer" onClick={likeComment} />
        <div>{comment.like}</div>
        <ThumbDownAltIcon className="cursor-pointer" />
      </div>
      <div className="border border-b-1"></div>
    </ThemeProvider>
  );
};
export default UserProfileComment;
