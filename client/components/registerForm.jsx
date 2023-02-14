import { useRef, useState } from "react";
import useInputValidate from "./customhooks/useinputValidate";

const RegisterForm = (props) => {
  const [entereduserName, setEnteredUserName] = useState("");
  const [error,setError]=useState('');
  const [enteredMail, setEnteredMail] = useState("");
  const [enteredBirthDate, setEnteredBirthDate] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");

  const userNameRef = useRef();
  const emailRef = useRef();
  const birthDateRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    setEnteredUserName(userNameRef.current.value);
    setEnteredMail(emailRef.current.value);
    setEnteredBirthDate(birthDateRef.current.value);
    setEnteredPassword(passwordRef.current.value);
    setEnteredConfirmPassword(confirmPasswordRef.current.value);

    if(enteredPassword!==enteredConfirmPassword){
        console.log('Password doesnt match');
        return;
    }



    props.onSubmitHandler({
      username: entereduserName,
      email: enteredMail,
      birthdate: enteredBirthDate,
      password: enteredPassword,
    });
  };

  const confirmPasswordHandler = () => {
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (confirmPassword && password !== confirmPassword) {
      setError('Password doesnt match');
    }else{
        setError('');
    }
  };

  const username = useInputValidate(
    "",
    "^[a-zA-Z0-9]{4,10}$",
    "between 4-10 characters"
  );
  const email = useInputValidate(
    "",
    "^[^\s@]+@[^\s@]+\.[^\s@]+$",
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
        <label for="username">Username</label>
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
        <label for="email">Email</label>
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
        <label for="birthDate">Birthdate</label>
        <input
          type="date"
          placeholder="Enter your birth date"
          ref={birthDateRef}
          required
        ></input>
        <label for="password">Password</label>
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
        <label for="password">Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm your password"
          ref={confirmPasswordRef}
          onBlur={confirmPasswordHandler}
          required
        ></input>
        <span>{error}</span>
        <label for="submit">Submit</label>
        <input type="submit"></input>
      </form>
    </div>
  );
};

export default RegisterForm;
