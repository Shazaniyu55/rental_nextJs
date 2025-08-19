import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Box from "@mui/material/Box";

type ImageType = { id: number; src: string };

const images: ImageType[] = [
  { id: 1, src: "/assets/property-1.jpg" },
  { id: 2, src: "/assets/property-2.jpg" },
  { id: 3, src: "/assets/property-3.jpg" },
  { id: 4, src: "/assets/property-4.jpg" },
  { id: 5, src: "/assets/property-5.jpg" },
  { id: 6, src: "/assets/property-6.jpg" },
];

function HomePageStepper() {
  const [activeStep, setActiveStep] = React.useState(0);

  // Auto play every 4 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        height: { xs: "50vh", md: "70vh", lg: "80vh" },
        position: "relative",
        overflow: "hidden",
      }}
    >
      <AnimatePresence>
        <motion.img
          key={images[activeStep].id}
          src={images[activeStep].src}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        />
      </AnimatePresence>
    </Box>
  );
}

export default HomePageStepper;
