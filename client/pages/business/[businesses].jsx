import SingleBusiness from "../../components/singleBusiness";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

const Businesses = (props) => {
  const router = useRouter();
  const [business, setBusiness] = useState([]);
  const { businesses } = router.query;
  const businessTypeFilter = async () => {
    const response = await axios.get(
      `http://localhost:8800/api/business/getAllBusiness?type=${businesses}`
    );
    setBusiness(response.data);
  };
  useEffect(() => {
    businessTypeFilter();
  });

  return business.map((business) => (
    <SingleBusiness
    key={business._id.toString()}
      name={business.name}
      description={business.description}
      city={business.city}
      type={business.businessType}
    />
  ));
};

export default Businesses;
