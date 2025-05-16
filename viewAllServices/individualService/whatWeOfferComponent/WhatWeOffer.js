import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Card, Button } from "@mui/material";
import API_URLS from "../../../services/ApiUrl";
import ApiService from "../../../services/ApiService";
import { useParams } from "react-router-dom";

const WhatWeOffer = () => {
  const { id } = useParams(); // Get service ID from URL
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await ApiService.get(API_URLS.GET_SUBSERVICES_BY_SERVICEID + id);
        if (response && Array.isArray(response)) { 
          setServices(response);
        } else {
          console.error("Unexpected response format:", response);
          setServices([]); // Ensure services is always a valid array
        }
      } catch (error) {
        console.error("Unable to fetch:", error);
        setServices([]); // Set empty array to prevent errors
      }
    };
    fetchUsers();
  }, [id]);

  return (
    <Box
      sx={{
        width: "100%",
        padding: "20px",
        textAlign: "center",
        boxSizing: "border-box",
        overflowX: "hidden",
      }}
    >
      {/* Intro Paragraph */}
      <Typography
        variant="body1"
        sx={{
          maxWidth: "800px",
          margin: "auto",
          mb: 3,
          textAlign: "justify",
          lineHeight: 1.7,
        }}
      >
        We provide a comprehensive range of innovative services designed to transform
        your ideas into reality. Our experienced team uses state-of-the-art technology
        to deliver exceptional CAD designs, cutting-edge 3D printing solutions, and precise
        prototyping services that meet the highest industry standards.
      </Typography>

      {/* Heading */}
      <Typography variant="h3" sx={{ mb: 4, mt: 4 }}>
        What We Offer
      </Typography>

      {/* Show Error Message if API Call Fails */}
      { services.length === 0 ? (
        <Typography variant="h6" color="textSecondary" sx={{ mt: 3 }}>
           No services available at the moment. comming soon......
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {services.map((service, index) => (
            <Grid item xs={12} key={index}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: "center",
                  margin: "0 auto",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                  padding: 2,
                  boxSizing: "border-box",
                  overflow: "hidden",
                  "&:hover": {
                    transform: "scale(1.01)", // Slight zoom effect
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.4)", // Adds shadow on hover
                  },
                }}
              >
                {/* Image */}
                <Box
                  sx={{
                    flex: { xs: "none", md: 1 },
                    width: { xs: "100%", md: "auto" },
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box
                    component="img"
                    src={service.subserviceImage}
                    alt={service.serviceName}
                    sx={{
                      width: { xs: "100%", md: "250px" },
                      height: "auto",
                      borderRadius: 2,
                      boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                      maxWidth: "100%",
                    }}
                  />
                </Box>

                {/* Service Name & Description */}
                <Box
                  sx={{
                    flex: { xs: "none", md: 2 },
                    textAlign: "left",
                    mx: { xs: 0, md: 2 },
                    width: { xs: "100%", md: "auto" },
                  }}
                >
                  <Typography variant="h5">{service.subserviceName}</Typography>
                  <Typography variant="body2">{service.subserviceDescription}</Typography>
                </Box>

                {/* Cost & Buy Button */}
                <Box
                  sx={{
                    flex: { xs: "none", md: 1 },
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    mt: { xs: 2, md: 0 },
                    width: { xs: "100%", md: "auto" },
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                    {service.cost}
                  </Typography>
                  <Button variant="contained" color="primary">
                    Buy Now
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default WhatWeOffer;
