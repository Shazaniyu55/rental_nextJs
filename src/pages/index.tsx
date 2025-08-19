import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import ErrorAlert from "@/components/alerts/error";
import HomeLogoutAppBar from "@/components/appbar/HomeLogoutAppBar";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { updatePageLoading } from "@/store/slices/userSlice";
import { AppDispatch, RootState } from "@/store";
import { Typography, Box, Card, CardContent, IconButton } from "@mui/material";
import Head from "next/head";
import Layout from "@/components/layout";
import HomePageStepper from "@/components/stepper/HomePageStepper";
import { Cancel } from "@mui/icons-material";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [showVideo, setShowVideo] = useState("block");
  const [muted, setMuted] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { pageLoading } = useSelector((state: RootState) => state.users);
  useEffect(() => {
    if (pageLoading) {
      dispatch(updatePageLoading(false));
    }
  }, [dispatch, pageLoading]);
  return (
    <Layout>
      <Head>
        <title>RENTALS - Home</title>
        <link rel="icon" href="smnk.jpg" type="image/x-icon" />
      </Head>
      <main>
        <HomePageStepper />
        
        <Box
          bgcolor={"black"}
          height={{ xs: 200, md: 300 }}
          width={{ xs: 200, md: 300 }}
          position={"fixed"}
          top={400}
          left={0}
          display={showVideo}
          zIndex={100}
        >
          <IconButton
            sx={{ color: "white" }}
            onClick={() => {
              setShowVideo("none");
              setMuted(true);
            }}
          >
            <Cancel/>
          </IconButton>
          <video
            width="100%"
            height="100%"
            muted={muted}
            // autoPlay={true}
            loop
            controls
            style={{ objectFit: "fill" }}
          >
            <source src="/assets/rental_vid.mp4" type="video/mp4" />
            <source src="/assets/rental_vid.mp4" type="video/ogg" />
            Your browser does not support the video tag.
          </video>
        </Box>

        {/* <*/}

 
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-start"}
          overflow={"scroll"}
          p={1}
          mb={5}
        >
          <Card
            sx={{
              bgcolor: "#2266BF",
              color: "white",
              minHeight: 250,
              minWidth: { xs: 300, md: 400, lg: 500 },
              maxWidth: { xs: 300, md: 400, lg: 500 },
              mr: 2,
              mb: 5,
            }}
          >
            <CardContent>
              <Typography variant="h6">How service fees are charged</Typography>
              <Typography>
                Each job comes with a fee, however the amount depends on how
                much money you would make from a customer. A 12% administrative
                cost fee would be applied to all skilled personnel.
              </Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              bgcolor: "green",
              color: "white",
              minHeight: 250,
              minWidth: { xs: 300, md: 400, lg: 500 },
              maxWidth: { xs: 300, md: 400, lg: 500 },
              mr: 2,
              mb: 5,
            }}
          >
            <CardContent>
              <Typography variant="h6">
                How your ranking impacts your success of landing jobs
              </Typography>
              <Typography>
                After completing each job, your review gauges how happy your
                clients are with your job. Your work rating affects how
                well-liked and trusted you are among clients.
              </Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              bgcolor: "#7E1120",
              color: "white",
              minHeight: 250,
              minWidth: { xs: 300, md: 400, lg: 500 },
              maxWidth: { xs: 300, md: 400, lg: 500 },
              mb: 5,
            }}
          >
            <CardContent>
              <Typography variant="h6">Improvement suggestions</Typography>
              <Typography>
                Before submitting your work, make sure you often review it to
                ensure it is error-free. Before you start, take some time to go
                through what your clients want you to deliver.
              </Typography>
            </CardContent>
          </Card>
        </Box>

       
      </main>
    </Layout>
  );
}







const PlayerComponent = () => {
  const [fullscreenMode, setFullscreenMode] = useState(false);
  let player: any;
  const ref = (p: any) => {
    player = p;
  };

  const onStart = () => {
    setFullscreenMode(true);
  };

  const onEnded = () => {
    setFullscreenMode(document.fullscreenElement !== null);
  };

  return (
    <ReactPlayer
      ref={ref}
      url="/assets/rental_vid.mp4"
      onStart={onStart}
      onEnded={onEnded}
      playing
      loop
    />
  );
};
