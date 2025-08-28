import React from "react";
import {

  Container,
  Divider,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from "@mui/material";
import Layout from "@/components/layout";
import Head from "next/head";

function TeamPage() {
  return (
    <Layout>
      <Head>
        <title>Rentals Team</title>
      </Head>
      <main>
        <Container sx={{ mt: "1rem" }}>
          <Typography mt={1} mb={1} fontWeight={"bold"}>
            {" "}
            Meet Our Team:
          </Typography>
          <CEO />
          <Divider />
          {/* <Admin /> */}
          <Divider />
          {/* <PRO /> */}
        </Container>
      </main>
    </Layout>
  );
}

export const CEO = () => {
  return (
    <Card sx={{ maxWidth: 345, mt: "1rem" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="400"
          image="/assets/niyu.jpg"
          alt="GBADAMOSI SHAZANIYU KADIRI- RENTALS CEO"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            GBADAMOSI SHAZANIYU KADIRI 
          </Typography>
          <Typography fontWeight={"bold"}>Bio:</Typography>
          <Typography variant="body2" color="text.secondary">
            Gbadamosi Shazaniyu Kadiri is the Chief Executive Officer(CEO) of
            Rentals. He is a graduate of physiology from the prestigious
            Lagos State University. He is a seasoned Software
            Developer and a Techpreneur with over 5 years experience in the
            field. He is also a serial entrepreneur with interest in real estate
            and agriculture.
          </Typography>
          <Typography fontWeight={"bold"} m={1}>
            Philosophy about Life:
          </Typography>
          <i>
            {" "}
            Life is a journey with problems to solve, lessons to learn, but most
            of all, experiences to enjoy.
          </i>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const Admin = () => {
  return (
    <Card sx={{ maxWidth: 345, mt: "1rem" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="400"
          image="/assets/smnk_sec.jpg"
          alt="Anumba, Ogochukwu Mildred - SMNK Admin"
        />
        <CardContent>
          <Typography fontWeight={"bold"}>Bio:</Typography>
          Anumba, Ogochukwu Mildred is the Administrative Director(A.D)/Sectary
          of the Company. She read Computer Science/Science Education from the
          prestigious Nnamdi Azikiwe University, Awka with bias in Data Science.
          She is a fine graphic developer and content creator.
          <Typography fontWeight={"bold"} m={1}>
            Philosophy about Life:
          </Typography>
          <i>
            {" "}
            Replace your fears of failure with the resilience to face them.
            Failure is important in the journey to success because it teaches
            you lessons no one else would. It teaches you to appreciate your
            success.
          </i>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const PRO = () => {
  return (
    <Card sx={{ maxWidth: 345, mt: "1rem" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="400"
          image="/assets/smnk_pro.jpg"
          alt="Alidu, Ojonugbede Samuel - D.A.P"
        />
        <CardContent>
          <Typography fontWeight={"bold"}>Bio:</Typography>
          Alidu, Ojonugbede Samuel read Theatre and Film Studies at the
          University of Nigeria, Nsukka and Kogi State University-Anyigba
          respectively.{" "}
          <p>
            {` He is the company's Director of Advertorials and Publicity(D.A.P).`}
          </p>{" "}
          He specializes as an Applied Theatre Developer and Strategic
          Communications Expert dealing with human content development and a
          security strategist.
          <Typography fontWeight={"bold"} m={1}>
            Philosophy about Life:
          </Typography>
          <i>
            {" "}
            {`Even when all the buses don't go my way, I win; always. I have no
          excuses for failure, hence; I take responsibility for my life and
          actions.`}
          </i>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default TeamPage;
