import React, {useEffect, useState } from "react";
import { Box, Card, Typography } from "@mui/material";
import ApiService from "../../services/ApiService"
import API_URLS from "../../services/ApiUrl"
const ViewAllPortfolio = () => {

  const [sectors, setSectors]= useState([]);
  const[portfolios, setPortfolios]= useState([]);
  useEffect(()=>{
    const fetchData = async () => {
        try {
          const response = await ApiService.get(API_URLS.GET_SECTORS,{
            headers: {
              "Content-Type": "application/json"
            },
          });
          const response1 = await ApiService.get(API_URLS.GET_PORTFOLIO,{
            headers: {
              "Content-Type": "application/json"
            },
          });
          console.log(response);
          setSectors(response);
          console.log(response1);
          setPortfolios(response1);
        }catch (error) {
            console.log("Unable to fetch: " + error);
          }
        };
        fetchData();
},[]);
  // const sectors = [
  //   {
  //     id: 1,
  //     name: "Technology Sector and Innovations",
  //     cards: [
  //       { id: 1, title: "AI", description: "Artificial Intelligence Project", image: "https://picsum.photos/seed/ai/220/150" },
  //       { id: 2, title: "Web", description: "Modern Web Development", image: "https://picsum.photos/seed/web/220/150" },
  //       { id: 3, title: "Mobile", description: "Mobile Application Solutions", image: "https://picsum.photos/seed/mobile/220/150" },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     name: "Healthcare and Life Sciences",
  //     cards: [
  //       { id: 4, title: "Pharma", description: "Pharmaceutical Innovations", image: "https://picsum.photos/seed/pharma/220/150" },
  //       { id: 5, title: "Diagnostics", description: "Advanced Diagnostics", image: "https://picsum.photos/seed/diagnostics/220/150" },
  //       { id: 6, title: "MedTech", description: "Medical Technology Solutions", image: "https://picsum.photos/seed/medtech/220/150" },
  //     ],
  //   },
  //   {
  //     id: 3,
  //     name: "Finance, Banking & Investments",
  //     cards: [
  //       { id: 7, title: "Banking", description: "Online Banking Systems", image: "https://picsum.photos/seed/banking/220/150" },
  //       { id: 8, title: "Investments", description: "Smart Investment Strategies", image: "https://picsum.photos/seed/investments/220/150" },
  //       { id: 9, title: "Insurance", description: "Innovative Insurance Products", image: "https://picsum.photos/seed/insurance/220/150" },
  //     ],
  //   },
  // ];

  return (
    <Box sx={{ padding: "20px" }}>
      {sectors.map((sector) => (
        <Box
          key={sector.sectorId}
          sx={{
            display: "flex",
            width: "100%",
            marginBottom: "30px",
            boxShadow: 2,
            borderRadius: "8px",
            overflow: "hidden",
            alignItems: "stretch", // Ensures the left column stretches to match the right column's height.
          }}
        >
          {/* Left Section: Sector Name. It splits the name into words and stacks them vertically */}
          <Box
            sx={{
                width:"150px",
              backgroundColor: "primary.main", // Uses the theme's primary color.
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 1,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "#fff",
                textAlign: "center",
                lineHeight: 1.2,
              }}
            >
              {sector.sectorName
                .split(" ")
                .map((word, index, arr) => (
                  <React.Fragment key={index}>
                    {word}
                    {index < arr.length - 1 && <br />}
                  </React.Fragment>
                ))}
            </Typography>
          </Box>

          {/* Right Section: Horizontally scrollable cards (scrollbar hidden) */}
          <Box
            sx={{
              flex: 1,
              backgroundColor: "#f5f5f5",
              overflowX: "auto",
              display: "flex",
              gap: "16px",
              p: 2,
              // Hide scrollbar in Chrome, Safari and Firefox.
              "&::-webkit-scrollbar": { display: "none" },
              scrollbarWidth: "none",
            }}
          >
            {portfolios.filter((card=>(card.sector.sectorId===sector.sectorId))).map((card) => (
              <Card
                key={card.portfolioId}
                sx={{
                  minWidth: "420px",
                  
                  flexShrink: 0,
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  overflow: "hidden",
                }}
              >
                <img
                  src={card.portfolioImage}
                  alt={card.portfolioName}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
                <Box sx={{ p: 1.5 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
                    {card.portfolioName}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#555" }}>
                    {card.portfolioDescription}
                  </Typography>
                </Box>
              </Card>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default ViewAllPortfolio;
