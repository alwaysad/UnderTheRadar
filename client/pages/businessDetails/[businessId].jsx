import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState,useContext } from "react";
import SingleBusinessDetail from "../../components/singleBusinessDetails";
import AuthContext from "../../context/authContext";
const BusinessDetail = () => {
  const router = useRouter();
  const [business, setBusiness] = useState({});
  const authCtx=useContext(AuthContext);
  const { businessId } = router.query;

  const fetchBusinessDeails = async () => {
    if (!businessId) return;
    const response = await axios.get(
      `http://localhost:8800/api/business/getBusiness/${businessId}`
    );

    console.log(response.data);
    setBusiness(response.data);
    console.log(authCtx.userId);
    console.log(authCtx.isLoggedIn);
  };

  useEffect(() => {
    fetchBusinessDeails();
  }, [businessId]);

  return (
    <div>
      {!businessId && <div>Loading...</div>}
      {businessId && (
        <SingleBusinessDetail
          id={businessId}
          business={business}
          commentnumber={business.comments ? business.comments.length : 0}
          comments={business.comments}
        />
      )}
    </div>
  );
};

export default BusinessDetail;
