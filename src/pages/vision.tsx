import React from "react";
import { Container, Typography } from "@mui/material";
import Layout from "@/components/layout";
import Head from "next/head";

function VisionPage() {
  return (
    <Layout>
      <Head>
        <title>Rentals Vision</title>
      </Head>
      <main>
        <Container sx={{ mt: "1rem" }}>
          <Typography mt={1} mb={1} fontWeight={"bold"}>
            {" "}
            VISION OF THE COMPANY:
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Our vision is to be the most trusted and preferred rental service
            provider, recognized for our commitment to excellence, innovation,
            and customer satisfaction. We aspire to create a seamless rental
            experience that empowers individuals and businesses to access the
            resources they need to thrive in a dynamic world.
          </Typography>
          <Typography mt={1} mb={1} fontWeight={"bold"}>
            {" "}
            Value Statement:
          </Typography>{" "}
          <Typography variant="body2" color="text.secondary">
            At Rentals, we value integrity, customer-centricity, innovation,
            reliability, and teamwork. We are dedicated to upholding the highest
            ethical standards in all our interactions, fostering a culture of
            collaboration and continuous improvement, and delivering exceptional
            value to our customers and stakeholders.
          </Typography>
        </Container>
      </main>
    </Layout>
  );
}

export default VisionPage;
