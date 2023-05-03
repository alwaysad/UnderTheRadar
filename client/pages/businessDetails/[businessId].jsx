import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import SingleBusinessDetail from "../../components/singleBusinessDetails";
import BusinessContext from "../../context/businessContext";
import LoopIcon from "@mui/icons-material/Loop";
import CommentContext from "../../context/commentContext";
import SingleComment from "../../components/singleComment";
import Head from "next/head";

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
    <div className="flex min-h-screen justify-center mt-10">
      <Head>
        <title>{businessCtx.business.name}</title>
      </Head>
      <div className="flex flex-col max-w-5xl w-full px-10 md:px-10 lg:px-20 bg-gray-200 pt-10 rounded-lg">
        {businessCtx.isLoading && (
          <SkeletonTheme
            enableAnimation
            inline
            duration={1.5}
            baseColor="#5A5453"
            highlightColor="#444"
          >
            <Skeleton className="mt-8" width={100} />

            <div className="flex flex-col space-y-10 shadow-sm">
              <Skeleton className="mt-8" count={3} />
            </div>
            <Skeleton className="mt-8" width={100} />
            <div className="flex justify-between items-center">
              <Skeleton className="mt-8" width={100} />
              <Skeleton
                className="mt-8"
                width={150}
                height={50}
                borderRadius={40}
              />
            </div>
          </SkeletonTheme>
        )}
        {!businessCtx.isLoading && (
          <SingleBusinessDetail
            id={businessCtx.business._id}
            business={businessCtx.business}
            commentnumber={businessCtx?.business.comments.length}
            comments={businessCtx.business.comments}
          />
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
              userId={comment.user._id.toString()}
              businessId={businessId}
            />
          ))}
      </div>
    </div>
  );
};

export default BusinessDetail;
