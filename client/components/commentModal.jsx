import { useContext, useState } from "react";
import AuthContext from "../context/authContext";
import BusinessContext from "../context/businessContext";
import CommentContext from "../context/commentContext";
import newRequest from "../utils/makerequest";
import { useEffect } from "react";

const EditModal = ({ businessName, businessId, onClose }) => {
  const [enteredText, setEnteredText] = useState("");
  const [enteredRating, setEnteredRating] = useState(0);
  const authCtx = useContext(AuthContext);
  const businessCtx = useContext(BusinessContext);
  const commmentCtx = useContext(CommentContext);
  const handleTextChange = (e) => {
    setEnteredText(e.target.value);
  };

  const handleRatingChange = (e) => {
    setEnteredRating(parseInt(e.target.value));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const modal = document.querySelector(".bg-comment");
      if (modal && !modal.contains(event.target)) {
        onClose();
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const submitHandler = async (e) => {
    e.preventDefault();
    onClose();
    console.log(businessId);
    await newRequest.post("comment/makecomment", {
      text: enteredText,
      rating: enteredRating,
      userId: authCtx.userId,
      businessId: businessId,
    });
    businessCtx.businessHandler(businessId);
    commmentCtx.getComments(businessId);
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-screen bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-comment p-24  flex items-center justify-center">
        <div className="flex flex-col space-y-2 ">
          <p className="font-bold mb-2 text-black  text-3xl">{businessName}</p>
          <form onSubmit={submitHandler}>
            <div className="flex flex-col space-y-2 ">
              <input
                className="px-4 py-8 border-black border-2 rounded-md outline-none break-all"
                type="text"
                onChange={handleTextChange}
                placeholder="Your comment"
              ></input>
              <input
                className="px-2 py-2 border-black border-2 rounded-md outline-none"
                type="number"
                max={5}
                min={0}
                onChange={handleRatingChange}
                placeholder="Your rating"
              ></input>
              <button
                className="border rounded-lg py-2 border-black overflow-hidden bg-black text-white hover:text-green-400 duration-150"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
          <button
            onClick={onClose}
            className="border rounded-lg py-2 border-black overflow-hidden bg-black text-white hover:text-green-400 duration-150"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
