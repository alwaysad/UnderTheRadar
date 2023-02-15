import RegisterForm from "../../components/registerForm";
import axios from "axios";
import { useState } from "react";
import RegisterBusinessForm from "../../components/registerBusiness";

const Register = () => {
  const [isPersonal, setIsPersonal] = useState(false);
  const [isBusiness, setIsBusiness] = useState(false);

  const onSubmitHandler = async (newUser) => {
    const user = {
      username: newUser.username,
      email: newUser.email,
      birthDate: newUser.birthDate,
      password: newUser.password,
    };
    try {
      await axios
        .post("http://localhost:8800/api/auth/register", user)
        .then((response) => {
          console.log(response.data);
        });
    } catch (error) {
      console.log(error.response.data);
    }
  };
  const businessSubmitHandler = async (newBusiness) => {
    const business = {
      name: newBusiness.name,
      email: newBusiness.email,
      password: newBusiness.password,
      description:newBusiness.description,
      location:newBusiness.location
    };
    try {
      await axios
        .post("http://localhost:8800/api/auth/register/business", business)
        .then((response) => {
          console.log(response.data);
        });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div>
      <button
        onClick={() => {
          setIsPersonal(true);
          setIsBusiness(false);
        }}
      >
        Personal Register
      </button>
      <button
        onClick={() => {
          setIsPersonal(false);
          setIsBusiness(true);
        }}
      >
        Business Register
      </button>

      {isPersonal&&<RegisterForm onSubmitHandler={onSubmitHandler} />}
      {isBusiness&&<RegisterBusinessForm onSubmitHandler={businessSubmitHandler} />}
    </div>
  );
};

export default Register;
