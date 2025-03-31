import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Pets } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ 
  onPetTypeSelect = () => {}, 
  selectedType, 
  onFavoritesToggle = () => {}, 
  isFavoritesActive 
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const fullName = localStorage.getItem("fullName");
  const userId = localStorage.getItem("userId");

  const handlePetTypeClick = (type) => {
    if (location.pathname !== "/dashboard") {
      localStorage.setItem('selectedPetType', type === null ? 'all' : type);
      navigate("/dashboard");
      return;
    }
    if (selectedType === type) {
      onPetTypeSelect(null);
    } else {
      onPetTypeSelect(type);
    }
  };

  const handleFavoritesClick = () => {
    if (location.pathname !== "/dashboard") {
      localStorage.setItem('showFavorites', 'true');
      navigate("/dashboard");
      return;
    }
    onFavoritesToggle();
  };

  return (
    <Box className="sidebar-container">
      <Box className="user-welcome-container">
        <Typography variant="h6" className="user-welcome-text">
          Welcome, {fullName}
        </Typography>
      </Box>
      <Button
        startIcon={<Pets />}
        className={`sidebar-button ${selectedType === null && !isFavoritesActive ? "selected" : ""}`}
        onClick={() => handlePetTypeClick(null)}
      >
        All Pets
      </Button>
      <Button
        startIcon={<Pets />}
        className={`sidebar-button ${selectedType === "Bird" ? "selected" : ""}`}
        onClick={() => handlePetTypeClick("Bird")}
      >
        Birds
      </Button>
      <Button
        startIcon={<Pets />}
        className={`sidebar-button ${selectedType === "Cat" ? "selected" : ""}`}
        onClick={() => handlePetTypeClick("Cat")}
      >
        Cats
      </Button>
      <Button
        startIcon={<Pets />}
        className={`sidebar-button ${selectedType === "Dog" ? "selected" : ""}`}
        onClick={() => handlePetTypeClick("Dog")}
      >
        Dogs
      </Button>
      <Button
        startIcon={<Pets />}
        className={`sidebar-button ${selectedType === "Reptile" ? "selected" : ""}`}
        onClick={() => handlePetTypeClick("Reptile")}
      >
        Reptiles
      </Button>
      <Button 
        startIcon={<Pets />} 
        className={`sidebar-button ${isFavoritesActive ? "selected" : ""}`}
        onClick={handleFavoritesClick}
      >
        Favorites
      </Button>
    </Box>
  );
};

export default Sidebar;