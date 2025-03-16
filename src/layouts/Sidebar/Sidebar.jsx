import React from "react";
import { Box, Button } from "@mui/material";
import { Pets } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <Box className="sidebar-container">
      <Button startIcon={<Pets />} className="sidebar-button">Birds</Button>
      <Button startIcon={<Pets />} className="sidebar-button">Cats</Button>
      <Button startIcon={<Pets />} className="sidebar-button">Dogs</Button>
      <Button startIcon={<Pets />} className="sidebar-button">Reptiles</Button>
      <Button startIcon={<Pets />} className="sidebar-button">Favorites</Button>
    </Box>
  );
};

export default Sidebar;
