import SingleBusiness from "../../components/singleBusiness";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

const Businesses = (props) => {
  const router = useRouter();
  const [business, setBusiness] = useState([]);
  const { businesses } = router.query;
  const businessTypeFilter = async () => {
    if (businesses === "allTypes") {
      const response = await axios.get(
        `http://localhost:8800/api/business/getAllBusiness`
      );
      setBusiness(response.data);
    } else {
      const response = await axios.get(
        `http://localhost:8800/api/business/getAllBusiness?type=${businesses}`
      );
      setBusiness(response.data);
    }
  };
  useEffect(() => {
    businessTypeFilter();
  }, [businesses]);

  return (
    <div className="flex justify-center mt-10 min-h-screen">
      <div className=" mt-10 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 ">
        {business.map((business) => (
          <SingleBusiness
            key={business._id.toString()}
            name={business.name}
            description={business.description}
            city={business.city}
            type={business.businessType}
            rating={business.rating}
            commentNumber={business.comments.length}
          />
        ))}
      </div>
    </div>
  );
};

export default Businesses;
