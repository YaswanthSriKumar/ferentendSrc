import React from "react";
import { Box, Typography, Grid, Card } from "@mui/material";

// Import the icons from Material UI Icons
import HandymanIcon from "@mui/icons-material/Handyman";             // Material Operations
import AdjustIcon from "@mui/icons-material/Adjust";                 // Precision Tolerance
import InventoryIcon from "@mui/icons-material/Inventory";           // Volume Flexibility
import FlashOnIcon from "@mui/icons-material/FlashOn";               // Rapid Turnaround
import StarsIcon from "@mui/icons-material/Stars";                   // Surface Finishing
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile"; // File Compatibility

// Data for capabilities
const capabilities = [
  {
    icon: <HandymanIcon fontSize="large" color="primary" />,
    title: "Material Operations",
    description: "Efficient processes and operations in materials management.",
  },
  {
    icon: <AdjustIcon fontSize="large" color="primary" />,
    title: "Precision Tolerance",
    description: "High standards ensuring minimal deviation and maximum accuracy.",
  },
  {
    icon: <InventoryIcon fontSize="large" color="primary" />,
    title: "Volume Flexibility",
    description: "Adaptable production volumes based on demand.",
  },
  {
    icon: <FlashOnIcon fontSize="large" color="primary" />,
    title: "Rapid Turnaround",
    description: "Fast delivery and quick execution to get your project done.",
  },
  {
    icon: <StarsIcon fontSize="large" color="primary" />,
    title: "Surface Finishing",
    description: "High-quality finishing touches that elevate your product.",
  },
  {
    icon: <InsertDriveFileIcon fontSize="large" color="primary" />,
    title: "File Compatibility",
    description:
      "Seamless integration with standard file formats for easy processing.",
  },
];

const Capability = () => {
  return (
    <Box sx={{ py: 4, px: 2, boxSizing: "border-box" }}>
      {/* Title (centered) */}
      <Typography
        variant="h3"
        sx={{ mb: "10px", textAlign: "center" }}
      >
        Capability
      </Typography>

      {/* Grid container with items stretching to the same height */}
      <Grid container spacing={2} alignItems="stretch">
        {capabilities.map((cap, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} sx={{ display: "flex" }}>
            <Card
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                p: 2,
                boxSizing: "border-box",
              }}
            >
              {/* Top: Icon and Title side by side */}
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                {cap.icon}
                <Typography variant="h6" sx={{ ml: 1 }}>
                  {cap.title}
                </Typography>
              </Box>

              {/* One-line Description */}
              <Typography variant="body2" color="text.secondary">
                {cap.description}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Capability;
