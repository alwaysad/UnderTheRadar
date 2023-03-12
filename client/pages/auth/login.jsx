import LoginUser from "../../components/loginUser";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import BusinessLogin from "../../components/loginBusiness";
import AuthContext from "../../context/authContext";
import newRequest from "../../utils/makerequest";

const Login = () => {
  const router = useRouter();
  const [isUser, setIsUser] = useState(false);
  const [isBusiness, setIsBusiness] = useState(false);
  const [showButtons, setshowButtons] = useState(true);

  const authCtx = useContext(AuthContext);

  const loginHandler = (loginCredentials) => {
    try {
      newRequest.post("auth/login/user", loginCredentials).then((response) => {
        console.log(response.data);
        router.push("/");
        authCtx.onLogin(response.data.user._id);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const businessLoginHandler = (loginCredentials) => {
    try {
      newRequest
        .post("auth/login/business", loginCredentials)
        .then((response) => {
          console.log(response.data);
          router.push("/");
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col space-y-6 items-center justify-center min-h-screen bg-gray-400 ">
      {showButtons && (
        <>
    
          <button
            className="btn-primary w-4/12"
            onClick={() => {
              setIsUser(true);
              setIsBusiness(false);
              setshowButtons(false);
            }}
          >
            User login
          </button>
          <button
            className="btn-primary w-4/12"
            onClick={() => {
              setIsUser(false);
              setIsBusiness(true);
              setshowButtons(false);
            }}
          >
            Business login
          </button>
        </>
      )}

      {isUser && <LoginUser submitHandler={loginHandler} />}
      {isBusiness && <BusinessLogin submitHandler={businessLoginHandler} />}
    </div>
  );
};

export default Login;
