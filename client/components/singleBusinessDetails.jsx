import StarIcon from "@mui/icons-material/Star";
import { purple } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useContext, useEffect, useState } from "react";
import AddCommentIcon from "@mui/icons-material/AddComment";
import Portal from "./modals/commentModal";
import CommentModal from "./commentModal";
import CommentContext from "../context/commentContext";
import Image from "next/image";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
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
  const [open, setOpen] = useState(false);
  const [curr, setCurr] = useState(0);

  const prev = () => {
    setCurr((curr) => (curr === 0 ? business.images.length - 1 : curr - 1));
  };
  const next = () => {
    setCurr((curr) => (curr === business.images.length - 1 ? 0 : curr + 1));
  };

  const openHandler = () => {
    setOpen(true);
  };
  const closeHandler = () => {
    setOpen(false);
  };

  const stars = Array.from({ length: business.rating }, (_, index) => (
    <StarIcon color="secondary" key={index} />
  ));

  return (
    <ThemeProvider theme={theme}>
      <div className="flex flex-col space-y-4">
        <h1 className="font-bold text-4xl">{business.name}</h1>
        <span className="font-medium text-2xl">About this business</span>
        <div className="font-light text-xl">{business.description}</div>
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

        <div className="ml-40 relative overflow-hidden max-w-md">
          <div
            className="flex transition-transform ease-out duration-500"
            style={{ transform: `translateX(-${curr * 100}%)` }}
          >
            {business.images.map((image) => (
              <Image src={image} width={500} height={500} />
            ))}
          </div>
          <div className="flex absolute inset-0 items-center justify-between p-4">
            <button
              onClick={prev}
              className=" bg-gray-300 hover:bg-white rounded-full"
            >
              <ChevronLeftIcon />
            </button>
            <button
              onClick={next}
              className="bg-gray-300 hover:bg-white rounded-full"
            >
              <ChevronRightIcon />
            </button>
          </div>

          <div className="absolute bottom-4 right-0 left-0">
            <div className="flex items-center justify-center gap-2">
              {business.images.map((_, i) => (
                <div
                  className={`transition-all w-2 h-2 bg-white rounded-full ${
                    curr === i ? "p-1.5" : "bg-opacity-50"
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </div>

        <div className="font-bold text-2xl">Reviews</div>
        <div className="flex  flex-col space-y-1 md:flex-row md:justify-between">
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
      </div>
    </ThemeProvider>
  );
};

export default SingleBusinessDetail;
