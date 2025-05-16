import React from "react";
import { Box, Typography, Tooltip } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// Import required icons
import SendIcon from "@mui/icons-material/Send";
import ScienceIcon from "@mui/icons-material/Science";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PrintIcon from "@mui/icons-material/Print";
import BuildIcon from "@mui/icons-material/Build";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

// Process steps data
const processSteps = [
  {
    icon: <SendIcon fontSize="large" color="primary" />,
    title: "Send File",
    details: "Upload or send your file for processing."
  },
  {
    icon: <ScienceIcon fontSize="large" color="primary" />,
    title: "Review",
    details: "Our team reviews your submission for accuracy and quality."
  },
  {
    icon: <MonetizationOnIcon fontSize="large" color="primary" />,
    title: "Quote",
    details: "Receive a competitive quote based on your project requirements."
  },
  {
    icon: <PrintIcon fontSize="large" color="primary" />,
    title: "Print",
    details: "Your project is printed using high-quality standards."
  },
  {
    icon: <BuildIcon fontSize="large" color="primary" />,
    title: "Post-processing",
    details: "Final adjustments and processing ensure perfect results."
  },
  {
    icon: <LocalShippingIcon fontSize="large" color="primary" />,
    title: "Delivery",
    details: "Your completed project is delivered to your doorstep."
  }
];

const ProcessFlow = () => {
  return (
    <Box
      sx={{
        width: "100%",
        p: 2,
        overflowX: "hidden",
        boxSizing: "border-box" // Ensure padding is included in the width
      }}
    >
      {/* Heading */}
      <Typography variant="h3" sx={{ textAlign: "center", mb: 3 }}>
        Process Flow
      </Typography>

      {/* Steps layout */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 2,
          boxSizing: "border-box" // Make sure inner container doesn't exceed width
        }}
      >
        {processSteps.map((step, index) => (
          <React.Fragment key={index}>
            {/* Step: Icon and Title with Tooltip */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {step.icon}
              <Tooltip
                title={step.details}
                placement="top"
                componentsProps={{
                  tooltip: {
                    sx: {
                      p: 3,             // Increased padding
                      minWidth: 300,    // Increased minimum width
                      maxWidth: 400,    // Increased maximum width, adjust as needed
                      border: "1px solid #ccc",
                      backgroundColor: "white",
                      color: "black",
                      fontSize: "15px"
                    }
                  }
                }}
              >
                <Typography variant="h6" sx={{ cursor: "pointer" }}>
                  {step.title}
                </Typography>
              </Tooltip>
            </Box>
            {/* Render arrow except after the last step */}
            {index < processSteps.length - 1 && (
              <ArrowForwardIcon color="action" sx={{ fontSize: "2rem" }} />
            )}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
};

export default ProcessFlow;
