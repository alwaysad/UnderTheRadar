import { useRef, useState } from "react";
import useInputValidate from "./customhooks/useinputValidate";
import { storage } from "../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
const RegisterBusinessForm = (props) => {
  const options = [
    "Restaurant",
    "Butic",
    "Coffe Shop",
    "Art Shop",
    "Cultural place",
    "Accomadation",
  ];

  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const descriptionRef = useRef();
  const locationRef = useRef();
  const typeRef = useRef();
  const cityRef = useRef();
  const submitHandler = async (e) => {
    e.preventDefault();
    const enteredName = nameRef.current.value;
    const enteredMail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    const enteredConfirmPassword = confirmPasswordRef.current.value;
    const enteredDescription = descriptionRef.current.value;
    const enteredLocation = locationRef.current.value;
    const enteredType = typeRef.current.value;
    const enteredCity = cityRef.current.value;

    if (enteredPassword !== enteredConfirmPassword) {
      console.log("Password doesnt match");
      return;
    }

    const imageRef = ref(storage, enteredName);
    await uploadBytes(imageRef, file);
  
    const url = await getDownloadURL(imageRef);



    const business = {
      name: enteredName,
      email: enteredMail,
      password: enteredPassword,
      description: enteredDescription,
      location: enteredLocation,
      type: enteredType,
      city: enteredCity,
      img:url,
    };
    props.onSubmitHandler(business);
  };

  const confirmPasswordHandler = () => {
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (confirmPassword && password !== confirmPassword) {
      setError("Password doesnt match");
    } else {
      setError("");
    }
  };

  const businessName = useInputValidate(
    "",
    "^[a-zA-Z0-9]{4,20}$",
    "between 4-10 characters"
  );
  const email = useInputValidate(
    "",
    "^[^s@]+@[^s@]+.[^s@]+$",
    "please enter valid email"
  );
  const password = useInputValidate(
    "",
    "(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{6,}).*$",
    "Password must be include 1 uppercase 1 lowercase 1 number and 1 special character and at least 6 characters "
  );
  const description = useInputValidate(
    "",
    "^.{1,120}$",
    "Description between 1-120"
  );
  return (
    <div className="flex bg-white flex-col rounded-xl space-y-6 md:flex-row md:space-x-6 md:space-y-0 items-start ">
      <form
        className="flex flex-col m-10 space-y-3 p-4"
        onSubmit={submitHandler}
      >
        <div className="flex space-x-4 md:space-x-6 items-center">
          <label
            htmlFor="username"
            className="font-medium text-xl md:text-2xl w-7/12"
          >
            Business name*
          </label>
          <input
            className="px-3 py-3 md:px-6 rounded-lg outline-none border border-black"
            type="text"
            placeholder="Enter your username"
            ref={nameRef}
            onBlur={businessName.blurHandler}
            onChange={businessName.handleChange}
            required
            pattern="^[a-zA-Z0-9]{4,20}$"
          ></input>
        </div>
        <div className="flex space-x-4 md:space-x-6 items-center">
          <label
            htmlFor="businessType"
            className="font-medium text-xl md:text-2xl w-7/12"
          >
            Business Type
          </label>
          <select ref={typeRef} required>
            <option>Please choose one option</option>
            {options.map((option, index) => {
              return <option key={index}>{option}</option>;
            })}
          </select>
        </div>
        <div className="flex space-x-4 md:space-x-6 items-center">
          <label
            htmlFor="email"
            className="font-medium text-xl md:text-2xl w-7/12"
          >
            Email*
          </label>
          <input
            className="px-3 py-3 md:px-6 rounded-lg outline-none border border-black"
            type="email"
            placeholder="Enter your email"
            ref={emailRef}
            onBlur={email.blurHandler}
            onChange={email.handleChange}
            required
            pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
          ></input>
        </div>

        <div className="flex space-x-4 md:space-x-6 items-center">
          <label
            htmlFor="image"
            className="font-medium text-xl md:text-2xl w-7/12"
          >
            Cover image
          </label>
          <input
            className="px-3 py-3 md:px-6 rounded-lg outline-none border border-black"
            type="file"
            placeholder="Enter your username"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          ></input>
        </div>

        <div className="flex space-x-4 md:space-x-6 items-center">
          <label
            htmlFor="password"
            className="font-medium text-xl md:text-2xl w-7/12"
          >
            Password*
          </label>
          <input
            className="px-3 py-3 md:px-6 rounded-lg outline-none border border-black"
            type="password"
            placeholder="Enter your password"
            ref={passwordRef}
            onBlur={password.blurHandler}
            onChange={password.handleChange}
            required
            pattern="(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{6,}).*$"
          ></input>
        </div>
        <div className="flex space-x-4 md:space-x-6 items-center">
          <label
            htmlFor="password"
            className="font-medium text-xl md:text-2xl w-7/12"
          >
            Confirm Password
          </label>
          <input
            className="px-3 py-3 md:px-6 rounded-lg outline-none border border-black"
            type="password"
            placeholder="Confirm your password"
            ref={confirmPasswordRef}
            onBlur={confirmPasswordHandler}
            required
          ></input>
        </div>
        <div className="flex space-x-4 md:space-x-6 items-center">
          <label
            htmlFor="description"
            className="font-medium text-xl md:text-2xl w-7/12"
          >
            Description
          </label>
          <input
            className="px-3 py-3 md:px-6 rounded-lg outline-none border border-black"
            type="text"
            placeholder="Enter your description"
            ref={descriptionRef}
            onBlur={description.blurHandler}
            onChange={description.handleChange}
            required
            pattern="^.{1,120}$"
          ></input>
        </div>
        <div className="flex space-x-4 md:space-x-6 items-center">
          <label
            htmlFor="city"
            className="font-medium text-xl md:text-2xl w-7/12"
          >
            City
          </label>
          <input
            className="px-3 py-3 md:px-6 rounded-lg outline-none border border-black"
            type="text"
            placeholder="Enter your city"
            ref={cityRef}
            required
          ></input>
        </div>
        <div className="flex space-x-4 md:space-x-6 items-center">
          <label
            htmlFor="location"
            className="font-medium text-xl md:text-2xl w-7/12"
          >
            Adress
          </label>
          <input
            className="px-3 py-3 md:px-6 rounded-lg outline-none border border-black"
            type="text"
            placeholder="Enter your location"
            ref={locationRef}
            required
          ></input>
        </div>

        <button
          type="submit"
          className="border text-xl border-black hover:bg-black hover:text-white transition duration-200 font-bold"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default RegisterBusinessForm;
