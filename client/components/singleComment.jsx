import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import StarIcon from "@mui/icons-material/Star";
import { purple } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LoremIpsum } from "react-lorem-ipsum";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
const SingleComment = ({ text, userId, createdAt, rating, like, dislike }) => {
  const [user, setUser] = useState({});
  const [time, setTime] = useState("");
  const getUser = async () => {
    const response = await axios.get(
      `http://localhost:8800/api/user/getUser/${userId}`
    );
    setUser(response.data);
  };

  useEffect(() => {
    getUser();
    getFormattedDateDifference(createdAt);
  }, []);

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

  const getFormattedDateDifference = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();

    const yearDiff = now.getFullYear() - date.getFullYear();
    const monthDiff = now.getMonth() - date.getMonth();
    const dayDiff = now.getDate() - date.getDate();

    let formattedString = "";

    if (yearDiff > 0) {
      formattedString += `${yearDiff} year${yearDiff > 1 ? "s ago" : ""} `;
    }

    if (monthDiff > 0) {
      formattedString += `${monthDiff} month${monthDiff > 1 ? "s ago" : ""} `;
    }

    if (dayDiff > 0) {
      formattedString += `${dayDiff} day${dayDiff > 1 ? "s ago" : ""} `;
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
        <div className="flex items-center space-x-2 ">
          <ThumbUpIcon className="cursor-pointer" />
          <div>{like}</div>
          <ThumbDownAltIcon className="cursor-pointer" /> <div>{dislike}</div>
        </div>

        <div className="border border-b-1"></div>
      </div>
    </ThemeProvider>
  );
};

export default SingleComment;
