import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Card, CardMedia, CardContent } from "@mui/material";
import ApiService from "../../services/ApiService"
import API_URLS from "../../services/ApiUrl"
import { useNavigate } from "react-router-dom"; // Import useNavigate

const AllServices = () => {
    const [data,setData]= useState([]);
    const [sectors,setSectors]= useState([]);
    const navigate = useNavigate(); 
    useEffect(()=>{
        const fetchData = async () => {
            try {
              const response = await ApiService.get(API_URLS.GET_SERVICES,{
                headers: {
                  "Content-Type": "application/json"
                },
              });
              const sectorResponse = await ApiService.get(API_URLS.GET_SERVICE_SECTORS,{
                headers: {
                  "Content-Type": "application/json"
                },
              });
              console.log(response);
              setData(response);
              console.log(sectorResponse);
              setSectors(sectorResponse);
            }catch (error) {
                console.log("Unable to fetch: " + error);
              }
            };
           
            fetchData();
    },[]);
  return (
      
    <Box sx={{ width: "100%", textAlign: "center" }}>

      {/* Top Full-Width Image */}
     {
       sectors.map((sector)=>(<div key={sector.sector_name}>
        <Box sx={{ width: "100%" }}>
        <img src={sector.sector_image} alt="Top Banner" style={{ width: "100%", height: "400px" }} />
      </Box>
      <Typography variant="h3" sx={{marginBottom:'10px',mt:"10px"}}>{sector.sector_name}</Typography>
      <Grid container spacing={2} sx={{ marginTop: 2, padding: 2 }}>
        {data.filter(card=> (card.serviceType===sector.sector_name)).map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ 
                       height: "100%", 
                       transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                       cursor:'pointer',
                    "&:hover": {
                       transform: "scale(1.05)", // Slight zoom effect
                       boxShadow: "0 8px 16px rgba(0, 0, 0, 0.6)" // Adds shadow on hover
                        }
                    }}
                    onClick={() => navigate(`/service/${card.serviceId}`)}
                    >
              <CardMedia
                component="img"
                height="200"
                image={card.serviceImage}
                alt={card.title}
                sx={{marginBottom:'5px'}}
              />
              <CardContent sx={{textAlign:'left'}}>
                <Typography variant="h6" sx={{marginBottom:'10px'}}>{card.serviceName} </Typography>
                <Typography variant="body2">{card.serviceDescription}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
       </div>))
     }


      
    </Box>
  );
};

export default AllServices;



      {/* Card Section */}
     