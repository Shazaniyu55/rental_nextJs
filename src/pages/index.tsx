import { Geist, Geist_Mono } from "next/font/google";
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
import CatalogStepper from "@/components/stepper/CatalogStepper";
import ScrollTriggered from "@/components/stepper/card2";
import CatalogDisplayStepper from "@/components/stepper/CatalogDisplayStepper";


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

        <ScrollTriggered/>

 
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
              bgcolor: "#000000ff",
              color: "white",
              minHeight: 250,
              minWidth: { xs: 300, md: 400, lg: 500 },
              maxWidth: { xs: 300, md: 400, lg: 500 },
              mr: 2,
              mb: 5,
            }}
          >
            <CardContent>
              <Typography variant="h6">Become An Agent</Typography>
              <Typography>
                At Rentals, we believe in empowering individuals to take control
                of their careers and achieve financial independence. That's why
                we offer a comprehensive agent program that provides all the
                tools and resources needed to succeed in the real estate
                industry. As an agent with Rentals, you'll have access to a wide
                range of properties, competitive commission rates, and ongoing
                training and support to help you grow your business.
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
                Comfortable Homes and offices
              </Typography>
              <Typography>
                At Rentals, we understand the importance of having a comfortable
                and safe place to call home or work. That's why we offer a wide
                range of rental properties that are designed to meet the needs
                of our clients. From cozy apartments to spacious offices, we
                have something for everyone. Our properties are well-maintained
                and equipped with all the necessary amenities to ensure a
                comfortable living or working experience.
              </Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              bgcolor: "#8209a3ff",
              color: "white",
              minHeight: 250,
              minWidth: { xs: 300, md: 400, lg: 500 },
              maxWidth: { xs: 300, md: 400, lg: 500 },
              mb: 5,
            }}
          >
            <CardContent>
              <Typography variant="h6">Best Propert</Typography>
              <Typography>
                At Rentals, we strive to provide the best properties for our
                clients. Our extensive catalog includes a wide range of options
                to suit every need and budget. Whether you're looking for a
                cozy apartment or a spacious house, we have something for
                everyone. Our team of experts is dedicated to helping you find
                the perfect property that meets your requirements.
              </Typography>
            </CardContent>
          </Card>
        </Box>
{/* <CatalogDisplayStepper forClient={false} catalog={[]}/> */}
<CatalogStepper/>
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
