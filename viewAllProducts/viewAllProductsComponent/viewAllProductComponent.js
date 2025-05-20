import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useNavigate } from 'react-router-dom';
import { keyframes } from '@emotion/react';

const AllProducts = () => {
  const navigate = useNavigate();

  const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;
  const products = [
    {
      id: 1,
      name: "Product One",
      description: "This is the first product. It has great features.",
      price: 19.99,
      image: "https://picsum.photos/seed/product1/300/200",
    },
    {
      id: 2,
      name: "Product Two",
      description: "This is the second product with a sleek design.",
      price: 29.99,
      image: "https://picsum.photos/seed/product2/300/200",
    },
    {
      id: 3,
      name: "Product Three",
      description: "This is the third product, loved by many.",
      price: 39.99,
      image: "https://picsum.photos/seed/product3/300/200",
    },
    {
      id: 4,
      name: "Product Four",
      description: "This is another product with amazing features.",
      price: 49.99,
      image: "https://picsum.photos/seed/product4/300/200",
    },
    {
      id: 5,
      name: "Product Five",
      description: "Elegance and performance in one product.",
      price: 59.99,
      image: "https://picsum.photos/seed/product5/300/200",
    },
    {
      id: 6,
      name: "Product Six",
      description: "A popular product, loved by thousands.",
      price: 69.99,
      image: "https://picsum.photos/seed/product6/300/200",
    }
  ];

  // Dialog state and selected product
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // States for user details in dialog form
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  // Handle the click on "buy" for a given product
  const handleBuyClick = (product, event) => {
    // Prevent click events from bubbling up (so that clicking on the button does not trigger navigation)
    event.stopPropagation();
    setSelectedProduct(product);
    setDialogOpen(true);
  };

  // Handle card click to navigate to detailed product page
  const handleCardClick = (product) => {
    navigate(`/product/${product.id}`);
  };

  // Handle dialog submission
  const handleSubmit = () => {
    // For now, simply log the information.
    console.log("Submitting details for product:", selectedProduct);
    console.log("User Name:", userName);
    console.log("User Email:", userEmail);
    // Reset form and close dialog
    setUserName('');
    setUserEmail('');
    setDialogOpen(false);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  // If no products, show "Coming Soon" screen.
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
            // Animated gradient background
            background: 'linear-gradient(-45deg, #6A82FB, #FC5C7D, #FBC2EB, #C9D6FF)',
            backgroundSize: '400% 400%',
            animation: `${gradientAnimation} 8s ease infinite`,
            px: 2,
            py: 4,
          }}
        >
          <Box
            sx={{
              zIndex: 1,
              textAlign: 'center',
            }}
          >
            <WarningAmberIcon sx={{ fontSize: 80, color: 'white', mb: 2 }} />
            <Typography
              variant="h2"
              sx={{
                fontWeight: 'bold',
                color: 'white',
                mb: 2,
                textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
              }}
            >
              Coming Soon!
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: 'white',
                textShadow: '1px 1px 3px rgba(0,0,0,0.7)',
              }}
            >
              Our products will launch soon. Stay tuned for something amazing!
            </Typography>
          </Box>
        </Box>
      </Container>
      
    );
  }

  // Render the product grid when products exist
  return (
      
    <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography
        variant="h4"
        sx={{ marginBottom: "20px", fontWeight: "bold",textAlign:"center" }}
      >
        Products
      </Typography>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'scale(1.03)',
                  boxShadow: 6,
                },
              }}
              // When clicking the card (not the buy button), navigate to /product/:id.
              onClick={() => handleCardClick(product)}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'medium' }}>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                  <Typography variant="h6" sx={{ mt: 1, color: 'primary.main', fontWeight: 'bold' }}>
                    ${product.price.toFixed(2)}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                <Button
                  variant="contained"
                  size="medium"
                  color="primary"
                  onClick={(e) => handleBuyClick(product, e)}
                >
                  Buy
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog for buying a product */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Buy Product</DialogTitle>
        <DialogContent>
          {selectedProduct && (
            <Typography variant="h6" sx={{ mb: 2 }}>
              You selected: {selectedProduct.name}
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
    </Container>
  );
};

export default AllProducts;
