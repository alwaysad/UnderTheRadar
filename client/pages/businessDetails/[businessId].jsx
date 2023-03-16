import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import SingleBusinessDetail from "../../components/singleBusinessDetails";
import BusinessContext from "../../context/businessContext";
import LoopIcon from "@mui/icons-material/Loop";
import CommentContext from "../../context/commentContext";
import SingleComment from "../../components/singleComment";

const BusinessDetail = () => {
  const router = useRouter();
  const { businessId } = router.query;
  const businessCtx = useContext(BusinessContext);
  const commentCtx = useContext(CommentContext);

  const fetchData = async () => {
    await Promise.all([
      commentCtx.getComments(businessId),
      businessCtx.businessHandler(businessId),
    ]);
  };

  useEffect(() => {
    fetchData();
  }, [businessId]);

  return (
    <div className="flex min-h-screen items-center justify-center mt-10">
      <div className="flex flex-col max-w-5xl w-full px-10 md:px-20 lg:px-40">
        {businessCtx.isLoading && (
          <div className="flex items-center justify-center min-h-screen">
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
        {commentCtx.isLoading && (
          <div className="flex items-center justify-center">
            <LoopIcon className="animate-spin" />
          </div>
        )}
        {!commentCtx.isLoading &&
          commentCtx.comments.map((comment) => (
            <SingleComment
              key={comment._id}
              id={comment._id.toString()}
              text={comment.text}
              like={comment.like}
              dislike={comment.dislike}
              rating={comment.rating}
              createdAt={comment.createdAt}
              userId={comment.user}
              businessId={businessId}
            />
          ))}
      </div>
    </div>
  );
};

export default BusinessDetail;
