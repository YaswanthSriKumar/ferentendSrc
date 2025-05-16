import React from 'react';
import { Box, Typography } from '@mui/material';
import './aboutus.css'; // Import the CSS file

const AboutUs = ({isDarkMode}) => {
  // Data with counts and text
  const data = {
    item1: { count: 10, text: 'Item 1' },
    item2: { count: 20, text: 'Item 2' },
    item3: { count: 30, text: 'Item 3' },
    item4: { count: 40, text: 'Item 4' },
  
  };

  return (
    <Box  className={` about-us-container ${isDarkMode ? 'dark-mode-section' : ''}`}>
      {/* Heading for About Us */}
      <Typography variant="h3" className="heading">
        About Us
      </Typography>

      {/* Centered sentence */}
      <Typography variant="h6" className="subheading">
        We are passionate about providing high-quality products to our customers.
      </Typography>

      {/* Count and text items */}
      <Box className="count-text-container">
        {Object.entries(data).map(([key, value], index) => (
          <Box key={index} className="count-text-item">
            <Typography className={`${isDarkMode ? 'count-dark' : 'count'}`}>{value.count}</Typography>
            <Typography className="text">{value.text}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default AboutUs;
