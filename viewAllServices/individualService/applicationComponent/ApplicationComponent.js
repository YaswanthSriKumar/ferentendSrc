import React, { useState } from "react";
import { Box, Typography } from "@mui/material";

// Dummy data (safe images from picsum.photos)
const applicationItems = [
  {
    image: "https://picsum.photos/seed/app1/800/500",
    title: "Application 1",
    description:
      "Description for Application 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    image: "https://picsum.photos/seed/app2/800/500",
    title: "Application 2",
    description:
      "Description for Application 2. Suspendisse potenti. Sed euismod leo at nisi auctor."
  },
  {
    image: "https://picsum.photos/seed/app3/800/500",
    title: "Application 3",
    description:
      "Description for Application 3. Phasellus eget quam eu orci facilisis tincidunt."
  },
  {
    image: "https://picsum.photos/seed/app4/800/500",
    title: "Application 4",
    description:
      "Description for Application 4. Nullam id elit non mi porta gravida in eget metus."
  },
  {
    image: "https://picsum.photos/seed/app5/800/500",
    title: "Application 5",
    description:
      "Description for Application 5. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum."
  }
];

// Helper function: Computes a circular relative index for each slide.
const getRelativeIndex = (index, active, total) => {
  let d = index - active;
  if (d > total / 2) d -= total;
  if (d < -total / 2) d += total;
  return d;
};

// Updated positions based on scaling up the previous values for a 1000px wide container.
const positions = {
  "-2": { left: 28, width: 244, zIndex: 1 },
  "-1": { left: 150, width: 310, zIndex: 2 },
  "0":  { left: 305, width: 390, zIndex: 3 },
  "1":  { left: 538, width: 310, zIndex: 2 },
  "2":  { left: 727, width: 244, zIndex: 1 }
};

const Application = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const total = applicationItems.length;
  const containerWidth = 1000; // Increased container width

  return (
    <Box
      sx={{
        width: "100%",
        p: 3,
        position: "relative",
        boxSizing: "border-box",
        backgroundColor: "background.paper",
        boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
        borderRadius: 2,
      }}
    >
      {/* Heading */}
      <Typography
        variant="h3"
        sx={{
          textAlign: "center",
          mb: 4,
          fontWeight: "bold",
          letterSpacing: 1,
          borderBottom: "2px solid",
          pb: 1,
        }}
      >
        Application
      </Typography>

      {/* Wrap the Carousel Container in a parent Box to ensure centering */}
      <Box sx={{ display: "flex",justifyContent:"center",}}>
        {/* Carousel Container */}
        <Box
          sx={{
            position: "relative",
            width: containerWidth,
            height: 400, // Increased height for larger images
            overflow: "visible",
            // Centering transform; scaled responsively
            transformOrigin: "top center",
           
          }}
        >
          {applicationItems.map((item, index) => {
            const d = getRelativeIndex(index, selectedIndex, total);
            if (Math.abs(d) > 2) return null; // Only show slides with |d| <= 2
            const pos = positions[d.toString()];
            return (
              <Box
                key={index}
                onClick={() => {
                  if (d !== 0) setSelectedIndex(index);
                }}
                sx={{
                  position: "absolute",
                  left: pos.left,
                  width: pos.width,
                  top: "50%",
                  transform: "translateY(-50%)",
                  transition: "all 0.5s ease",
                  zIndex: pos.zIndex,
                  cursor: d === 0 ? "default" : "pointer",
                  borderRadius: 2,
                  "&:hover": {
                    transform: "translateY(-50%) scale(1.05)",
                  },
                }}
              >
                {/* Title on the upper side (outside the image) */}
                <Box sx={{ textAlign: "center", mb: 1 }}>
                  <Typography variant="subtitle1">
                    {item.title}
                  </Typography>
                </Box>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    display: "block",
                  }}
                />
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* Description Section */}
      <Box sx={{ mt: 3, textAlign: "center", px: 2 }}>
        <Typography variant="body1">
          {applicationItems[selectedIndex].description}
        </Typography>
      </Box>
    </Box>
  );
};

export default Application;
