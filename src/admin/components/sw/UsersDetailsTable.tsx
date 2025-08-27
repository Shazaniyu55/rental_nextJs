import React, { useState, useMemo, useRef, useEffect } from "react";
import { DataGrid, GridRowId } from "@mui/x-data-grid";
import { Avatar, IconButton, Typography, Box, AlertColor } from "@mui/material";
import moment from "moment";
import UserDetailsTableActions from "./UserDetailsTableActions";
import ImageDialog from "@/components/dialog/ImageDialog";
import { confirmUpgradePayment, getUserSub, verifyUser } from "@/lib/payment";
import ClearIcon from "@mui/icons-material/Clear";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import VerifiedIcon from "@mui/icons-material/Verified";
import { BlackAvatar } from "@/components/avatar/DashboardDp";
import { theme } from "@/pages/_app";
import GenericDialog from "@/components/dialog/GenericDialog";
import GenericContent from "@/components/dialog/contents/GenericContent";
import GenericActions from "@/components/dialog/actions/GenericActions";
import SnackbarComponent from "@/components/snackbar/SnackBar";
import { useRouter } from "next/router";
import ViewOnlyImageDialog from "@/components/dialog/ViewOnlyImageDialog";
import { getWallet } from "@/lib/search";
import AddMoneyImageDialog from "@/components/dialog/AddMoneyImageDialog";
import InfoAlert from "@/components/alerts/Info";

export default function UsersDetailsTable({ users }: { users: any[] }) {
  const [rowId, setRowId] = useState<GridRowId>();

  const columns = useMemo(
    () => [
      //{ field: "_id", headerName: "SMNK ID", width: 300 },
      {
        field: "dpFileName",
        headerName: "Photo",
        renderCell: (param: any) => <UserDp param={param} />,
        sortable: false,
      },
      { field: "email", headerName: "Email", width: 300 },
      { field: "phone", headerName: "Phone" },
      {
        field: "typeClass",
        headerName: "Class",
      },
      {
        field: "active",
        headerName: "Active?",
        type: "boolean",
        editable: true,
      },
      {
        field: "createdAt",
        headerName: "Joined Date",
        renderCell: (param: any) =>
          moment(param.row.createdAt).format("YYYY/MM/DD"),
      },

      {
        field: "verification.kycVerified",
        headerName: "Veri. Status",
        renderCell: (param: any) => (
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <VerificationStatus
              userId={param.row._id}
              verification={param.row.verification}
            />
          </Box>
        ),
      },
      {
        field: "wallet",
        headerName: "Wallet POP",
        renderCell: (param: any) => <WalletStatus userId={param.row._id} />,
      },
      {
        field: "subscription.type",
        headerName: "Sub. Type",
        renderCell: (param: any) => <SubType userId={param.row._id} />,
      },

      {
        field: "subscription.popConfirmed",
        headerName: "Sub. Status",
        width: 120,
        renderCell: (param: any) => (
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <SubStatus param={param} />
          </Box>
        ),
      },
      {
        field: "subscription.subscribedDate",
        headerName: "Sub. Date",
        renderCell: (param: any) => <SubDate userId={param.row._id} />,
      },
      {
        field: "subscription.expiringDate",
        headerName: "Sub. Exp. Date",
        renderCell: (param: any) => <SubExpiringDate userId={param.row._id} />,
      },
      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        renderCell: (params: any) => (
          <UserDetailsTableActions {...{ params, rowId, setRowId }} />
        ),
      },
    ],
    [rowId]
  );
  if (!users)
    return (
      <InfoAlert message="No data. Please refresh the page to start data fetching" />
    );
  return (
    <div style={{ maxHeight: "auto", width: "100%" }}>
      <DataGrid
        sx={{ margin: "1rem" }}
        getRowId={(row) => row._id}
        rows={users}
        columns={columns}
        getRowSpacing={(param) => ({
          top: param.isFirstVisible ? 0 : 5,
          bottom: param.isLastVisible ? 0 : 5,
        })}
        //onCellEditStart={(params)=>{console.log(params.id)}}
        onCellEditStop={(params) => {
          setRowId(params.id);
        }}

        //processRowUpdate={(newRow,oldRow)=>{setRowId}}
      />
    </div>
  );
}

