import { useRef, useState } from "react";
import axios from "axios";
import useInputValidate from "./customhooks/useinputValidate";

const RegisterBusinessForm = (props) => {
  const [error, setError] = useState("");
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const descriptionRef = useRef();
  const locationRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    const enteredName = nameRef.current.value;
    const enteredMail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    const enteredConfirmPassword = confirmPasswordRef.current.value;
    const enteredDescription = descriptionRef.current.value;
    const enteredLocation = locationRef.current.value;

    if (enteredPassword !== enteredConfirmPassword) {
      console.log("Password doesnt match");
      return;
    }
    const business = {
      name: enteredName,
      email: enteredMail,
      password: enteredPassword,
      description: enteredDescription,
      location: enteredLocation,
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
    "^[a-zA-Z0-9]{4,10}$",
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
  const location = useInputValidate(
    "",
    "^([A-Za-zs]+),s*([A-Za-zs]+)$",
    "Location format must be city/country"
  );
  const description = useInputValidate(
    "",
    "^.{1,120}$",
    "Description between 1-120"
  );
  return (
    <div>
      <form onSubmit={submitHandler}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="Enter your username"
          ref={nameRef}
          onBlur={businessName.blurHandler}
          onChange={businessName.handleChange}
          required
          pattern="^[a-zA-Z0-9]{4,10}$"
        ></input>
        <div>{businessName.error}</div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          ref={emailRef}
          onBlur={email.blurHandler}
          onChange={email.handleChange}
          required
          pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
        ></input>
        <div>{email.error}</div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          ref={passwordRef}
          onBlur={password.blurHandler}
          onChange={password.handleChange}
          required
          pattern="(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{6,}).*$"
        ></input>
        <div>{password.error}</div>
        <label htmlFor="password">Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm your password"
          ref={confirmPasswordRef}
          onBlur={confirmPasswordHandler}
          required
        ></input>
        <span>{error}</span>
        <label htmlFor="description">Description</label>
        <input
          type="text"
          placeholder="Enter your description"
          ref={descriptionRef}
          onBlur={description.blurHandler}
          onChange={description.handleChange}
          required
          pattern="^.{1,120}$"
        ></input>
        <div>{description.error}</div>
        <label htmlFor="location">Location</label>
        <input
          type="text"
          placeholder="Enter your location"
          ref={locationRef}
          onBlur={location.blurHandler}
          onChange={location.handleChange}
          required
          pattern="^([A-Za-z\s]+),\s*([A-Za-z\s]+)$"
        ></input>
        <div>{location.error}</div>

       
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RegisterBusinessForm;
