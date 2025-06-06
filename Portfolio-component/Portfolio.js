import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, useMediaQuery } from "@mui/material";
import { Carousel } from "react-responsive-carousel"; // Import Carousel component
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import styles for the carousel
import API_URLS from "../services/ApiUrl";
import ApiService from "../services/ApiService";
import "./Portfolio.css"; // Import the custom styles
import { Margin } from "@mui/icons-material";

const Portfolio = ({isDarkMode}) => {
  const [portfoliodata, setPortfolio] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useMediaQuery("(max-width:600px)"); // Adjust based on your needs

  // Fetch portfolio data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ApiService.get(API_URLS.GET_SELECTED_PORTFOLIO);
        setPortfolio(response.data || response); // Ensure correct data format
        console.log("Fetched Portfolio Data:", response);
      } catch (error) {
        console.error("Error fetching portfolio data:", error);
      }
    };
    fetchData();
  }, []);

  console.log("Portfolio Data:", portfoliodata); // Debugging log

  // Handle carousel index change
  const handleChange = (index) => {
    setActiveIndex(index);
  };

  return (
    <Box className={`carousel-container ${isDarkMode ? 'dark-mode-section' : 'BaseColours'}`}>
      {/* Title and Description */}
      <Box className="carousel-header">
        <Typography variant="h3" className="carousel-title">
          Portfolio
        </Typography>
        <Typography variant="body1" className="carousel-description">
          Explore our exclusive collection of products tailored to your needs and preferences.
        </Typography>
        <div style={{ marginTop: "10px",textAlign:"right", marginRight:"5%" }}>
      <button className={`meadiamButton ${isDarkMode ? 'meadiamButton-darkmode' : ''}`}>View All portfolios</button>
      </div>
      </Box>
      

      {/* Carousel */}
      <Carousel
        showArrows={true}
        showThumbs={false} // Disable thumbnails
        infiniteLoop={true} // Enable infinite loop
        showStatus={false} // Hide status (1 of 3, etc.)
        emulateTouch={true} // Enable touch/swipe gestures
        selectedItem={activeIndex}
        onChange={handleChange} // Track slide changes
      >
        {portfoliodata?.length > 0 ? (
          portfoliodata.map((product, index) => (
            <Box key={index} className={`carousel-slide ${activeIndex === index ? "active" : ""}`}>
              <Grid container className="carousel-content">
                {/* Image Section */}
                <Grid item xs={12} sm={6} className={`image-section ${isMobile ? "mobile" : ""} ${activeIndex === index ? "slideInLeft" : ""}`}>
                  <img className="imagesize"
                    src={product.portfolioImage || "https://via.placeholder.com/300"}
                    alt={`Product ${index + 1}`}
                    onError={(e) => (e.target.src = "https://via.placeholder.com/300")} // Handle broken images
                  />
                </Grid>

                {/* Text Section */}
                <Grid item xs={12} sm={6} className={`text-section ${isMobile ? "mobile" : ""} ${activeIndex === index ? "slideInRight" : ""}`}>
                  {product.portfolioDescription.split(". ").map((line, idx) => (
                    <Typography key={idx} variant="body1">
                      {line}
                    </Typography>
                  ))}
                </Grid>
              </Grid>
            </Box>
          ))
        ) : (
          <Typography variant="h5" align="center">
            No portfolio data available.
          </Typography>
        )}
      </Carousel>
      
    </Box>
  );
};

export default Portfolio;
