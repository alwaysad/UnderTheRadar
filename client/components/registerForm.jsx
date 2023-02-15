import { useRef, useState } from "react";
import axios from "axios";
import useInputValidate from "./customhooks/useinputValidate";

const RegisterForm = (props) => {
  const [error, setError] = useState("");
  const userNameRef = useRef();
  const emailRef = useRef();
  const birthDateRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    const entereduserName = userNameRef.current.value;
    const enteredMail = emailRef.current.value;
    const enteredBirthDate = birthDateRef.current.value;
    const enteredPassword = passwordRef.current.value;
    const enteredConfirmPassword = confirmPasswordRef.current.value;

    if (enteredPassword !== enteredConfirmPassword) {
      console.log("Password doesnt match");
      return;
    }
    const user = {
      username: entereduserName,
      password: enteredPassword,
      birthDate: enteredBirthDate,
      email: enteredMail,
    };
   props.onSubmitHandler(user);
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

  const username = useInputValidate(
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
  return (
    <div>
      <form onSubmit={submitHandler}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="Enter your username"
          ref={userNameRef}
          onBlur={username.blurHandler}
          onChange={username.handleChange}
          required
          pattern="^[a-zA-Z0-9]{4,10}$"
        ></input>
        <div>{username.error}</div>
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
        <label htmlFor="birthDate">Birthdate</label>
        <input
          type="date"
          placeholder="Enter your birth date"
          ref={birthDateRef}
          required
        ></input>
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
        <label htmlFor="submit">Submit</label>
        <input type="submit"></input>
      </form>
    </div>
  );
};

export default RegisterForm;
