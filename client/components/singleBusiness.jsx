import Image from "next/image";
import PlaceIcon from "@mui/icons-material/Place";
import BusinessIcon from "@mui/icons-material/Business";
import StarIcon from "@mui/icons-material/Star";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple } from "@mui/material/colors";

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

const SingleBusiness = ({
  name,
  description,
  type,
  city,
  rating,
  commentNumber,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <div
        className="rounded-lg border border-teal-800 shadow-lg w-72 outline-none overflow-hidden"
        style={{ height: "360px" }}
      >
        <Image src="/stock.jpg" width={600} height={600} />
        <div className="flex  flex-col justify-start space-y-2 py-4 px-4">
          <div className="flex  justify-start">
            <PlaceIcon />
            <p> {city}</p>
          </div>

          <div className="flex  justify-start">
            <BusinessIcon />
            <p> {name}</p>
          </div>

          <div className="flex justify-start w-60">
            <p> {description}</p>
          </div>

          <div className="flex">
            <StarIcon color="secondary" />
            <p className=" text-orange-400 ">{rating}</p>
            <p className=" text-gray-400 ">({commentNumber})</p>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default SingleBusiness;
