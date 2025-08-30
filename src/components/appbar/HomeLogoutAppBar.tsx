import { useState, useEffect } from "react";
import Toolbar from "@mui/material/Toolbar";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import AccountActions from "../home/navbar/actions";
import { Grid, Box, Skeleton } from "@mui/material";
import { useRouter } from "next/router";
import LogoutSwitch from "../switch/LogoutSwitch";
import DashboardDp from "../avatar/DashboardDp";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { updatePageLoading } from "@/store/slices/userSlice";
import SearchBox from "../autoComplete/SearchBox";

export default function HomeLogoutAppBar() {
  const router = useRouter();
  return (
    <Toolbar sx={{ bgcolor: "#fffefeff" }}>
      <Grid container>
        {/* <Grid
          item
          xs={2}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-start"}
        >
          <AppBarLogo />
        </Grid> */}
        <Grid
          item
          xs={2}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-end"}
        >
          <SearchBox/>
        </Grid>

        <Grid
          item
          xs={10}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-end"}
        >
          {" "}
          <DpAndAccounts />
        </Grid>
      </Grid>
    </Toolbar>
  );
}
export function AppBarLogo() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  return (
    <Box pt={2}>
      <Image
        alt="rental logo"
        src="/assets/logo.png"
        width={70}
        height={70}
        style={{ marginRight: ".5rem",  }}
        onClick={() => {
          dispatch(updatePageLoading(true));
          router.push("/");
        }}
      />
    </Box>
  );
}
export function DpAndAccounts() {
  const { _id } = useSelector((state: RootState) => state.users.user);
  const [userId, setUserId] = useState<any>(null);

  useEffect(() => {
    setUserId(_id);
  }, [_id]);
  return (
    <>
      {userId === null ? (
        <>
          <Skeleton
            variant="rectangular"
            width={100}
            height={30}
            animation="wave"
          />
          <Skeleton
            variant="circular"
            width={50}
            height={50}
            animation="wave"
          />
        </>
      ) : userId ? (
        <>
          <LogoutSwitch />
          <DashboardDp  />
        </>
      ) : (
        <AccountActions />
      )}
    </>
  );
}
