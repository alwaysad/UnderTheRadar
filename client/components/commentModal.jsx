import { useContext, useRef, useState } from "react";
import axios from "axios";
import AuthContext from "../context/authContext";
import BusinessContext from "../context/businessContext";

const CommentModal = ({ businessName, businessId,onClose,onBusinessUpdate }) => {
  const [enteredText, setEnteredText] = useState("");
  const [enteredRating, setEnteredRating] = useState(0);
  const authCtx = useContext(AuthContext);
  const businessCtx=useContext(BusinessContext);
  const handleTextChange = (e) => {
    setEnteredText(e.target.value);
  };

  const handleRatingChange = (e) => {
    setEnteredRating(parseInt(e.target.value));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    onClose();
    axios.defaults.withCredentials = true;
    console.log(businessId);
    axios.post("http://localhost:8800/api/comment/makecomment", {
      text: enteredText,
      rating: enteredRating,
      userId: authCtx.userId,
      businessId: businessId,
    });
    businessCtx.businessHandler(businessId);
   
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-screen bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white w-72 h-72 flex items-center justify-center">
        <div className="flex flex-col space-y-2 ">
          <p>{businessName}</p>
          <form onSubmit={submitHandler}>
            <div className="flex flex-col space-y-2 ">
              <input
                type="text"
                onChange={handleTextChange}
                placeholder="make your comment brother"
              ></input>
              <input
                type="number"
                onChange={handleRatingChange}
                placeholder="give  your rate"
              ></input>
              <button onClick={()=>{
                 businessCtx.businessHandler(businessId);
              }} type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
