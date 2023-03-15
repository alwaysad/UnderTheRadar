import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import SingleBusinessDetail from "../../components/singleBusinessDetails";
import BusinessContext from "../../context/businessContext";
import LoopIcon from "@mui/icons-material/Loop";
const BusinessDetail = () => {
  const router = useRouter();
  const { businessId } = router.query;
  const businessCtx = useContext(BusinessContext);

  useEffect(() => {
    businessCtx.businessHandler(businessId);
  }, [businessId]);

  return (
    <div>
      {businessCtx.isLoading && (
        <div className="flex items-center justify-center min-h-screen ">
          <LoopIcon className="animate-spin" />
        </div>
      )}
      {!businessCtx.isLoading && (
        <SingleBusinessDetail
          id={businessId}
          business={businessCtx.business}
          commentnumber={businessCtx?.business.comments.length}
          comments={businessCtx.business.comments}
        />
      )}
    </div>
  );
};

export default BusinessDetail;
