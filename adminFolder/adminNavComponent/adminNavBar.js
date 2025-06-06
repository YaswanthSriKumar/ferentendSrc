import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconButton,Toolbar, AppBar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import "./adminNavBar.css"
function AdminNav() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div className="navbar">
      <AppBar position="static">
        <Toolbar className="toolbar">
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Nav Bar
          </Typography>
          <nav>
            <ul className="navb">
            <li><Link className="custom-link" to="/customerDashbord">customers</Link></li>
              <li><Link className="custom-link" to="/serviceDashbord">services</Link></li>
              <li><Link className="custom-link" to="/subsevrvice">subservice</Link></li>
              <li><Link className="custom-link" to="/productDashbord">products</Link></li>
              <li><Link className="custom-link" to="/portfolioDashbord">portfolio</Link></li>
              <li><Link className="custom-link" to="/logout">logout</Link></li>
            </ul>
          </nav>
        </Toolbar>
      </AppBar>
      </div>
  );
}

export default AdminNav;
