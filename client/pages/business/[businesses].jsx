import SingleBusiness from "../../components/singleBusinessCard";
import newRequest from "../../utils/makerequest";
import LoopIcon from "@mui/icons-material/Loop";
import Head from "next/head";
import { useQuery } from "@tanstack/react-query";

const Businesses = (props) => {
  const { data, isLoading } = useQuery({
    queryKey: ["businesses"],
    queryFn: async () => {
      if (props.businesses === "allTypes") {
        const response = await newRequest.get(`business/getAllBusiness`);
        return response.data;
      } else {
        const response = await newRequest.get(
          `business/getAllBusiness?type=${props.businesses}`
        );
        return response.data;
      }
    },
    refetchOnReconnect: true,
  });

  return (
    <div className="flex justify-center bg-gray-200 min-h-screen items-center">
      <Head>
        <title>
          {props.businesses === "allTypes"
            ? "All businesses"
            : props.businesses}
        </title>
      </Head>
      {isLoading && <LoopIcon className="animate-spin" />}
      {!isLoading && (
        <div className="mt-10 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 ">
          {data.map((business) => (
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

export async function getServerSideProps(context) {
  const { businesses } = context.query;

  return {
    props: {
      businesses: businesses || "allTypes", // If undefined, set default value to "allTypes"
    },
  };
}

export default Businesses;
