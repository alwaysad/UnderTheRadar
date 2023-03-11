import React, { useEffect, useState } from "react";
import axios from "axios";
const BusinessContext = React.createContext({
  business: {},
  businessHandler: (businessId) => {},
  isLoading: true,
  error: "",
});

export const BusinessContextProvider = (props) => {
  const [business, setBusiness] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const getBusinessHandler = async (businessId) => {
    if (!businessId) {
      return;
    }
    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:8800/api/business/getBusiness/${businessId}`
      );
      setBusiness(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(true);
      setError(error);
    }
  };

  return (
    <BusinessContext.Provider
      value={{
        business: business,
        businessHandler: getBusinessHandler,
        isLoading: isLoading,
        error: error,
      }}
    >
      {props.children}
    </BusinessContext.Provider>
  );
};
export default BusinessContext;
