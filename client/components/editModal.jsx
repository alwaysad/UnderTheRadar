import { useContext, useState, useEffect } from "react";
import AuthContext from "../context/authContext";
import CommentContext from "../context/commentContext";
import newRequest from "../utils/makerequest";

const EditModal = ({
  businessName,
  businessId,
  onClose,
  comment,
  rating,
  id,
}) => {
  const [enteredText, setEnteredText] = useState("");
  const [enteredRating, setEnteredRating] = useState(0);
  const authCtx = useContext(AuthContext);

  const commentCtx = useContext(CommentContext);

  const handleTextChange = (e) => {
    setEnteredText(e.target.value);
  };

  const handleRatingChange = (e) => {
    setEnteredRating(parseInt(e.target.value));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    onClose();
    console.log(businessId);
    await newRequest.put(`comment/edit/${id}`, {
      userId: authCtx.userId,
      text: enteredText,
      rating: enteredRating,
    });
    commentCtx.getComments(businessId);
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
                placeholder={comment}
              ></input>
              <input
                className="px-2 py-2 border-black border-2 rounded-md outline-none"
                type="number"
                max={5}
                min={0}
                onChange={handleRatingChange}
                placeholder={rating}
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
            className="border rounded-lg py-2 border-black overflow-hidden bg-black text-white hover:text-green-400 duration-150"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
