import React from "react";
import { Container, Typography } from "@mui/material";
import Layout from "@/components/layout";
import Head from "next/head";

function MissionPage() {
  return (
    <Layout>
      <Head>
        <title>Rentals Mission</title>
      </Head>
      <main>
        <Container sx={{ mt: "1rem" }}>
          <Typography mt={1} mb={1} fontWeight={"bold"}>
            {" "}
            MISSION OF THE COMPANY:
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Our mission is to provide top-notch rental services that exceed
            customer expectations through innovation, reliability, and
            exceptional customer service. We aim to be the leading rental
            company in our industry by consistently delivering value and
            building long-term relationships with our clients.
          </Typography>
        </Container>
      </main>
    </Layout>
  );
}

export default MissionPage;
