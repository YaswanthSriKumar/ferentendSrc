import React, { useEffect, useState } from "react";
import SlidePopup from "../../../services/popup"
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  Button, 
  Container, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField, 
  CircularProgress 
} from "@mui/material";
import { keyframes } from '@emotion/react';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import API_URLS from "../../../services/ApiUrl";
import ApiService from "../../../services/ApiService";
import { useParams } from "react-router-dom";

const WhatWeOffer = () => {
  const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;
  const { id } = useParams(); // Get service ID from URL
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dialog state and selected service details
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [userName, setUserName] = useState("");
  const [userContact, setUserContact] = useState("");
  const [comments, setComments] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ApiService.get(API_URLS.GET_SUBSERVICES_BY_SERVICEID + id);
        if (response && Array.isArray(response)) {
          setServices(response);
        } else {
          console.error("Unexpected response format:", response);
          setServices([]);
        }
      } catch (error) {
        console.error("Unable to fetch services:", error);
        setServices([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // Open the Buy Now dialog
  const handleBuyNow = (service, event) => {
    event.stopPropagation();
    setSelectedService(service);
    setDialogOpen(true);
  };

  // Close dialog and reset form fields
  const handleDialogClose = () => {
    setDialogOpen(false);
    setUserName("");
    setUserContact("");
    setComments("");
  };

  // Process the dialog submission
  const handleSubmit = async() => {
    if (
      !userName.trim() ||
      !userContact.trim() ||
      !comments.trim()
    ) {
      setType("error");
    setMessage("fill all the fields");
    setShowPopup("true")
      return;
    }
   
    const formdata={
      selectedType:"service",
      selectedTypeId:selectedService.subserviceId,
      customerName:userName,
      customerContact:userContact,
      status: null,
      comments:comments
    }
    console.log(formdata);
    try {
      const responce = await ApiService.post(API_URLS.UPLOAD_USERS,formdata);
      console.log(responce);
      setType("success");
    setMessage("submited successfully");
    setShowPopup("true")
    } catch (error) {
      setType("error");
    setMessage("sorry failed to upload");
    setShowPopup("true")
    }
    
    

    setUserName("");
    setUserContact("");
    setComments("");
    setDialogOpen(false);
  };

  if (loading) {
    return (
      <Container sx={{ mt: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="30vh">
          <CircularProgress />
        </Box>
        <Typography variant="h5" align="center" sx={{ mt: 2 }}>
          Loading...
        </Typography>
      </Container>
    );
  }

  // If services are not available, display a no services available message.
  if (!services || services.length === 0) {
    return (
      <>
      <Typography variant="h3" sx={{ mt: 4,textAlign: "center" }}>
        What We Offer
      </Typography>
      <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box
        sx={{
          position: 'relative',
          height: '30vh',
          borderRadius: 3,
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(-45deg, #6A82FB, #FC5C7D, #FBC2EB, #C9D6FF)',
          backgroundSize: '400% 400%',
          animation: `${gradientAnimation} 8s ease infinite`,
          px: 2,
          py: 4,
        }}
      >
        <Box sx={{ zIndex: 1, textAlign: 'center' }}>
          <WarningAmberIcon sx={{ fontSize: 80, color: 'white', mb: 2 }} />
          <Typography
            variant="h4"
            sx={{ fontWeight: 'bold', color: 'white', mb: 2, textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}
          >
            Coming Soon!
          </Typography>
          <Typography
            variant="h5"
            sx={{ color: 'white', textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}
          >
            Our services will launch soon. Stay tuned for something amazing!
          </Typography>
        </Box>
      </Box>
    </Container>
    </>
    );
  }

  // Otherwise, render the service grid with a Buy Now dialog.
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
        We provide a comprehensive range of innovative services designed to transform your ideas into reality.
        Our experienced team uses state-of-the-art technology to deliver exceptional CAD designs, cutting-edge 3D printing
        solutions, and precise prototyping services that meet the highest industry standards.
      </Typography>

      {/* Heading */}
      <Typography variant="h3" sx={{ mb: 4, mt: 4 }}>
        What We Offer
      </Typography>

      {/* Service Grid */}
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
                  transform: "scale(1.01)",
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.4)",
                },
              }}
            >
              {/* Service Image */}
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
                  alt={service.subserviceName}
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
                <Button variant="contained" color="primary" onClick={(e) => handleBuyNow(service, e)}>
                  Buy Now
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Buy Product Dialog */}
      <Dialog open={dialogOpen} onClose={handleDialogClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{textAlign:"center"}}>Please Provide your details</DialogTitle>
        <DialogContent>
          {selectedService && (
           <TextField
           autoFocus
           margin="dense"
           label="Selected Service"
           type="text"
           fullWidth
           variant="outlined"
           value={selectedService.subserviceName}
           
         />
          
          )}
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="PhoneNumber/emil"
            type="text"
            fullWidth
            variant="outlined"
            value={userContact}
            onChange={(e) => setUserContact(e.target.value)}
          />
         
          <TextField
      margin="dense"
      label="Requirements"
      type="text"
      fullWidth
      variant="outlined"
      multiline
      rows={4}  // Adjust number of rows as needed
      value={comments}
      onChange={(e) => setComments(e.target.value)}
    />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      {showPopup && (
        <SlidePopup
          message={message}
          type={type}
          onClose={() => setShowPopup(false)}
        />
      )}
    </Box>
  );
};

export default WhatWeOffer;
