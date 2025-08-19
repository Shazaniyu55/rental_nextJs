"use client";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Head from "next/head";
import Providers from "@/store/provider";
import { ErrorBoundary } from "react-error-boundary";
import ErrorAlert from "@/components/alerts/error";
import axios from "axios";


declare module "@mui/material/styles" {
  interface Theme {
    rent: {
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
      1000: string;
      1100: string;
      1200: string;
      1300: string;
      1400: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    rent: {
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
      1000: string;
      1100: string;
      1200: string;
      1300: string;
      1400: string;
    };
  }
  interface PaletteColor {
    light: string;
    main: string;
    dark: string;
  }
  interface PaletteOptions {}
};


const rentColors = {
  100: "#ECEDFD",
  200: "#C7C8FA",
  300: "#A1A3F7",
  400: "#00B98E",
  500: "#01a07bff",
  600: "#05b48b80",
  700: "#00B98E",
  800: "#OBOD83",
  900: "#52ca0cdc",
  1000: "#205e08ff",
  1100: "#07084B",
  1200: "#205e08ff",
  1300: "#04023B",
  1400: "#030426",
};

export const theme = createTheme({
  rent: rentColors,
  palette: {
    primary: {
      main: rentColors[1200],
      light: rentColors[100],
      dark: rentColors[1200],
    },
    info: {
      main: rentColors[500],
    },
  },
});


const logError = async (error: Error, info: { componentStack: string }) => {
  // Do something with the error, e.g. log to an external API
  try {
    const res = await axios({
      method: "POST",
      url: `${process.env.RENTALS_URL}/api/error`,
      data: { msg: error.toString(), info },
    });
  } catch (err) {}
};

function fallbackRender({ error, resetErrorBoundary }: any) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.
  //resetErrorBoundary();
  return <ErrorAlert message={error.toString()} />;
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <CssBaseline />
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>    
          {/* <SmnkBackDrop /> */}
          <Providers>
          <Component {...pageProps} />

          </Providers>
        
      
    </>
  );
}


export function SmnkErrorBoundary({ children }: any) {
  return (
    <ErrorBoundary fallbackRender={fallbackRender} onError={logError}>
      {children}
    </ErrorBoundary>
  );
}





