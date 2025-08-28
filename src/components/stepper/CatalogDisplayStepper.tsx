"use client"; // ensure this runs only on client

import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { Box, CardMedia, useMediaQuery, Typography } from "@mui/material";
import ReactPlayer from "react-player";
import { pdfjs } from "react-pdf";
import dynamic from "next/dynamic";
import workerSrc from "pdfjs-dist/build/pdf.worker.mjs"; // ✅ correct worker entry
import { SmnkErrorBoundary, theme } from "@/pages/_app";
import { BlackImageFrame } from "../avatar/DashboardDp";
import AddFloatingActionButtons from "../fab/Add";
import { useRouter } from "next/router";
import ViewOnlyImageDialog from "../dialog/ViewOnlyImageDialog";

// configure react-pdf worker safely
if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;
}

// dynamically import to disable SSR for PDF rendering
const Document = dynamic(
  () => import("react-pdf").then((mod) => mod.Document),
  { ssr: false }
);
const Page = dynamic(
  () => import("react-pdf").then((mod) => mod.Page),
  { ssr: false }
);

function CatalogDisplayStepper({
  catalog,
  forClient,
}: {
  forClient: boolean;
  catalog: any[];
}) {
  const imageDialogRef = React.useRef(null);
  const router = useRouter();

  return (
    <SmnkErrorBoundary>
      <Box
        p={1}
        bgcolor={"#000000"}
        maxWidth={"100%"}
        minWidth={"100%"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"flex-start"}
        gap={1}
        flexWrap={"wrap"}
      >
        {!forClient && (
          <AddFloatingActionButtons
            handleClick={() => {
              router.push("/dashboard/catalog/add");
            }}
          />
        )}
        {catalog &&
          catalog.length > 0 &&
          catalog.map((cat: Cat) => (
            <Box
              key={cat.filename}
              onClick={() => {
                const refState = imageDialogRef.current as any;
                refState.updateSrc(`/api/multer/catalog/${cat.filename}`);
                refState.showDialog();
              }}
            >
              <BlackImageFrame
                borderColor={theme.rent[1200]}
                width={70}
                height={70}
                alt={cat.title}
                src={`/api/multer/catalog/${cat.filename}`}
              />
            </Box>
          ))}
      </Box>
      <ViewOnlyImageDialog ref={imageDialogRef} />
    </SmnkErrorBoundary>
  );
}

type Cat = {
  title: string;
  filename: string;
  description: string;
  contentType: string;
};

export default CatalogDisplayStepper;

export function CatalogCard({ cat }: { cat: Cat }) {
  const [numPages, setNumPages] = React.useState<number | null>(null);
  const [pageNumber, setPageNumber] = React.useState(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  const newTheme = useTheme();
  const xs = useMediaQuery(newTheme.breakpoints.down("sm"));
  const sm = useMediaQuery(newTheme.breakpoints.between(600, 900));

  if (!cat) return null;

  return (
    <Box
      sx={{
        maxWidth: "100%",
        minWidth: "100%",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        flexDirection: "column",
        minHeight: 300,
      }}
    >
      {cat.contentType?.startsWith("video") && (
        <ReactPlayer
          url={`/api/multer/catalog/${cat.filename}`}
          controls
          width={250}
          height={200}
        />
      )}

      {cat.contentType?.startsWith("audio") && (
        <ReactPlayer
          url={`/api/multer/catalog/${cat.filename}`}
          controls
          width={250}
          height={200}
        />
      )}

      {cat.contentType?.startsWith("image") && (
        <CardMedia
          sx={{
            maxHeight: { xs: 300, sm: 400, md: 500 },
            minHeight: { xs: 300, sm: 400, md: 500 },
            width: "100%",
            color: "black",
          }}
          image={`/api/multer/catalog/${cat.filename}`}
          title={cat.title}
        />
      )}

      {cat.filename?.endsWith(".pdf") && (
        <Box overflow="auto" maxHeight={400} minHeight={400}>
          <Document
            file={`/api/multer/catalog/${cat.filename}`}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} width={xs ? 350 : sm ? 600 : 900} />
          </Document>
        </Box>
      )}

      <Box p={2}>
        <Typography fontWeight="bold" variant="subtitle1">
          Description:
        </Typography>
        <Typography textTransform="capitalize" variant="caption">
          {cat.description}
        </Typography>
      </Box>
    </Box>
  );
}
