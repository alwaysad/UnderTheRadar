import SingleBusiness from "../../components/singleBusinessCard";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCallback } from "react";
import newRequest from "../../utils/makerequest";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import LoopIcon from "@mui/icons-material/Loop";
import Head from "next/head";
const Businesses = (props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [business, setBusiness] = useState([]);
  const { businesses } = router.query;
  const businessTypeFilter = useCallback(async () => {
    if (businesses === "allTypes") {
      const response = await newRequest.get(`business/getAllBusiness`);

      setBusiness(response.data);
    } else {
      const response = await newRequest.get(
        `business/getAllBusiness?type=${businesses}`
      );
      setBusiness(response.data);
    }
    setIsLoading(false);
  }, [businesses]);
  useEffect(() => {
    businessTypeFilter();
  }, [businessTypeFilter]);

  return (
    <div className="flex justify-center bg-gray-200 min-h-screen items-center">
      <Head>
        <title>
          {businesses === "allTypes" ? "All businesses" : businesses}
        </title>
      </Head>
      {isLoading && (
        // <div>
        //   {Array(8)
        //     .fill(0)
        //     .map((_, i) => (
        //       <Skeleton circle />
        //     ))}
        // </div>
        <LoopIcon className="animate-spin" />
      )}
      {!isLoading && (
        <div className="mt-10 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 ">
          {business.map((business) => (
            <SingleBusiness
              image={business.coverimg}
              id={business._id.toString()}
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
      )}
    </div>
  );
};

export default Businesses;
