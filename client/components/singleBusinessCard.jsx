import Image from "next/image";
import PlaceIcon from "@mui/icons-material/Place";
import BusinessIcon from "@mui/icons-material/Business";
import StarIcon from "@mui/icons-material/Star";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import Link from "next/link";
import { useState, useEffect } from "react";
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
  
  city,
  rating,
  commentNumber,
  id,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (commentNumber === 0) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Link href={`/businessDetails/${id}`}>
        <div
          className="rounded-lg border group  border-teal-800 shadow-lg w-72 outline-none overflow-hidden"
          style={{ height: "360px" }}
        >
          <Image src="/stock.jpg" alt="business" width={600} height={600} />
          <div className="flex  flex-col justify-start space-y-2 py-4 px-4">
            <div className="flex  justify-start space-x-3">
              <PlaceIcon />
              <p> {city}</p>
            </div>

            <div className="flex space-x-3 justify-start">
              <BusinessIcon />
              <p> {name}</p>
            </div>

            <div className="flex justify-start w-60  group-hover:text-green-400 duration-200 font-medium">
              <p> {description}</p>
            </div>
            {visible && (
              <div className="flex">
                <StarIcon color="secondary" />
                <p className=" text-orange-400 ">
                  {rating ? rating.toFixed(1) : 0}
                </p>
                <p className=" text-gray-400 ">({commentNumber})</p>
              </div>
            )}
          </div>
        </div>
      </Link>
    </ThemeProvider>
  );
};

export default SingleBusiness;
