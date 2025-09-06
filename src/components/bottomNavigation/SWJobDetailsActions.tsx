import { AlertColor, Box, Typography } from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useRouter } from "next/router";
import { JobStatus, getJobStatus } from "../job/AdminJobStatus";
import { useEffect, useRef, useState } from "react";
import GenericDialog from "../dialog/GenericDialog";
import ApplyFloatingActionButtons from "../fab/Apply";
import ChatFloatingActionButtons from "../fab/Chat";
import AcceptFloatingActionButtons from "../fab/Accept";
import { confirmSWPaid } from "@/lib/payment";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import SnackbarComponent from "../snackbar/SnackBar";
import GenericActions from "../dialog/actions/GenericActions";
import RateFloatingActionButtons from "../fab/Rate";
import StartFloatingButton from "../fab/StartFloatingButton";
import axios from "axios";
import { isUserVerified } from "@/lib/utils/user";

export default function SWJobDetailsActions({ jobId }: { jobId: string }) {
  const { _id } = useSelector((state: RootState) => state.users.user);
  const [value, setValue] = useState(0);
  const router = useRouter();
  const [jobStatus, setJobStatus] = useState<JobStatus | null>(null);
  const [error, setError] = useState();
  const [msg, setMsg] = useState("");
  const [color, setColor] = useState<AlertColor>("error");

  //declare refs
  const snackBarRef = useRef(null);
  const dialogRef = useRef(null);

  const confirmAction = async (confirm: boolean) => {
    if (!confirm) {
      const refState = dialogRef.current as any;
      refState.closeDialog();
      try {
        await axios({
          method: "POST",
          url: `${process.env.RENTALS_URL}api/job/decline`,
          data: { jobId },
        });
        router.reload();
      } catch (err: any) {
        console.log(err);
      }
    } else {
      const refState = dialogRef.current as any;
      refState.closeDialog();

      try {
        await axios({
          method: "POST",
          url: `${process.env.RENTALS_URL}api/job/commence`,
          data: { jobId },
        });
        router.reload();
      } catch (err: any) {
        console.log(err);
      }

      // const { result, error } = await confirmSWPaid(jobId);
      // if (error) {
      //   setMsg(error.message);
      //   setColor("error");
      //   const refState = snackBarRef.current as any;
      //   refState.handleClick();
      // }
      // if (result.successful) {
      //   setMsg(result.message);
      //   setColor("success");
      //   const refState = snackBarRef.current as any;
      //   refState.handleClick();
      //   setTimeout(() => {
      //     router.reload();
      //   }, 3000);
      // } else {
      //   setMsg(result.message);
      //   setColor("error");
      //   const refState = snackBarRef.current as any;
      //   refState.handleClick();
      // }
    }
  };
  const dialogHandler = () => {
    const refState = dialogRef.current as any;
    refState.showDialog();
  };

  useEffect(() => {
    getJobStatus(jobId, setJobStatus, setError, _id);
  }, [jobId, _id]);

  if (error) return <p></p>;
  if (!jobStatus) return <p></p>;
  return (
    <Box sx={{ width: "100%", mb: 5 }}>
      <SnackbarComponent msg={msg} color={color} ref={snackBarRef} />
      <GenericDialog
        content={
          <StartJobTandC />
          // <GenericContent message="Are sure you want to withdraw payment" />
        }
        actions={
          <GenericActions
            confirmAction={confirmAction}
            yesLabel="I Agree"
            noLabel="I Disagree"
          />
        }
        ref={dialogRef}
      />
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        {jobStatus.swPaid && (
          <BottomNavigationAction label="Payment Confirmed. Well Done!!!!" />
        )}
        {!jobStatus.isProposalAccepted && !jobStatus.hasThisUserApplied && (
          <BottomNavigationAction
            label="Send Proposal"
            icon={
              <ApplyFloatingActionButtons
                handleClick={async () => {
                  const res = await isUserVerified(_id);
                  if (res.data) {
                    router.push(`/sw-dashboard/job/${jobId}`);
                  } else {
                    setMsg(
                      "You are not eligible to send proposals because you are not verified. Kindly upload your Id and do your facial capturing"
                    );
                    setColor("error");
                    const refState = snackBarRef.current as any;
                    refState.handleClick();
                    setTimeout(() => {
                      router.push("/sw-dashboard/verification/id-card");
                    }, 6000);
                  }
                }}
              />
            }
          />
        )}
        {jobStatus.isProposalAccepted &&
          jobStatus.hasThisUserApplied &&
          !jobStatus.jobCommenced && (
            <BottomNavigationAction
              label="Start Job"
              icon={<StartFloatingButton handleClick={dialogHandler} />}
            />
          )}
        {jobStatus.isJobApproved && !jobStatus.swRated && (
          <BottomNavigationAction
            label="Rate Our Service"
            icon={
              <RateFloatingActionButtons
                handleClick={() => {
                  router.push(`/rating/${jobId}`);
                  // const refState = ratingRef.current as any;
                  // refState.showDialog();
                }}
              />
            }
          />
        )}

        {jobStatus.isJobApproved && !jobStatus.swPaid && (
          <BottomNavigationAction
            label="Withdraw Payment"
            icon={
              <AcceptFloatingActionButtons
                handleClick={async () => {
                  const { result, error } = await confirmSWPaid(jobId);
                  if (error) {
                    setMsg(error.message);
                    setColor("error");
                    const refState = snackBarRef.current as any;
                    refState.handleClick();
                  }
                  if (result.successful) {
                    setMsg(result.message);
                    setColor("success");
                    const refState = snackBarRef.current as any;
                    refState.handleClick();
                    setTimeout(() => {
                      router.reload();
                    }, 3000);
                  } else {
                    setMsg(result.message);
                    setColor("error");
                    const refState = snackBarRef.current as any;
                    refState.handleClick();
                  }
                }}
              />
            }
          />
        )}

        <BottomNavigationAction
          label="Chat Admin"
          icon={
            <ChatFloatingActionButtons
              receiverId={process.env.CUSTOMER_SERVICE_ID as string}
            />
          }
        />
      </BottomNavigation>{" "}
    </Box>
  );
}

function StartJobTandC() {
  return (
    <Box justifyContent={"center"}>
      <Typography variant="h6" mb={2}>
        THINGS YOU NEED TO KNOW BEFORE YOU PROCEED
      </Typography>
      <Typography>
        You are agree or not to the following terms and conditions by clicking
      </Typography>
      <ol>
        <li>
          {/*  */}
        </li>
        <li>
         
        </li>
        <li>
          {" "}
      
        </li>
        <li>
         
        </li>
        <li>
         
        </li>
      </ol>
      <Typography>
       
      </Typography>
    </Box>
  );
}
