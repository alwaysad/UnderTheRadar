import React, { useEffect, useState } from "react";
import axios from "axios";
const BusinessContext = React.createContext({
  business: {},
  businessHandler: (businessId) => {},
});

export const BusinessContextProvider = (props) => {
  const [business, setBusiness] = useState({});

  const getBusinessHandler = async (businessId) => {
    if (!businessId) {
      return;
    }
    const response = await axios.get(
      `http://localhost:8800/api/business/getBusiness/${businessId}`
    );
    setBusiness(response.data);
    
  };


  return (
    <BusinessContext.Provider
      value={{
        business: business,
        businessHandler: getBusinessHandler,
      }}
    >
      {props.children}
    </BusinessContext.Provider>
  );
};
export default BusinessContext;