function SubType({ userId }: { userId: string }) {
  const [subType, setSubType] = useState("");
  useEffect(() => {
    (async () => {
      const data = await getUserSub(userId);
      setSubType(data && data.type);
    })();
  });

  return <Typography>{subType ? subType : "Free"}</Typography>;
}
function SubDate({ userId }: { userId: string }) {
  const [subscription, setSubscription] = useState<any>(undefined);
  useEffect(() => {
    (async () => {
      const data = await getUserSub(userId);
      setSubscription(data);
    })();
  });

  return (
    <Typography variant="caption">
      {subscription && subscription.subscribedDate
        ? moment(subscription.subscribedDate).format("YYYY/MM/DD")
        : ""}
    </Typography>
  );
}
function SubExpiringDate({ userId }: { userId: string }) {
  const [subscription, setSubscription] = useState<any>(undefined);
  useEffect(() => {
    (async () => {
      const data = await getUserSub(userId);
      setSubscription(data);
    })();
  });

  return (
    <Typography variant="caption">
      {subscription && subscription.expiringDate
        ? moment(subscription.expiringDate).format("YYYY/MM/DD")
        : ""}
    </Typography>
  );
}
function SubStatus({ param }: { param: any }) {
  const imageDialogRef = useRef(null);
  useEffect(() => {
    (async () => {
      const data = await getUserSub(param.row._id);
      setSubscription(data);
    })();
  }, [param.row._id]);
  const [subscription, setSubscription] = useState<any>(undefined);

  if (subscription && subscription.expiringDate)
    return <VerifiedIcon sx={{ color: "green" }} />;
  if (!subscription || (subscription && subscription.pop === undefined))
    return <p></p>;
  if (
    subscription &&
    subscription.expiringDate &&
    new Date(subscription.expiringDate) < new Date()
  )
    return <ClearIcon />;
  return (
    <>
      <IconButton
        onClick={() => {
          //call image dialog ref to update image dialog
          const refState = imageDialogRef.current as any;

          refState.updateSrc(`/api/multer/sub/${subscription.pop}`);
          refState.showDialog();
        }}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {subscription && subscription.pop && (
          <BlackAvatar
            width={50}
            alt=""
            height={50}
            src={`/api/multer/sub/${subscription && subscription.pop}`}
          />
        )}
      </IconButton>
      <ApproveSubscription param={param} action={confirmUpgradePayment} />
      <ViewOnlyImageDialog ref={imageDialogRef} />
    </>
  );
}

export function ApproveSubscription({
  action,
  param,
}: {
  param: any;
  action: (id: string) => Promise<any>;
}) {
  const [msg, setMsg] = useState("");
  const [color, setColor] = useState<AlertColor>("error");
  const router = useRouter();
  //declare refs
  const dialogRef = useRef(null);
  //ref for snackbar
  const snackbarRef = useRef(null);
  const confirmHandler = () => {
    const refState = dialogRef.current as any;
    refState.showDialog();
  };
  //confirm  action
  const confirmAction = async (confirm: boolean) => {
    if (!confirm) {
      const refState = dialogRef.current as any;
      refState.closeDialog();
    } else {
      const result = await action(param.row._id);
      const refState = dialogRef.current as any;
      refState.closeDialog();
      if (result) {
        setColor("success");
        setMsg("Action successful");
        const refState = snackbarRef.current as any;
        refState.handleClick();
        setTimeout(() => {
          router.reload();
        }, 6000);
      } else {
        setColor("error");
        setMsg("Action not Successful");
        const refState = snackbarRef.current as any;
        refState.handleClick();
      }
    }
  };

  return (
    <>
      {" "}
      <Box display={"none"}>
        <GenericDialog
          content={
            <GenericContent message="Are you sure you want to confirm?" />
          }
          actions={<GenericActions confirmAction={confirmAction} />}
          ref={dialogRef}
        />
      </Box>{" "}
      <SnackbarComponent msg={msg} color={color} ref={snackbarRef} />
      <IconButton
        onClick={confirmHandler}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ThumbUpIcon sx={{ color: theme.rent[1200] }} />
      </IconButton>
    </>
  );
}
export function UserDp({ param }: { param: any }) {
  if (!param.row.dpFileName) return <Avatar sx={{ width: 50, height: 50 }} />;
  return (
    <BlackAvatar
      src={`/api/multer/profile-pic/${param.row.dpFileName}`}
      width={50}
      height={50}
      alt="user Dp"
    />
  );
}
export function VerificationStatus({
  verification,
  userId,
}: {
  userId: string;
  verification: any;
}) {
  const imageDialogRef = useRef(null);
  //confirm verification action
  const action = async () => {
    const result = await verifyUser(userId);
    return result;
  };
  // if (
  //   verification &&
  //   (!verification.kycVerified ||
  //     !verification.idCardUrl ||
  //     !verification.capturedPhotoUrl)
  // )
  // return <GppBadIcon sx={{ color: "red" }} />;
  if (verification.kycVerified) return <VerifiedIcon sx={{ color: "green" }} />;
  return (
    <>
      <IconButton
        onClick={async () => {
          //call image dialog ref to update image dialog
          const refState = imageDialogRef.current as any;

          refState.updateSrc(
            `/api/multer/id-card/${verification.idCardUrl}`,
            verification.capturedPhotoUrl
          );
          refState.showDialog();
        }}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <BlackAvatar
          width={50}
          alt=""
          height={50}
          src={`/api/multer/id-card/${verification && verification.idCardUrl}`}
        />
      </IconButton>
      <ImageDialog receiverId={userId} action={action} ref={imageDialogRef} />
    </>
  );
}
export function WalletStatus({ userId }: { userId: string }) {
  const imageDialogRef = useRef(null);
  //confirm verification action
  const action = async () => {
    const result = await verifyUser(userId);
    return result;
  };
  const [walletPop, setWalletPop] = useState("");

  useEffect(() => {
    (async () => {
      if (userId) {
        const data = await getWallet(userId);
        setWalletPop(data && data.pop);
      }
    })();
  });
  if (!walletPop) return <p></p>;
  return (
    <>
      <IconButton
        onClick={async () => {
          //call image dialog ref to update image dialog
          const refState = imageDialogRef.current as any;

          refState.updateSrc(`/api/multer/wallet/${walletPop}`);
          refState.showDialog();
        }}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <BlackAvatar
          width={50}
          alt=""
          height={50}
          src={`/api/multer/wallet/${walletPop}`}
        />
      </IconButton>
      <AddMoneyImageDialog userId={userId} ref={imageDialogRef} />
    </>
  );
}
