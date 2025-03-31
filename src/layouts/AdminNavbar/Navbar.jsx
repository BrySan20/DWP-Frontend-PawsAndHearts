import React from "react";
import { Box, Button, InputAdornment, TextField, IconButton, Typography } from "@mui/material";
import { Home, Person, Mail, Search, ExitToApp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/authService";
import Swal from "sweetalert2";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Your session will be closed",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, log out",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
      }
    });
  };

  return (
    <Box className="navbar-container">
      <Box className="navbar-left">
        <Box className="navbar-logo"></Box>
        <Box className="navbar-logo">
          <img src="/src/assets/images/logo.png" alt="Logo" className="navbar-logo-image" onClick={() => navigate("/admindashboard")} />
        </Box>
        <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: 3, color: 'black' }}>Welcome Administrator</Typography>
      </Box>
      <Box className="navbar-right">
        <Button
          startIcon={<ExitToApp />}
          className="navbar-logout"
          onClick={handleLogout}
        >
          Log out
        </Button>
      </Box>
    </Box>
  );
};

export default Navbar;