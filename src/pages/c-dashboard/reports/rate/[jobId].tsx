import Layout from "@/components/dashboard/layout";
import RatingForm from "@/components/rating/RatingForm";
import { useRouter } from "next/router";
import React from "react";

function RatingPage() {
  const router = useRouter();
  const id = router.query.jobId as string;
  return (
    <Layout>
      <RatingForm jobId={id} />
    </Layout>
  );
}

export default RatingPage;
