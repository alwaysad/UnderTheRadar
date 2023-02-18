import { useState } from "react";

const useInputValidate = (initialValue, pattern, errorMessage) => {  //setting rules for input pattern and checking validity
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");
  const [color,setColor]=useState('text-red-500');

  const handleChange = (e) => {
    setValue(e.target.value);
    setError("");
  };

  const blurHandler = () => {
    const regex = new RegExp(pattern);
    if (!regex.test(value)) {
      setError(errorMessage);
      setColor('text-red-500 max-w-sm');
    } else {
      setError("");
      setColor('text-green-500 max-w-sm');
    }
  };

  return {
    color,
    value,
    error,
    handleChange,
    blurHandler,
  };
};

export default useInputValidate;
