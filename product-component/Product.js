import { Box, Button, Grid, Typography } from '@mui/material';
import './Product.css';  // Import the separated CSS file
import React, { useEffect, useState } from 'react';
import ApiService from "../services/ApiService";
import API_URLS from "../services/ApiUrl"


function ProductGrid({isDarkMode}) {
  const [products,setProduct]=useState([]);
  useEffect(()=>{
    const fatchData= async()=>{
      try {
        const response= await ApiService.get(API_URLS.GET_SELECTED_PRODUCT)
        setProduct(response)
        console.log(response);
      } catch (error) {
        console.error("Error submitting the form:", error);
      }
    };
    fatchData();
  }, [])
console.log(products);

  return (
    <Box sx={{ p: 2 }} className={`products-container ${isDarkMode ? 'dark-mode-section' : ''}`}>
      {/* Heading */}
      <Typography variant="h4" component="h2" sx={{ mb: 2,textAlign:"center" }}>
        Products
      </Typography>

      {/* Product Grid */}
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={4} key={product.productId}>
            <Box className={`product-card ${isDarkMode ? 'product-card-dark' : ''}`}>
              <img
                src={product.productImage}
                alt={product.productName}
                style={{ width: '100%', display: 'block',borderRadius: "10px"}}
              />
              <Typography variant="h6" component="div" sx={{ mt: 1 }}>
                {product.productName}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* "View All" Button */}
      <Box sx={{ textAlign: 'center', mt: 3 }}>
      <button className={`meadiamButton ${isDarkMode ? 'meadiamButton-darkmode' : ''}`}>View All products</button>

      </Box>
    </Box>
  );
}

export default ProductGrid;
