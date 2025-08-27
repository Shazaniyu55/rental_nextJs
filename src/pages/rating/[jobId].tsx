import Layout from "@/components/dashboard/layout";
import RatingForm from "@/components/rating/RatingForm";
import { useRouter } from "next/router";
import React from "react";

const RatingPage = () => {
  const router = useRouter();
  const jobId = router.query.jobId as string;
  return (
    <Layout>
      <RatingForm jobId={jobId} />
    </Layout>
  );
};

export default RatingPage;
