import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Typography,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { keyframes } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import ApiService from "../services/ApiService";
import API_URLS from "../services/ApiUrl";
import './Product.css';

function ProductGrid({ isDarkMode }) {
  // Define the animated gradient using keyframes.
  const gradientAnimation = keyframes`
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  `;

  const [products, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ApiService.get(API_URLS.GET_SELECTED_PRODUCT);
        setProduct(response);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleBuyClick = (product, event) => {
    event.stopPropagation(); // Prevent card click from triggering navigation.
    setSelectedProduct(product);
    setDialogOpen(true);
  };

  const handleCardClick = (product) => {
    // Navigate to the product detail page.
    navigate(`/product/${product.productId}`);
  };

  const handleSubmit = () => {
    // Here you can add logic to handle submission (e.g. API call)
    console.log("Buying product:", selectedProduct);
    console.log("User Name:", userName);
    console.log("User Email:", userEmail);
    // Reset and close the dialog
    setUserName('');
    setUserEmail('');
    setDialogOpen(false);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  // While loading, you may return a loading indicator.
  if (loading) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h5" align="center">Loading...</Typography>
      </Container>
    );
  }

  // If no products are available, display the unique Coming Soon view.
  if (!products || products.length === 0) {
    return (
      <Container maxWidth="md" sx={{ mt: 8 }}>
        <Box
          sx={{
            position: 'relative',
            height: '60vh',
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
              variant="h2"
              sx={{ fontWeight: 'bold', color: 'white', mb: 2, textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}
            >
              Coming Soon!
            </Typography>
            <Typography
              variant="h5"
              sx={{ color: 'white', textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}
            >
              Our products will launch soon. Stay tuned for something amazing!
            </Typography>
          </Box>
        </Box>
      </Container>
    );
  }

  // Otherwise, render the product grid.
  return (
    <Box sx={{ p: 2 }} className={`products-container ${isDarkMode ? 'dark-mode-section' : ''}`}>
      {/* Heading */}
      <Typography variant="h4" component="h2" sx={{ mb: 2, textAlign: "center" }}>
        Products
      </Typography>
      <Box sx={{ textAlign: 'right', mb: 1 }}>
      <button className={`meadiamButtonRev`}>
             View All Products
        </button>
       
      </Box>
      {/* Product Grid */}
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={4} key={product.productId}>
            <Box
              className={`product-card ${isDarkMode ? 'product-card-dark' : ''}`}
              onClick={() => handleCardClick(product)}
              sx={{ cursor: "pointer" }}
            >
              <img
                src={product.productImage}
                alt={product.productName}
                style={{ width: '100%', display: 'block', borderRadius: "5px" }}
              />
              <Typography variant="h6" component="div" sx={{ mt: 1 }}>
                {product.productName}
              </Typography>
              <Button
                variant="contained"
                onClick={(e) => handleBuyClick(product, e)}
                sx={{ mt: 1 }}
              >
                Buy
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* "View All" Button */}
      

      {/* Buy Product Dialog */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Buy Product</DialogTitle>
        <DialogContent>
          {selectedProduct && (
            <Typography variant="h6" sx={{ mb: 2 }}>
              You selected: {selectedProduct.productName}
            </Typography>
          )}
          <TextField
            autoFocus
            margin="dense"
            label="Your Name"
            type="text"
            fullWidth
            variant="standard"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Your Email"
            type="email"
            fullWidth
            variant="standard"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
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
    </Box>
  );
}

export default ProductGrid;
