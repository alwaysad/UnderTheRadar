import useInputValidate from "./customhooks/useinputValidate";
import { useRef } from "react";

const LoginUser = (props) => {
const emailRef=useRef();
const passwordRef=useRef();
  const email = useInputValidate(
    "",
    "^[^s@]+@[^s@]+.[^s@]+$",
    "Lütfen geçerli bir e-mail giriniz"
  );
  const submitHandler=(e)=>{
    e.preventDefault();

    const enteredMail=emailRef.current.value;
    const enteredPassword=passwordRef.current.value;

    const user={
        email:enteredMail,
        password:enteredPassword
    }
    props.submitHandler(user);

    
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Lütfen email giriniz"
          onChange={email.handleChange}
          onBlur={email.blurHandler}
          pattern="^[^s@]+@[^s@]+.[^s@]+$"
          ref={emailRef}
        ></input>
        <label htmlFor="password">password</label>
        <input
          type="password"
          placeholder="Lütfen şifre giriniz"
          ref={passwordRef}
        ></input>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginUser;
