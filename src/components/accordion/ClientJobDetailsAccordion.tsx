import Typography from "@mui/material/Typography";
import { Box, CardActions, Card, CardContent } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import dynamic from "next/dynamic";
import Image from "next/image";
import axios from "axios";

import ErrorAlert from "../alerts/error";
import InfoAlert from "../alerts/Info";
import { SmnkErrorBoundary, theme } from "@/pages/_app";
import JobDetailsCard from "../card/ClientJobDetailsCard";
import SWDetailsNoCollapse from "../card/SWDetailsNoCollapse";
import ClientJobDetailsAction from "../bottomNavigation/ClientJobDetailsAction";

// ✅ Dynamically import client-only components
const AdminJobStatus = dynamic(() => import("../job/AdminJobStatus"), { ssr: false });
const ProposalsAccordion = dynamic(() => import("./ProposalsAccordion"), { ssr: false });
const ClientReportsAccordion = dynamic(() => import("./ClientsReportsAccordion"), { ssr: false });
const RecommendedProfAccordion = dynamic(() => import("./RecommendedProfAccordion"), { ssr: false });

import type { JobStatus } from "../job/AdminJobStatus";

export default function ClientJobDetailsAccordion({ job }: { job: any }) {
  const { user } = useSelector((state: RootState) => state.users);
  const [jobStatus, setJobStatus] = useState<JobStatus | null>(null);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (job && user) {
      // Import getJobStatus only in client side to avoid SSR errors
      import("../job/AdminJobStatus").then(({ getJobStatus }) => {
        getJobStatus(job._id, setJobStatus, setError, user._id);
      });
    }
  }, [job, user]);

  if (error) return <ErrorAlert />;
  if (!job || !jobStatus) return <p></p>;

  return (
    <SmnkErrorBoundary>
      <Card sx={{ mb: 5, bgcolor: "whitesmoke", color: theme.rent[1200] }}>
        <CardContent>
          <JobDetailsCard job={job} />

          {!jobStatus.isProposalAccepted && (
            <RecommendedProfAccordion jobId={job._id} />
          )}

          {!job.proposalAccepted && (
            <ProposalsAccordion
              proposals={job.proposals.filter((pro: any) => pro.rejected === false)}
              jobId={job._id}
            />
          )}

          {!job.approved && job.reports.length > 0 && (
            <ClientReportsAccordion reports={job.reports} jobId={job._id} />
          )}
        </CardContent>

        <CardActions sx={{ mt: 5 }}>
          {user.type === "admin" ? (
            <>
              {job.pop && !jobStatus.isJobPaidFor && (
                <>
                  <Typography>Proof of Payment</Typography>
                  <Image
                    alt="Proof of payment"
                    src={`/uploads/images/pop/${job.pop}`}
                    width={300}
                    height={300}
                  />
                </>
              )}
              <AdminJobStatus
                jobId={job._id}
                jobStatus={jobStatus}
                isPop={job.pop !== undefined}
              />
            </>
          ) : (
            <Box>
              <ClientJobDetailsAction jobId={job._id} />
            </Box>
          )}
        </CardActions>
      </Card>
    </SmnkErrorBoundary>
  );
}

// ✅ Fetch recommended professionals only on client side
const getRecommendedProfessionals = async (jobId: string) => {
  try {
    const res = await axios.post(`${process.env.RENTALS_URL}api/job/recommended-professionals`, { jobId });
    return res.data;
  } catch (err: any) {
    console.log(err);
    return [];
  }
};

export function RecommendedProfessional({ jobId }: { jobId: string }) {
  const [users, setUsers] = useState<any[] | null>(null);

  useEffect(() => {
    (async () => {
      if (typeof window !== "undefined") {
        const data = await getRecommendedProfessionals(jobId);
        setUsers(data);
      }
    })();
  }, [jobId]);

  if (!Array.isArray(users)) return <p></p>;
  if (users.length === 0) return <InfoAlert message="No recommended professionals" />;

  return (
    <SmnkErrorBoundary>
      <Box display="flex" alignItems="center" justifyContent="center" flexWrap="wrap" gap={5}>
        {users.map((user: any) => (
          <SWDetailsNoCollapse forClient={true} key={user} userId={user} />
        ))}
      </Box>
    </SmnkErrorBoundary>
  );
}
