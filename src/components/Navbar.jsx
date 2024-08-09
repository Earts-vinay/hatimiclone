import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const styles = {
  navLink: {
    margin: '0 10px',
    transition: 'color 0.3s ease, text-decoration 0.3s ease',
    textDecoration: 'none',
    fontSize: "15px"
  },
  activeNavLink: {
    color: "#b08e54",
    textDecoration: 'underline',
    textUnderlineOffset: '10px', // Position the underline slightly below the text
    textDecorationColor: '#b08e54',
    fontSize: "15px"
  },
  inactiveNavLink: {
    color: '#ffffff'
  }
};

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

function Navbar(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const location = useLocation();

  // Function to check if the current route starts with a given base route
  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="fixed" color="transparent" sx={{boxShadow:"none"}}>
        <Container maxWidth="lg">
          <Toolbar sx={{padding:"10px"}}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <img src="/assets/Icons/hatimilogo.svg" alt="Hatmi" height="70" />
            </Typography>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1, justifyContent: 'center', gap: 2 }}>
              <NavLink
                to="/"
                style={{
                  ...styles.navLink,
                  ...(isActive('/') ? styles.activeNavLink : styles.inactiveNavLink)
                }}
              >
                HOME
              </NavLink>
              <NavLink
                to="/destinations"
                style={({ isActive }) => ({
                  ...styles.navLink,
                  ...(isActive ? styles.activeNavLink : styles.inactiveNavLink)
                })}
              >
                DESTINATIONS
              </NavLink>
              <NavLink
                to="/events"
                style={({ isActive }) => ({
                  ...styles.navLink,
                  ...(isActive ? styles.activeNavLink : styles.inactiveNavLink)
                })}
              >
                EVENTS
              </NavLink>
              <NavLink
                to="/daypass"
                style={({ isActive }) => ({
                  ...styles.navLink,
                  ...(isActive ? styles.activeNavLink : styles.inactiveNavLink)
                })}
              >
                DAYPASS
              </NavLink>
              <NavLink
                to="/blogs"
                style={({ isActive }) => ({
                  ...styles.navLink,
                  ...(isActive ? styles.activeNavLink : styles.inactiveNavLink)
                })}
              >
                BLOGS
              </NavLink>
              <NavLink
                to="/contact"
                style={({ isActive }) => ({
                  ...styles.navLink,
                  ...(isActive ? styles.activeNavLink : styles.inactiveNavLink)
                })}
              >
                CONTACT US
              </NavLink>
            </Box>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="account"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
            >
              <AccountCircle sx={{color:"white",fontSize:"30px"}}/>
            </IconButton>
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleMenu}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Toolbar />
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{color:"white"}}
      >
        <MenuItem onClick={handleClose} component={NavLink} to="/mybooking">
          My Booking
        </MenuItem>
        <MenuItem onClick={handleClose} component={NavLink} to="/myprofile">
          My Profile
        </MenuItem>
        <MenuItem onClick={handleClose} component={NavLink} to="/help">
          Help
        </MenuItem>
        <MenuItem onClick={handleClose} component={NavLink} to="/">
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}

export default Navbar;
