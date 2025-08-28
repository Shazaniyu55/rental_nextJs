import React from "react";
import { Container, Typography } from "@mui/material";
import Layout from "@/components/layout";
import Head from "next/head";

function AboutUsPage() {
  return (
    <Layout>
      <Head>
        <title>About Us</title>
      </Head>
      <main>
        <Container sx={{ mt: "1rem" }}>
          <Typography mt={1} mb={1} fontWeight={"bold"}>
            About Rentals:
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Rentals is an online platform that connects skilled professionals
            with clients seeking their services. Our goal is to make it easy for
            individuals and businesses to find reliable and competent service
            providers for various needs, ranging from home repairs and
            maintenance to event planning and personal services.
          </Typography>
          <Typography> The objectives of the company are</Typography>
          <ol>
            <li>
              Provide a platform where people sell propertys, goods, and services.
            </li>
            <li>
              Connect Agent to Customers for easy access to services.
            </li>
            <li>
              Reduce the stress of endlessly searching for Land and Property to
              rent or buy.
            </li>
            <li>Provide a platform for individuals to be self-reliant.</li>
            <li>
              Provide a platform for individuals to be employers of labor.
            </li>
          </ol>
          <Typography mt={2}>
            We are committed to ensuring a seamless experience for both service
            providers and clients, fostering trust and satisfaction in every
            interaction.
          </Typography>
        </Container>
      </main>
    </Layout>
  );
}

export default AboutUsPage;
