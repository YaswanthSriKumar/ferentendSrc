import React from 'react';
import { Box, Typography, Grid, IconButton } from '@mui/material';
import { Facebook, Twitter, LinkedIn, MailOutline } from '@mui/icons-material';
import { Link } from 'react-router-dom';  // Assuming you're using React Router for navigation

const Footer = () => {
  return (
    <Box sx={{
      backgroundColor: '#222',
      color: 'white',
      padding: '20px 0',
      marginTop: 'auto',
    }}>
      <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
        {/* Left Column: About Us */}
        <Grid item xs={12} sm={3} sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ marginBottom: '10px' }}>About Us</Typography>
          <Link to="/about-us" style={{ color: 'white', textDecoration: 'none' }}>
            <Typography variant="body2">Learn more about our story</Typography>
          </Link>
        </Grid>

        {/* Middle Column: Contact Details */}
        <Grid item xs={12} sm={3} sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ marginBottom: '10px' }}>Contact Details</Typography>
          <Typography variant="body2">123 Street Name</Typography>
          <Typography variant="body2">City, Country</Typography>
          <Typography variant="body2">Phone: (123) 456-7890</Typography>
          <Typography variant="body2">Email: contact@example.com</Typography>
        </Grid>

        {/* Right Column: Social Links */}
        <Grid item xs={12} sm={3} sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ marginBottom: '10px' }}>Follow Us</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <IconButton color="inherit" component="a" href="https://facebook.com" target="_blank">
              <Facebook />
            </IconButton>
            <IconButton color="inherit" component="a" href="https://twitter.com" target="_blank">
              <Twitter />
            </IconButton>
            <IconButton color="inherit" component="a" href="https://linkedin.com" target="_blank">
              <LinkedIn />
            </IconButton>
          </Box>
        </Grid>

        {/* Bottom Column: Write to Us */}
        <Grid item xs={12} sx={{ textAlign: 'center', marginTop: '20px' }}>
          <Typography variant="h6" sx={{ marginBottom: '10px' }}>Write to Us</Typography>
          <Link to="/contact" style={{ color: 'white', textDecoration: 'none' }}>
            <IconButton color="inherit">
              <MailOutline />
            </IconButton>
            <Typography variant="body2">Get in touch with us</Typography>
          </Link>
        </Grid>
      </Grid>

      {/* Copyright Section */}
      <Box sx={{
        textAlign: 'center',
        marginTop: '20px',
        paddingTop: '10px',
        borderTop: '1px solid #444',
      }}>
        <Typography variant="body2">© 2025 Your Company Name. All Rights Reserved.</Typography>
      </Box>
    </Box>
  );
};

export default Footer;
