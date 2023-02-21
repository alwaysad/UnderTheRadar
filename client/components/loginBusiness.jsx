import useInputValidate from "./customhooks/useinputValidate";
import { useRef } from "react";

const BusinessLogin = (props) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const email = useInputValidate(
    "",
    "^[^s@]+@[^s@]+.[^s@]+$",
    "Lütfen geçerli bir e-mail giriniz"
  );
  const submitHandler = (e) => {
    e.preventDefault();

    const enteredMail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    const business = {
      email: enteredMail,
      password: enteredPassword,
    };
    props.submitHandler(business);
  };

  return (
    <div className="flex items-center justify-center bg-white px-10 py-10 rounded-lg">
      <form onSubmit={submitHandler} className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-2 md:flex-row md:space-x-8 md:space-y-0 items-center">
          <label htmlFor="email" className="font-medium text-xl w-7/12">
            Email
          </label>
          <input className="px-3 py-3 md:px-6 rounded-lg outline-none border border-black"
            type="email"
            placeholder="Lütfen email giriniz"
            onChange={email.handleChange}
            onBlur={email.blurHandler}
            pattern="^[^s@]+@[^s@]+.[^s@]+$"
            ref={emailRef}
          ></input>
        </div>
        {email.error&&<p>{email.error}</p>}
        <div className="flex flex-col space-y-2 md:flex-row md:space-x-8 md:space-y-0 items-center">
          <label htmlFor="password" className="font-medium text-xl w-7/12">
            password
          </label>
          <input
            className="px-3 py-3 md:px-6 rounded-lg outline-none border border-black"
            type="password"
            placeholder="Lütfen şifre giriniz"
            ref={passwordRef}
          ></input>
        </div>
        <button type="submit"  className="border text-xl border-black hover:bg-black hover:text-white transition duration-200 rounded-xl py-2">Business Login</button>
      </form>
    </div>
  );
};

export default BusinessLogin;
