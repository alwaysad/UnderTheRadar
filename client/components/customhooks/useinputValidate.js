import { useState } from "react";

const useInputValidate = (initialValue, pattern, errorMessage) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
    setError("");
  };

  const blurHandler = () => {
    const regex = new RegExp(pattern);
    if (!regex.test(value)) {
      setError(errorMessage);
    } else {
      setError("");
    }
  };

  return {
    value,
    error,
    handleChange,
    blurHandler,
  };
};

export default useInputValidate;
