import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SingleBusinessDetail from "../../components/singleBusinessDetails";


const BusinessDetail = () => {
  const router = useRouter();
  const [business, setBusiness] = useState({});

  const { businessId } = router.query;

  const fetchBusinessDeails = async () => {
    const response = await axios.get(
      `http://localhost:8800/api/business/getBusiness/${businessId}`
    );

    console.log(response.data);
    setBusiness(response.data);
  };

  useEffect(() => {
    fetchBusinessDeails();
  }, [businessId]);

  return (
    <div>
      <SingleBusinessDetail id={businessId} business={business} commentnumber={business.comments ? business.comments.length : 0} comments={business.comments}  />
    </div>
  );
};

export default BusinessDetail;
