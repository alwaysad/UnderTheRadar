import { LoremIpsum } from "react-lorem-ipsum";
import StarIcon from "@mui/icons-material/Star";
import { purple } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import SingleComment from "./singleComment";
import AddCommentIcon from "@mui/icons-material/AddComment";
import Portal from "./modals/commentModal";
import CommentModal from "./commentModal";
import BusinessContext from "../context/businessContext";

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

const SingleBusinessDetail = ({ business, commentnumber }) => {
  const [comments, setComments] = useState([]);
  const [open, setOpen] = useState(false);

  const openHandler = () => {
    setOpen(true);
  };
  const closeHandler = () => {
    setOpen(false);
  };

  const stars = Array.from({ length: business.rating }, (_, index) => (
    <StarIcon color="secondary" key={index} />
  ));

  const getComments = async () => {
    if (!business._id) {
      return;
    }
    const response = await axios.get(
      `http://localhost:8800/api/comment/getcomments/${business._id.toString()}`
    );
    setComments(response.data);
  };

  useEffect(() => {
    if (!business._id) {
      return;
    }
    getComments(business._id.toString());
  }, [commentnumber]);

  return (
    <ThemeProvider theme={theme}>
      <div className="flex min-h-screen items-center justify-center my-20 px-10 md:px-20 lg:px-40">
        <div className="flex flex-col space-y-4 max-w-2xl mx-auto">
          <h1 className="font-bold text-4xl">{business.name}</h1>
          <span className="font-medium text-2xl">About this business</span>
          <div className="font-light text-xl">
            <LoremIpsum />
          </div>
          {open && (
            <Portal>
              <CommentModal
                onClose={closeHandler}
                businessName={business.name}
                businessId={business._id ? business._id.toString() : ""}
              />
            </Portal>
          )}

          <div className="border border-b-1"></div>
          <div className="flex flex-col space-y-2 md:flex-row justify-between">
            <div className="flex flex-col space-y-1">
              <span className="font-light">Style</span>
              <span className="">{business.businessType}</span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="font-light">City</span>
              <span className="">{business.city}</span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="font-light">Contact</span>
              <span className="">{business.email}</span>
            </div>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="font-light">Address</span>
            <span className="">{business.location}</span>
          </div>

          <div className="font-bold text-2xl">Reviews</div>
          <div className="flex  flex-col space-y-1 md:flex-row md:justify-between md:space-y-0">
            <div className="font-medium text-xl flex space-x-2 items-center">
              <p>{commentnumber} reviews for this business</p>
              {stars}
              <span className="text-orange-400">
                {business.rating ? business.rating.toFixed(1) : 0}
              </span>
            </div>
            <button
              onClick={openHandler}
              className=" border hover:bg-green-400  hover:text-white border-gray-400 transition duration-150 rounded-lg px-4 py-4"
            >
              Add comment <AddCommentIcon />
            </button>
          </div>
          {comments.map((comment) => (
            <SingleComment
              key={comment._id}
              id={comment._id.toString()}
              text={comment.text}
              like={comment.like}
              dislike={comment.dislike}
              rating={comment.rating}
              createdAt={comment.createdAt}
              userId={comment.user}
            />
          ))}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default SingleBusinessDetail;
