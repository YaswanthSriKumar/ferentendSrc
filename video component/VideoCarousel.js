import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles

const VideoCarousel = ({isDarkMode}) => {
  return (
    <Box sx={{ width: "100%", margin: "0 auto",  }}>
      <Carousel
        showArrows={true}
        showThumbs={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={3000}
        transitionTime={500}
        showStatus={false} // Disable pagination
      >
        {/* Video Slide */}
        {["/videos/11898683_1920_1080_25fps.mp4", "/videos/gears.mp4", "/videos/3dprinting2.mp4"].map((videoSrc, index) => (
          <Box key={index} sx={{ position: "relative", overflow: "hidden" }}>
            {/* Video */}
            <video
              style={{
                width: "100%",
                height: "100vh",
                objectFit: "cover",
              }}
              muted
              loop
              autoPlay
            >
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Overlay with Opacity + Text */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100vh",
                backgroundColor: "rgba(0, 0, 0, 0.4)", // Black with 70% opacity
                display: "flex",
                flexDirection: "column", // Stack Typography components
                alignItems: "flex-start", // Align text to the left
                justifyContent: "center", // Center vertically
                paddingLeft: "5%", // Adjust left position
              }}
            >
              <Typography variant="h4" className= {` ${isDarkMode ? 'plaintext-darkmode' : 'plaintext'}`} >
                Here is the best site for you
              </Typography>
              <Typography variant="h5" className= {` ${isDarkMode ? 'plaintext-darkmode' : 'plaintext'}`} sx={{ marginTop: "10px" }}>
                Get all the services and products you need in one place, in our place  
                <Button 
                variant="contained"
                sx={{ color: "white", bgcolor:"transparent", border: "1px solid white", ml:"10px"}}
                >click here</Button>
              </Typography>
              
            </Box>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default VideoCarousel;
