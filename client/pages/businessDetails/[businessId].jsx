import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import SingleBusinessDetail from "../../components/singleBusinessDetails";
import AuthContext from "../../context/authContext";
import BusinessContext from "../../context/businessContext";
const BusinessDetail = () => {
  const router = useRouter();
  const [business, setBusiness] = useState({});
  const authCtx = useContext(AuthContext);
  const { businessId } = router.query;
  const businessCtx = useContext(BusinessContext);
  const fetchBusinessDetails = () => {
    businessCtx.businessHandler(businessId);
  };

  useEffect(() => {
    fetchBusinessDetails();
  }, [businessId]);

  return (
    <div>
      {!businessId && <div>Loading...</div>}
      {businessId && (
        <SingleBusinessDetail
          id={businessId}
          business={businessCtx.business}
          commentnumber={
            businessCtx.business.comments
              ? businessCtx.business.comments.length
              : 0
          }
          comments={businessCtx.business.comments}
        />
      )}
    </div>
  );
};

export default BusinessDetail;
