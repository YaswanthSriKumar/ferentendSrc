import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Box, Button, Drawer, List, ListItem, ListItemText, useMediaQuery } from '@mui/material';
import { Link,useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import DarkModeIcon from '@mui/icons-material/DarkMode'; // Import Dark Mode Icon

import './nav.css';

const Nav = ({ toggleDarkMode, isDarkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  console.log("is it dark mood in nav :   "+isDarkMode);
  const location = useLocation(); // Get current route path
  const navbarBackground = location.pathname === "/" ? "navbarnav" : "navbarnavnothome";
      console.log(navbarBackground);
  const isMobile = useMediaQuery('(max-width:1200px)');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <AppBar className={`${isScrolled ? 'BaseColours' : navbarBackground} ${isDarkMode ? 'dark-mode-navbar' : ''}`}>
        <Toolbar sx={{ justifyContent: 'space-between', padding: '0 !important', width: '90% ' , left: '5%', borderBottom: '2px solid white' }}>
          <Box sx={{ width: '30%' }}>
            <h2>My Website</h2>
          </Box>

          {!isMobile && (
            < >
              <Button color="inherit"  component={Link} to="/">Home</Button>
              <Button color="inherit" component={Link} to="/allservices">Services</Button>
              <Button color="inherit" component={Link} to="/allproducts">Products</Button>
              <Button color="inherit" component={Link} to="/allportfolios">Portfolio</Button>
              <Button color="inherit" component={Link} to="/contact">Careers</Button>
              <Button color="inherit" component={Link} to="/contact">AboutUs</Button>
              <Button color="inherit" component={Link} to="/contact">ContactUs</Button>
            </>
          )}

          {/* Dark Mode Toggle Button */}
          <IconButton color="inherit" onClick={toggleDarkMode}>
            <DarkModeIcon />
          </IconButton>

          {isMobile && (
            <IconButton color="inherit" aria-label="open drawer" edge="end" onClick={handleDrawerToggle} className="hamburger-icon">
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle} className="drawer" classes={{ paper: 'drawer-paper' }}>
        <List>
          <ListItem component={Link} to="/" onClick={handleDrawerToggle}>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem component={Link} to="/allservices" onClick={handleDrawerToggle}>
            <ListItemText primary="Services" />
          </ListItem>
          <ListItem component={Link} to="/allproducts" onClick={handleDrawerToggle}>
            <ListItemText primary="Products" />
          </ListItem>
          <ListItem component={Link} to="/allportfolios" onClick={handleDrawerToggle}>
            <ListItemText primary="Portfolio" />
          </ListItem>
          <ListItem component={Link} to="/Careers" onClick={handleDrawerToggle}>
            <ListItemText primary="Careers" />
          </ListItem>
          <ListItem component={Link} to="/AboutUs" onClick={handleDrawerToggle}>
            <ListItemText primary="AboutUs" />
          </ListItem>
          <ListItem component={Link} to="/ContactUs" onClick={handleDrawerToggle}>
            <ListItemText primary="ContactUs" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Nav;
