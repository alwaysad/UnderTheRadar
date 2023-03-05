import { useRef, useState } from "react";
import useInputValidate from "./customhooks/useinputValidate";


const RegisterForm = (props) => {
  const [error, setError] = useState("");
  const [color,setColor]=useState('text-red-500');
  const nameRef=useRef();
  const surNameRef=useRef();
  const userNameRef = useRef();
  const emailRef = useRef();
  const birthDateRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    const enteredName=nameRef.current.value;
    const enteredSurName=surNameRef.current.value;
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
      firstName:enteredName,
      lastName:enteredSurName,
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
    "^[a-zA-Z0-9]{4,15}$",
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
    <div className="flex bg-white flex-col rounded-xl space-y-6 md:flex-row md:space-x-6 md:space-y-0 items-start ">
      <form className="flex flex-col m-10 space-y-3 p-4" onSubmit={submitHandler}>
      <div className="flex space-x-4 md:space-x-6 items-center">
        <p className="font-medium text-xl md:text-2xl w-7/12">First Name</p>
        <input className="px-3 py-3 md:px-6 rounded-lg outline-none border border-black"
          type="text"
          placeholder="Enter your name"
          ref={nameRef}
          required
        ></input>   
        </div>
        
        <div className="flex space-x-4 md:space-x-6 items-center">
        <p className="font-medium text-xl md:text-2xl w-7/12">Surname</p>
        <input className="px-3 py-3 md:px-6 rounded-lg outline-none border border-black"
          type="text"
          placeholder="Enter your surname"
          ref={surNameRef}
          required
        ></input>   
        </div>
        <div className="flex space-x-4 md:space-x-6 items-center">
        <p className="font-medium text-xl md:text-2xl w-7/12">Username</p>
        <input className="px-3 py-3 md:px-6 rounded-lg outline-none border border-black"
          type="text"
          placeholder="Enter your username"
          ref={userNameRef}
          onBlur={username.blurHandler}
          onChange={username.handleChange}
          required
          pattern="^[a-zA-Z0-9]{4,15}$"
        ></input>   
        </div>
        <div className="flex space-x-4 md:space-x-6  items-center " >
        <p className="font-medium text-xl md:text-2xl w-7/12">Email</p>
        <input  className="px-3 py-3 md:px-6 rounded-lg outline-none border border-black"
          type="email"
          placeholder="Enter your email"
          ref={emailRef}
          onBlur={email.blurHandler}
          onChange={email.handleChange}
          required
          pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
        ></input>
     </div>
     <div className="flex space-x-4 md:space-x-6 items-center" >
     <p className="font-medium text-xl md:text-2xl w-7/12">Birth Date</p>
        <input className="px-3 py-3 md:px-6 rounded-lg outline-none border border-black"
          type="date"
          placeholder="Enter your birth date"
          ref={birthDateRef}
          required
        ></input>
        </div>
        <div className="flex space-x-4 md:space-x-6 items-center" >
        <p className="font-medium text-xl md:text-2xl w-7/12">Password</p>
        <input className="px-3 py-3 md:px-6 rounded-lg outline-none border border-black"
          type="password"
          placeholder="Enter your password"
          ref={passwordRef}
          onBlur={password.blurHandler}
          onChange={password.handleChange}
          required
          pattern="(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{6,}).*$"
        ></input>
        </div>
        <div className="flex space-x-4 md:space-x-6 items-center" >
        <p className="font-medium text-xl md:text-2xl w-7/12">Confirm Password</p>
        <input className="px-3 py-3 md:px-6 rounded-lg outline-none border border-black"
          type="password"
          placeholder="Confirm your password"
          ref={confirmPasswordRef}
          onBlur={confirmPasswordHandler}
          required
        ></input>

       </div>
        <button type="submit" className="border text-xl border-black hover:bg-black hover:text-white transition duration-200">Submit</button>
      </form>
      <div className="flex flex-col space-y-3">
        <p className="text-xl md:text-2xl font-medium mt-12">Rules</p>
        <div className="max-w-sm">
        <p className={username.color}>Username should be between 4-15 characters</p>
        </div>
        <p className={email.color}>Please enter valid e-mail</p>
        <div className="max-w-sm">
        <p className={password.color}>Password must be 
        include 1 uppercase 1 lowercase 1 number and 1 special character and at least 6 characters</p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
