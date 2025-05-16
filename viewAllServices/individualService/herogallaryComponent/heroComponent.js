import React from "react";
import { Box, Typography, Grid } from "@mui/material";

const images = [
  "https://picsum.photos/id/1018/400/300",
  "https://picsum.photos/id/1020/400/300",
  "https://picsum.photos/id/1035/400/300",
  "https://picsum.photos/id/1043/400/300",
  "https://picsum.photos/id/1060/400/300",
  "https://picsum.photos/id/1070/400/300"
];

const HeroComponent = () => {
  return (
    <Box
      sx={{
        width: "100%",
        boxSizing: "border-box",  // ensures border is counted inside the width
        textAlign: "center",
        overflowX: "hidden",
      }}
    >
      {/* Title and Description */}
      <Typography variant="h3" sx={{ marginBottom: "10px" }}>
        Welcome to Our Gallery
      </Typography>
      <Typography
        variant="body1"
        sx={{ marginBottom: "20px", maxWidth: "800px", margin: "auto" }}
      >
        Explore a collection of stunning images that showcase our work. Each piece
        tells a unique story, capturing moments in a visually engaging way.
      </Typography>

      {/* Image Grid */}
      <Grid
        container
        spacing={3}
        justifyContent="center"
        sx={{ overflow: "hidden", maxWidth: "100%" }}
      >
        {images.map((image, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={index}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Box
              component="img"
              src={image}
              alt={`Gallery Image ${index + 1}`}
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)"
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HeroComponent;
