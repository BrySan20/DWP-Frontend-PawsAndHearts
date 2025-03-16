import React from "react";
import { Box, Button, InputAdornment, TextField, IconButton } from "@mui/material";
import { Home, Person, Mail, Search, ExitToApp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <Box className="navbar-container">
      <Box className="navbar-left">
        <Box className="navbar-logo">
          <img src="/src/assets/images/logo.png" alt="Logo" className="navbar-logo-image" />
        </Box>
        <Box className="navbar-nav-buttons">
          <Button startIcon={<Home />} className="navbar-button" onClick={() => navigate("/dashboard")}>Home</Button>
          <Button startIcon={<Person />} className="navbar-button" onClick={() => navigate("/profile")}>Profile</Button>
          <Button startIcon={<Mail />} className="navbar-button" onClick={() => navigate("/contact")}>Contact</Button>
        </Box>
      </Box>
      <Box className="navbar-right">
        <TextField
          variant="outlined"
          className="navbar-search"
          placeholder="Search..."
          InputProps={{
            startAdornment: <InputAdornment position="start"><Search /></InputAdornment>,
          }}
          sx={{
            backgroundColor: "#FFFFFF",
            borderRadius: "30px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "30px",
            },
          }}
        />
        <Button startIcon={<ExitToApp />} className="navbar-logout">
          Log out
        </Button>
      </Box>
    </Box>
  );
};

export default Navbar;